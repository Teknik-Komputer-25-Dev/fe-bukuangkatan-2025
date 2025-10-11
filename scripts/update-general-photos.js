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

async function getGeneralPhotosFromCloudinary() {
    try {
        log('🔍 Mengambil foto non-formal dari folder T-25-nonFormal...');
        
        // Use resources_by_asset_folder to get photos from specific folder
        const folderName = 'T-25-nonFormal';
        
        try {
            // Get photos from T-25-nonFormal folder using resources_by_asset_folder
            const nonFormalResult = await cloudinary.api.resources_by_asset_folder(folderName, {
                max_results: 500
            });
            
            const nonFormalPhotos = nonFormalResult.resources;
            log(`📁 ${folderName}: ${nonFormalPhotos.length} photos ditemukan`, 'success');
            
            if (nonFormalPhotos.length === 0) {
                log(`⚠️ Tidak ada foto ditemukan di folder ${folderName}`, 'warning');
                return [];
            }
            
            log(`✅ Berhasil mengambil ${nonFormalPhotos.length} foto untuk generalphoto`, 'success');
            
            return nonFormalPhotos.map(resource => ({
                public_id: resource.public_id,
                url: resource.secure_url,
                filename: path.basename(resource.public_id),
                nim: extractNIMFromFilename(resource.public_id),
                folder: folderName
            }));
            
        } catch (err) {
            // Fallback: try using prefix method if folder API fails
            log(`⚠️ Error menggunakan resources_by_asset_folder: ${err.message}`, 'warning');
            log('🔄 Mencoba menggunakan prefix method sebagai fallback...');
            
            const fallbackResult = await cloudinary.api.resources({
                type: 'upload',
                prefix: 'T-25-nonFormal/',
                max_results: 500
            });
            
            const fallbackPhotos = fallbackResult.resources;
            log(`📁 T-25-nonFormal (fallback): ${fallbackPhotos.length} photos ditemukan`);
            
            return fallbackPhotos.map(resource => ({
                public_id: resource.public_id,
                url: resource.secure_url,
                filename: path.basename(resource.public_id),
                nim: extractNIMFromFilename(resource.public_id),
                folder: 'T-25-nonFormal'
            }));
        }
        
    } catch (error) {
        log(`Error mengambil foto dari Cloudinary: ${error.message}`, 'error');
        throw error;
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

async function matchPhotosWithStudents(photos, students) {
    log('🔗 Mencocokkan foto dengan data mahasiswa...');
    
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
    
    log(`✅ Berhasil mencocokkan ${matchedCount} foto dari ${photos.length} foto yang tersedia`, 'success');
    
    // Show unmatched photos for debugging
    const unmatchedPhotos = photos.filter(photo => !photo.nim || !studentByNIM[photo.nim]);
    if (unmatchedPhotos.length > 0) {
        log(`⚠️ ${unmatchedPhotos.length} foto tidak cocok dengan data mahasiswa:`, 'warning');
        unmatchedPhotos.forEach(photo => {
            console.log(`   📸 ${photo.filename} (NIM extracted: ${photo.nim || 'tidak ditemukan'})`);
        });
    }
    
    return matches;
}

async function updateGeneralPhotosInJSON(matches) {
    try {
        log('💾 Mengupdate properti generalphoto di people.json...');
        
        const dataPath = path.join(process.cwd(), 'public/data/people.json');
        const originalData = JSON.parse(await fs.readFile(dataPath, 'utf8'));
        
        let updatedCount = 0;
        
        const updatedData = originalData.map(student => {
            const nim = student.nim || student.studentId;
            if (nim && matches[nim]) {
                updatedCount++;
                return {
                    ...student,
                    generalphoto: matches[nim].url
                };
            }
            return student;
        });
        
        // Write back to file
        await fs.writeFile(dataPath, JSON.stringify(updatedData, null, 2));
        
        log(`✅ Berhasil mengupdate ${updatedCount} properti generalphoto`, 'success');
        log(`📁 File disimpan: ${dataPath}`, 'success');
        
        return updatedCount;
        
    } catch (error) {
        log(`Error updating JSON: ${error.message}`, 'error');
        throw error;
    }
}

async function showSummary(matches) {
    console.log(`\n${colors.cyan}=== RINGKASAN UPDATE GENERAL PHOTOS ===${colors.reset}`);
    console.log(`${colors.white}Total foto ditemukan:     ${Object.keys(matches).length}${colors.reset}`);
    console.log(`${colors.green}Mahasiswa yang diupdate:  ${Object.keys(matches).length}${colors.reset}`);
    
    console.log(`\n${colors.magenta}=== DETAIL MATCHING ===${colors.reset}`);
    Object.entries(matches).forEach(([nim, match], index) => {
        console.log(`${colors.white}${index + 1}. ${match.student.fullName || match.student.name} (${nim})${colors.reset}`);
        console.log(`   📸 ${match.photo.filename}`);
        console.log(`   🔗 ${match.url}`);
        console.log();
    });
}

async function main() {
    console.log(`${colors.green}🖼️  General Photos Updater (T-25-nonFormal)${colors.reset}`);
    console.log(`${colors.white}=============================================${colors.reset}\n`);
    
    try {
        // Test Cloudinary connection
        log('🔌 Testing Cloudinary connection...');
        await cloudinary.api.ping();
        log('✅ Cloudinary connection successful!', 'success');
        
        // Get general photos from T-25-nonFormal folder
        const photos = await getGeneralPhotosFromCloudinary();
        
        if (photos.length === 0) {
            log('❌ Tidak ada foto ditemukan di folder T-25-nonFormal', 'error');
            return;
        }
        
        // Load student data
        const students = await loadStudentData();
        
        // Match photos with students
        const matches = await matchPhotosWithStudents(photos, students);
        
        if (Object.keys(matches).length === 0) {
            log('❌ Tidak ada foto yang berhasil dicocokkan. Silakan periksa format filename atau folder.', 'error');
            return;
        }
        
        // Show preview
        await showSummary(matches);
        
        // Confirm before updating
        const readline = await import('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        const confirm = await new Promise((resolve) => {
            rl.question(`\n${colors.yellow}Apakah Anda yakin ingin mengupdate properti generalphoto di people.json? (y/N): ${colors.reset}`, resolve);
        });
        
        rl.close();
        
        if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
            const updatedCount = await updateGeneralPhotosInJSON(matches);
            log(`🎉 Selesai! ${updatedCount} generalphoto berhasil diupdate dari folder T-25-nonFormal`, 'success');
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
