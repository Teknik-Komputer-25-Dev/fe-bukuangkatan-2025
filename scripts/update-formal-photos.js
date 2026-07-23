#!/usr/bin/env node

import { createRequire } from 'module';
import fs from 'fs/promises';
import path from 'path';

const require = createRequire(import.meta.url);
const { v2: cloudinary } = require('cloudinary');
require('dotenv').config({ path: path.join(process.cwd(), '.env') });

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

async function getFormalPhotosFromCloudinary() {
    try {
        log('🔍 Mengambil foto formal dari folder formal-T25...');

    
        const folderName = 'formal-T25';

        try {
        
            const formalResult = await cloudinary.api.resources_by_asset_folder(folderName, {
                max_results: 500
            });

            const formalPhotos = formalResult.resources;
            log(`📁 ${folderName}: ${formalPhotos.length} photos ditemukan`, 'success');

            if (formalPhotos.length === 0) {
                log(`⚠️ Tidak ada foto ditemukan di folder ${folderName}`, 'warning');
                return [];
            }

            log(`✅ Berhasil mengambil ${formalPhotos.length} foto untuk formalphoto`, 'success');

            return formalPhotos.map(resource => ({
                public_id: resource.public_id,
                url: resource.secure_url,
                filename: path.basename(resource.public_id),
                nim: extractNIMFromFilename(resource.public_id),
                folder: folderName
            }));

        } catch (err) {
        
            log(`⚠️ Error menggunakan resources_by_asset_folder: ${err.message}`, 'warning');
            log('🔄 Mencoba menggunakan prefix method sebagai fallback...');

            const fallbackResult = await cloudinary.api.resources({
                type: 'upload',
                prefix: 'formal-T25/',
                max_results: 500
            });

            const fallbackPhotos = fallbackResult.resources;
            log(`📁 formal-T25 (fallback): ${fallbackPhotos.length} photos ditemukan`);

            return fallbackPhotos.map(resource => ({
                public_id: resource.public_id,
                url: resource.secure_url,
                filename: path.basename(resource.public_id),
                nim: extractNIMFromFilename(resource.public_id),
                folder: 'formal-T25'
            }));
        }
        
    } catch (error) {
        log(`Error mengambil foto dari Cloudinary: ${error.message}`, 'error');
        throw error;
    }
}

function extractNIMFromFilename(publicId) {

    const filename = path.basename(publicId);
    

    const nimMatch = filename.match(/21120125\d{6}/);
    if (nimMatch) {
        return nimMatch[0];
    }
    

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
    

    const studentByNIM = {};
    students.forEach(student => {
        const nim = student.nim || student.studentId;
        if (nim) {
            studentByNIM[nim] = student;
        }
    });
    

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
    

    const unmatchedPhotos = photos.filter(photo => !photo.nim || !studentByNIM[photo.nim]);
    if (unmatchedPhotos.length > 0) {
        log(`⚠️ ${unmatchedPhotos.length} foto tidak cocok dengan data mahasiswa:`, 'warning');
        unmatchedPhotos.forEach(photo => {
            console.log(`   📸 ${photo.filename} (NIM extracted: ${photo.nim || 'tidak ditemukan'})`);
        });
    }
    
    return matches;
}

async function updateFormalPhotosInJSON(matches) {
    try {
        log('💾 Mengupdate properti formalphoto di people.json...');
        
        const dataPath = path.join(process.cwd(), 'public/data/people.json');
        const originalData = JSON.parse(await fs.readFile(dataPath, 'utf8'));
        
        let updatedCount = 0;
        
        const updatedData = originalData.map(student => {
            const nim = student.nim || student.studentId;
            if (nim && matches[nim]) {
                updatedCount++;
                return {
                    ...student,
                    formalphoto: matches[nim].url
                };
            }
            return student;
        });
        
    
        await fs.writeFile(dataPath, JSON.stringify(updatedData, null, 2));
        
        log(`✅ Berhasil mengupdate ${updatedCount} properti formalphoto`, 'success');
        log(`📁 File disimpan: ${dataPath}`, 'success');
        
        return updatedCount;
        
    } catch (error) {
        log(`Error updating JSON: ${error.message}`, 'error');
        throw error;
    }
}

async function showSummary(matches) {
    console.log(`\n${colors.cyan}=== RINGKASAN UPDATE FORMAL PHOTOS ===${colors.reset}`);
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
    console.log(`${colors.green}🖼️  Formal Photos Updater (formal-T25)${colors.reset}`);
    console.log(`${colors.white}=========================================${colors.reset}\n`);
    
    try {
    
        log('🔌 Testing Cloudinary connection...');
        await cloudinary.api.ping();
        log('✅ Cloudinary connection successful!', 'success');
        
    
        const photos = await getFormalPhotosFromCloudinary();

        if (photos.length === 0) {
            log('❌ Tidak ada foto ditemukan di folder formal-T25', 'error');
            return;
        }
        
    
        const students = await loadStudentData();
        
    
        const matches = await matchPhotosWithStudents(photos, students);
        
        if (Object.keys(matches).length === 0) {
            log('❌ Tidak ada foto yang berhasil dicocokkan. Silakan periksa format filename atau folder.', 'error');
            return;
        }
        
    
        await showSummary(matches);
        
    
        const readline = await import('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        const confirm = await new Promise((resolve) => {
            rl.question(`\n${colors.yellow}Apakah Anda yakin ingin mengupdate properti formalphoto di people.json? (y/N): ${colors.reset}`, resolve);
        });
        
        rl.close();
        
        if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
            const updatedCount = await updateFormalPhotosInJSON(matches);
            log(`🎉 Selesai! ${updatedCount} formalphoto berhasil diupdate dari folder formal-T25`, 'success');
        } else {
            log('❌ Update dibatalkan', 'warning');
        }
        
    } catch (error) {
        log(`Fatal error: ${error.message}`, 'error');
        console.error(error);
        process.exit(1);
    }
}


