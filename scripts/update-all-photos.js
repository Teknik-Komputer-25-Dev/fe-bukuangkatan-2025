#!/usr/bin/env node

import { createRequire } from 'module';
import fs from 'fs/promises';
import path from 'path';

const require = createRequire(import.meta.url);
const { v2: cloudinary } = require('cloudinary');
require('dotenv').config({ path: path.join(process.cwd(), '.env') });

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.VITE_CLOUDINARY_API_KEY,
    api_secret: process.env.VITE_CLOUDINARY_API_SECRET
});

function log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    let prefix, color;
    
    switch (type) {
        case 'success':
            prefix = '✅';
            color = colors.green;
            break;
        case 'error':
            prefix = '❌';
            color = colors.red;
            break;
        case 'warning':
            prefix = '⚠️';
            color = colors.yellow;
            break;
        case 'info':
        default:
            prefix = 'ℹ️';
            color = colors.blue;
            break;
    }

    console.log(`${color}[${timestamp}] ${prefix} ${message}${colors.reset}`);
}

async function getPhotosFromFolder(folderName) {
    try {
        log(`🔍 Mengambil foto dari folder ${folderName}...`);
        
        try {
            // Try using resources_by_asset_folder first
            const result = await cloudinary.api.resources_by_asset_folder(folderName, {
                max_results: 500
            });
            
            const photos = result.resources;
            log(`📁 ${folderName}: ${photos.length} photos ditemukan (via asset folder)`, 'success');
            
            return photos.map(resource => ({
                public_id: resource.public_id,
                url: resource.secure_url,
                filename: path.basename(resource.public_id),
                nim: extractNIMFromFilename(resource.public_id),
                folder: folderName
            }));
            
        } catch (err) {
            // Fallback: try using prefix method
            log(`⚠️ Error menggunakan resources_by_asset_folder: ${err.message}`, 'warning');
            log('🔄 Mencoba menggunakan prefix method sebagai fallback...');
            
            const fallbackResult = await cloudinary.api.resources({
                type: 'upload',
                prefix: `${folderName}/`,
                max_results: 500
            });
            
            const fallbackPhotos = fallbackResult.resources;
            log(`📁 ${folderName} (fallback): ${fallbackPhotos.length} photos ditemukan`);
            
            return fallbackPhotos.map(resource => ({
                public_id: resource.public_id,
                url: resource.secure_url,
                filename: path.basename(resource.public_id),
                nim: extractNIMFromFilename(resource.public_id),
                folder: folderName
            }));
        }
        
    } catch (error) {
        log(`Error mengambil foto dari folder ${folderName}: ${error.message}`, 'error');
        return [];
    }
}

function extractNIMFromFilename(publicId) {
    // Extract filename from public_id
    const filename = path.basename(publicId);
    
    // Try to find NIM pattern (21120125XXXXXX)
    const nimMatch = filename.match(/21120125\d{6}/);
    if (nimMatch) {
        return nimMatch[0];
    }
    
    // Alternative patterns if needed
    const altMatch = filename.match(/\d{12}/);
    if (altMatch) {
        return altMatch[0];
    }
    
    return null;
}

async function loadStudentData() {
    try {
        log('📖 Membaca data mahasiswa...');
        const dataPath = path.join(process.cwd(), 'public/data/people.json');
        const data = await fs.readFile(dataPath, 'utf8');
        const students = JSON.parse(data);
        
        log(`✅ Berhasil memuat ${students.length} data mahasiswa`, 'success');
        return students;
        
    } catch (error) {
        log(`Error loading student data: ${error.message}`, 'error');
        throw error;
    }
}

async function matchPhotosWithStudents(photos, students, photoType) {
    log(`🔗 Mencocokkan ${photoType} foto dengan data mahasiswa...`);
    
    const matches = {};
    let matchedCount = 0;
    
    // Create a mapping from NIM to student for faster lookup
    const studentByNIM = {};
    students.forEach(student => {
        const nim = student.nim || student.studentId;
        if (nim) {
            studentByNIM[nim] = student;
        }
    });
    
    // Match photos with students
    photos.forEach(photo => {
        if (photo.nim && studentByNIM[photo.nim]) {
            matches[photo.nim] = {
                url: photo.url,
                student: studentByNIM[photo.nim],
                photo: photo
            };
            matchedCount++;
        }
    });
    
    log(`✅ Berhasil mencocokkan ${matchedCount} ${photoType} foto dari ${photos.length} foto yang tersedia`, 'success');
    
    // Show unmatched photos for debugging
    const unmatchedPhotos = photos.filter(photo => !photo.nim || !studentByNIM[photo.nim]);
    if (unmatchedPhotos.length > 0) {
        log(`⚠️ ${unmatchedPhotos.length} ${photoType} foto tidak cocok dengan data mahasiswa:`, 'warning');
        unmatchedPhotos.slice(0, 5).forEach(photo => { // Show only first 5 for brevity
            console.log(`   📸 ${photo.filename} (NIM extracted: ${photo.nim || 'tidak ditemukan'})`);
        });
        if (unmatchedPhotos.length > 5) {
            console.log(`   ... dan ${unmatchedPhotos.length - 5} foto lainnya`);
        }
    }
    
    return matches;
}

