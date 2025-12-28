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
            log(`📁 ${folderName}: ${photos.length} photos ditemukan`, 'success');
            
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

async function analyzePhotoMatching() {
    try {
        // Test Cloudinary connection
        log('🔌 Testing Cloudinary connection...');
        await cloudinary.api.ping();
        log('✅ Cloudinary connection successful!', 'success');
        
        // Get photos from both folders
            const [generalPhotos, formalPhotos, students] = await Promise.all([
                getPhotosFromFolder('nonformal-T25'),
                getPhotosFromFolder('formal-T25'),
                loadStudentData()
            ]);
        
        // Create student lookup by NIM
        const studentByNIM = {};
        const allStudents = {};
        students.forEach(student => {
            const nim = student.nim || student.studentId;
            if (nim) {
                studentByNIM[nim] = student;
                allStudents[nim] = student;
            }
        });
        
        // Analyze general photos
            console.log(`\n${colors.cyan}=== ANALISIS GENERAL PHOTOS (nonformal-T25) ===${colors.reset}`);
        
        const matchedGeneralNIMs = new Set();
        const unmatchedGeneralPhotos = [];
        
        generalPhotos.forEach(photo => {
            if (photo.nim && studentByNIM[photo.nim]) {
                matchedGeneralNIMs.add(photo.nim);
            } else {
                unmatchedGeneralPhotos.push(photo);
            }
        });
        
        console.log(`${colors.green}✅ Matched general photos: ${matchedGeneralNIMs.size}${colors.reset}`);
        console.log(`${colors.red}❌ Unmatched general photos: ${unmatchedGeneralPhotos.length}${colors.reset}`);
        
        // Show unmatched general photos
        if (unmatchedGeneralPhotos.length > 0) {
            console.log(`\n${colors.red}📸 GENERAL PHOTOS YANG TIDAK MATCH:${colors.reset}`);
            unmatchedGeneralPhotos.forEach((photo, index) => {
                console.log(`${colors.white}${index + 1}. ${photo.filename}${colors.reset}`);
                console.log(`   🔍 NIM extracted: ${photo.nim || 'tidak ditemukan'}`);
                console.log(`   🔗 URL: ${photo.url}`);
                console.log();
            });
        }
        
        // Find students without general photos
        const studentsWithoutGeneralPhotos = [];
        students.forEach(student => {
            const nim = student.nim || student.studentId;
            if (nim && !matchedGeneralNIMs.has(nim)) {
                studentsWithoutGeneralPhotos.push(student);
            }
        });
        
        console.log(`\n${colors.yellow}👤 MAHASISWA YANG TIDAK PUNYA GENERAL PHOTO: ${studentsWithoutGeneralPhotos.length}${colors.reset}`);
        studentsWithoutGeneralPhotos.forEach((student, index) => {
            const nim = student.nim || student.studentId;
            console.log(`${colors.white}${index + 1}. ${student.fullName || student.name} (${nim})${colors.reset}`);
        });
        
        // Analyze formal photos
            console.log(`\n${colors.cyan}=== ANALISIS FORMAL PHOTOS (formal-T25) ===${colors.reset}`);
        
        const matchedFormalNIMs = new Set();
        const unmatchedFormalPhotos = [];
        
        formalPhotos.forEach(photo => {
            if (photo.nim && studentByNIM[photo.nim]) {
                matchedFormalNIMs.add(photo.nim);
            } else {
                unmatchedFormalPhotos.push(photo);
            }
        });
        
        console.log(`${colors.green}✅ Matched formal photos: ${matchedFormalNIMs.size}${colors.reset}`);
        console.log(`${colors.red}❌ Unmatched formal photos: ${unmatchedFormalPhotos.length}${colors.reset}`);
        
        // Show unmatched formal photos
        if (unmatchedFormalPhotos.length > 0) {
            console.log(`\n${colors.red}🎩 FORMAL PHOTOS YANG TIDAK MATCH:${colors.reset}`);
            unmatchedFormalPhotos.forEach((photo, index) => {
                console.log(`${colors.white}${index + 1}. ${photo.filename}${colors.reset}`);
                console.log(`   🔍 NIM extracted: ${photo.nim || 'tidak ditemukan'}`);
                console.log(`   🔗 URL: ${photo.url}`);
                console.log();
            });
        }
        
        // Find students without formal photos
        const studentsWithoutFormalPhotos = [];
        students.forEach(student => {
            const nim = student.nim || student.studentId;
            if (nim && !matchedFormalNIMs.has(nim)) {
                studentsWithoutFormalPhotos.push(student);
            }
        });
        
        console.log(`\n${colors.yellow}👤 MAHASISWA YANG TIDAK PUNYA FORMAL PHOTO: ${studentsWithoutFormalPhotos.length}${colors.reset}`);
        studentsWithoutFormalPhotos.forEach((student, index) => {
            const nim = student.nim || student.studentId;
            console.log(`${colors.white}${index + 1}. ${student.fullName || student.name} (${nim})${colors.reset}`);
        });
        
        // Summary
        console.log(`\n${colors.cyan}=== RINGKASAN LENGKAP ===${colors.reset}`);
        console.log(`${colors.white}Total mahasiswa: ${students.length}${colors.reset}`);
        console.log(`${colors.white}Total general photos: ${generalPhotos.length}${colors.reset}`);
        console.log(`${colors.white}Total formal photos: ${formalPhotos.length}${colors.reset}`);
        console.log();
        console.log(`${colors.green}Mahasiswa dengan general photo: ${matchedGeneralNIMs.size}${colors.reset}`);
        console.log(`${colors.red}Mahasiswa tanpa general photo: ${studentsWithoutGeneralPhotos.length}${colors.reset}`);
        console.log(`${colors.green}Mahasiswa dengan formal photo: ${matchedFormalNIMs.size}${colors.reset}`);
        console.log(`${colors.red}Mahasiswa tanpa formal photo: ${studentsWithoutFormalPhotos.length}${colors.reset}`);
        console.log();
        console.log(`${colors.red}Unmatched general photos: ${unmatchedGeneralPhotos.length}${colors.reset}`);
        console.log(`${colors.red}Unmatched formal photos: ${unmatchedFormalPhotos.length}${colors.reset}`);
        
        // Coverage percentage
        const generalCoverage = ((matchedGeneralNIMs.size / students.length) * 100).toFixed(1);
        const formalCoverage = ((matchedFormalNIMs.size / students.length) * 100).toFixed(1);
        
        console.log(`\n${colors.cyan}=== COVERAGE ===${colors.reset}`);
        console.log(`${colors.white}General photo coverage: ${generalCoverage}%${colors.reset}`);
        console.log(`${colors.white}Formal photo coverage: ${formalCoverage}%${colors.reset}`);
        
    } catch (error) {
        log(`Fatal error: ${error.message}`, 'error');
        console.error(error);
        process.exit(1);
    }
}

async function main() {
    console.log(`${colors.green}📊  Photo Analysis Tool${colors.reset}`);
    console.log(`${colors.white}========================${colors.reset}\n`);
    
    await analyzePhotoMatching();
}

// Run the script
main();