import readline from 'readline';

async function interactiveRenameAssetsFormal({ dryRun = false } = {}) {
    log('🖼️  Cloudinary Asset Renamer (formal-T25)', 'info');

    let assets;
    try {
        const result = await cloudinary.api.resources_by_asset_folder('formal-T25', { max_results: 500 });
        assets = result.resources;
    } catch (err) {
        log(`Gagal mengambil assets: ${err.message}`, 'error');
        return;
    }
    if (!assets.length) {
        log('Tidak ada asset ditemukan di folder formal-T25', 'error');
        return;
    }

    console.log(`\n${colors.cyan}Daftar asset di formal-T25:${colors.reset}`);
    assets.forEach((asset, i) => {
        console.log(`${colors.white}${i + 1}. ${asset.public_id}${colors.reset}`);
    });


    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const ask = q => new Promise(res => rl.question(q, res));
    let selection;
    while (true) {
        selection = await ask(`\n${colors.yellow}Pilih nomor file yang ingin di-rename (misal: 1,3,5): ${colors.reset}`);
        if (/^\d+(,\d+)*$/.test(selection.replace(/\s+/g, ''))) break;
        log('Input tidak valid. Contoh: 1,3,5', 'warning');
    }
    const indices = selection.split(',').map(s => parseInt(s.trim(), 10) - 1);
    const selectedAssets = indices.map(i => assets[i]).filter(Boolean);
    if (!selectedAssets.length) {
        log('Tidak ada file valid yang dipilih.', 'error');
        rl.close();
        return;
    }


    let newNames = [];
    if (selectedAssets.length === 1) {
        let base = await ask(`Nama baru (tanpa folder, tanpa ekstensi): `);
        base = base.trim();
        if (!base) {
            log('Nama baru tidak boleh kosong.', 'error');
            rl.close();
            return;
        }
        newNames = [base];
    } else {
        for (let i = 0; i < selectedAssets.length; ++i) {
            let base = await ask(`Nama baru untuk [${selectedAssets[i].public_id}]: `);
            base = base.trim();
            if (!base) {
                log('Nama baru tidak boleh kosong.', 'error');
                rl.close();
                return;
            }
            newNames.push(base);
        }
    }


    const preview = selectedAssets.map((asset, i) => {
        const ext = path.extname(asset.public_id);
        const newPublicId = `formal-T25/${newNames[i]}`;
        return {
            old: asset.public_id,
            new: newPublicId,
            asset
        };
    });
    console.log(`\n${colors.magenta}PREVIEW RENAME:${colors.reset}`);
    preview.forEach(({ old, new: n }, i) => {
        console.log(`${colors.yellow}OLD:${colors.reset} ${old}`);
        console.log(`${colors.green}NEW:${colors.reset} ${n}`);
    });


    let collision = false;
    for (const { new: newId } of preview) {
        try {
            const exists = await cloudinary.api.resource(newId)
                .then(() => true)
                .catch(e => {
                
                    if (e && (e.http_code === 404 || (e.error && e.error.http_code === 404))) return false;
                
                    log(`Gagal cek public_id ${newId}: ${e && e.message ? e.message : JSON.stringify(e)}`, 'error');
                
                    return null;
                });
            if (exists === true) {
                log(`ABORT: Target public_id sudah ada: ${newId}`, 'error');
                collision = true;
            } else if (exists === null) {
            
                log('Rename dibatalkan karena error saat cek public_id.', 'error');
                rl.close();
                return;
            }
        } catch (e) {
            log(`Gagal cek public_id ${newId}: ${e && e.message ? e.message : JSON.stringify(e)}`, 'error');
            log('Rename dibatalkan karena error saat cek public_id.', 'error');
            rl.close();
            return;
        }
    }
    if (collision) {
        log('Rename dibatalkan karena ada public_id yang sudah ada.', 'error');
        rl.close();
        return;
    }


    const confirm = await ask(`\n${colors.yellow}Lanjutkan rename? (y/N): ${colors.reset}`);
    if (!/^y(es)?$/i.test(confirm.trim())) {
        log('Rename dibatalkan.', 'warning');
        rl.close();
        return;
    }


    if (dryRun) {
        log('DRY RUN: Tidak ada perubahan dilakukan.', 'info');
        rl.close();
        return;
    }


    for (const { old, new: newId } of preview) {
        try {
             await cloudinary.uploader.rename(old, newId, {
               invalidate: true,
               resource_type: "image",
             });
            
            log(`SUKSES: ${old} → ${newId}`, 'success');
        } catch (e) {
            log(`GAGAL: ${old} → ${newId} (${e.message})`, 'error');
        }
    }
    rl.close();
}

const argv = process.argv.slice(2);
if (argv.includes('--rename-formal')) {
    interactiveRenameAssetsFormal({ dryRun: argv.includes('--dry-run') });
} else {
    main();
}