async function updatePhotosInJSON(generalMatches, formalMatches) {
    try {
        log('💾 Mengupdate properti generalphoto dan formalphoto di people.json...');
        
        const dataPath = path.join(process.cwd(), 'public/data/people.json');
        const originalData = JSON.parse(await fs.readFile(dataPath, 'utf8'));
        
        let generalUpdatedCount = 0;
        let formalUpdatedCount = 0;
        
        const updatedData = originalData.map(student => {
            const nim = student.nim || student.studentId;
            let updatedStudent = { ...student };
            
            if (nim && generalMatches[nim]) {
                updatedStudent.generalphoto = generalMatches[nim].url;
                generalUpdatedCount++;
            }
            
            if (nim && formalMatches[nim]) {
                updatedStudent.formalphoto = formalMatches[nim].url;
                formalUpdatedCount++;
            }
            
            return updatedStudent;
        });
        
        // Write back to file
        await fs.writeFile(dataPath, JSON.stringify(updatedData, null, 2));
        
        log(`✅ Berhasil mengupdate ${generalUpdatedCount} generalphoto dan ${formalUpdatedCount} formalphoto`, 'success');
        log(`📁 File disimpan: ${dataPath}`, 'success');
        
        return { generalUpdatedCount, formalUpdatedCount };
        
    } catch (error) {
        log(`Error updating JSON: ${error.message}`, 'error');
        throw error;
    }
}

async function showSummary(generalMatches, formalMatches) {
    console.log(`\n${colors.cyan}=== RINGKASAN UPDATE ALL PHOTOS ===${colors.reset}`);
    console.log(`${colors.white}General photos (T-25-nonFormal): ${Object.keys(generalMatches).length}${colors.reset}`);
    console.log(`${colors.white}Formal photos (T-25-Formal):     ${Object.keys(formalMatches).length}${colors.reset}`);
    console.log(`${colors.green}Total mahasiswa yang diupdate:   ${new Set([...Object.keys(generalMatches), ...Object.keys(formalMatches)]).size}${colors.reset}`);
    
    // Show some examples
    console.log(`\n${colors.magenta}=== CONTOH MATCHING ===${colors.reset}`);
    
    // General photos examples
    if (Object.keys(generalMatches).length > 0) {
        console.log(`${colors.cyan}📸 General Photos (T-25-nonFormal):${colors.reset}`);
        Object.entries(generalMatches).slice(0, 3).forEach(([nim, match], index) => {
            console.log(`${colors.white}${index + 1}. ${match.student.fullName || match.student.name} (${nim})${colors.reset}`);
            console.log(`   📸 ${match.photo.filename}`);
        });
        if (Object.keys(generalMatches).length > 3) {
            console.log(`   ... dan ${Object.keys(generalMatches).length - 3} foto lainnya`);
        }
    }
    
    // Formal photos examples
    if (Object.keys(formalMatches).length > 0) {
        console.log(`\n${colors.cyan}🎩 Formal Photos (T-25-Formal):${colors.reset}`);
        Object.entries(formalMatches).slice(0, 3).forEach(([nim, match], index) => {
            console.log(`${colors.white}${index + 1}. ${match.student.fullName || match.student.name} (${nim})${colors.reset}`);
            console.log(`   📸 ${match.photo.filename}`);
        });
        if (Object.keys(formalMatches).length > 3) {
            console.log(`   ... dan ${Object.keys(formalMatches).length - 3} foto lainnya`);
        }
    }
}

async function main() {
    console.log(`${colors.green}🖼️  All Photos Updater (General + Formal)${colors.reset}`);
    console.log(`${colors.white}===========================================${colors.reset}\n`);
    
    try {
        // Test Cloudinary connection
        log('🔌 Testing Cloudinary connection...');
        await cloudinary.api.ping();
        log('✅ Cloudinary connection successful!', 'success');
        
        // Get photos from both folders
        const [generalPhotos, formalPhotos] = await Promise.all([
            getPhotosFromFolder('T-25-nonFormal'),
            getPhotosFromFolder('T-25-Formal')
        ]);
        
        if (generalPhotos.length === 0 && formalPhotos.length === 0) {
            log('❌ Tidak ada foto ditemukan di kedua folder', 'error');
            return;
        }
        
        // Load student data
        const students = await loadStudentData();
        
        // Match photos with students
        const [generalMatches, formalMatches] = await Promise.all([
            matchPhotosWithStudents(generalPhotos, students, 'general'),
            matchPhotosWithStudents(formalPhotos, students, 'formal')
        ]);
        
        if (Object.keys(generalMatches).length === 0 && Object.keys(formalMatches).length === 0) {
            log('❌ Tidak ada foto yang berhasil dicocokkan. Silakan periksa format filename atau folder.', 'error');
            return;
        }
        
        // Show preview
        await showSummary(generalMatches, formalMatches);
        
        // Confirm before updating
        const readline = await import('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        const confirm = await new Promise((resolve) => {
            rl.question(`\n${colors.yellow}Apakah Anda yakin ingin mengupdate properties di people.json? (y/N): ${colors.reset}`, resolve);
        });
        
        rl.close();
        
        if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
            const { generalUpdatedCount, formalUpdatedCount } = await updatePhotosInJSON(generalMatches, formalMatches);
            log(`🎉 Selesai! ${generalUpdatedCount} generalphoto dan ${formalUpdatedCount} formalphoto berhasil diupdate`, 'success');
        } else {
            log('❌ Update dibatalkan', 'warning');
        }
        
    } catch (error) {
        log(`Fatal error: ${error.message}`, 'error');
        console.error(error);
        process.exit(1);
    }
}

// Run the script
main();