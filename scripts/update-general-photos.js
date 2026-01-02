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
        log('🔍 Mengambil foto non-formal dari folder nonformal-T25...');

        // Use resources_by_asset_folder to get photos from specific folder
        const folderName = 'nonformal-T25';

        try {
            // Get photos from nonformal-T25 folder using resources_by_asset_folder
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
                extractedName: extractNameFromFilename(resource.public_id),
                folder: folderName
            }));

        } catch (err) {
            // Fallback: try using prefix method if folder API fails
            log(`⚠️ Error menggunakan resources_by_asset_folder: ${err.message}`, 'warning');
            log('🔄 Mencoba menggunakan prefix method sebagai fallback...');

            const fallbackResult = await cloudinary.api.resources({
                type: 'upload',
                prefix: 'nonformal-T25/',
                max_results: 500
            });

            const fallbackPhotos = fallbackResult.resources;
            log(`📁 nonformal-T25 (fallback): ${fallbackPhotos.length} photos ditemukan`);

            return fallbackPhotos.map(resource => ({
                public_id: resource.public_id,
                url: resource.secure_url,
                filename: path.basename(resource.public_id),
                nim: extractNIMFromFilename(resource.public_id),
                extractedName: extractNameFromFilename(resource.public_id),
                folder: 'nonformal-T25'
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

function extractNameFromFilename(publicId) {
    // Extract filename from public_id and remove extension
    const filename = path.basename(publicId);
    const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|gif|webp|heic)$/i, '');
    
    // Remove cloudinary suffix (after last underscore)
    const nameWithoutSuffix = nameWithoutExt.replace(/_[a-z0-9]+$/i, '');
    
    // Remove common prefixes and clean up
    let cleanName = nameWithoutSuffix
        // Remove common image prefixes
        .replace(/^(IMG[-_]?|DSC[-_]?|Photo[-_]?|Image[-_]?)\d*[-_]?/i, '')
        // Remove WhatsApp patterns
        .replace(/^IMG-\d{8}-WA\d{4}[-_]?/i, '')
        // Remove screenshot patterns
        .replace(/^Screenshot[-_]\d+[-_]\d+[-_].+?[-_]/i, '')
        // Remove dates
        .replace(/^\d{8}[-_]/i, '')
        .replace(/^\d{4}[-_]\d{2}[-_]\d{2}[-_]/i, '')
        // Remove NIM if it's at the beginning
        .replace(/^21120125\d{6}[-_]?/i, '')
        // Replace underscores and dashes with spaces
        .replace(/[-_]+/g, ' ')
        // Remove extra whitespace
        .trim();
    
    // Split into words and clean each word
    const words = cleanName.split(/\s+/).filter(word => 
        word.length > 1 && // Remove single characters
        !/^\d+$/.test(word) && // Remove pure numbers
        !/^[a-z0-9]{6,}$/i.test(word) // Remove likely cloudinary IDs
    );
    
    return words.join(' ').toLowerCase();
}

function normalizeString(str) {
    return str.toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
}

function calculateNameSimilarity(name1, name2) {
    const normalized1 = normalizeString(name1);
    const normalized2 = normalizeString(name2);
    
    const words1 = normalized1.split(' ');
    const words2 = normalized2.split(' ');
    
    // Check if name2 is a subset of name1 (for cases like "sulthan hanif" vs "sulthan hanif aulia")
    const matchedWords = words2.filter(word2 => 
        words1.some(word1 => word1.includes(word2) || word2.includes(word1))
    );
    
    // Calculate similarity score
    const similarity = matchedWords.length / Math.max(words1.length, words2.length);
    
    return {
        similarity: similarity,
        matchedWords: matchedWords,
        isPartialMatch: matchedWords.length >= Math.min(2, words2.length) && similarity >= 0.5
    };
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
    let nimMatchedCount = 0;
    let nameMatchedCount = 0;
    
    // Create a mapping from NIM to student for faster lookup
    const studentByNIM = {};
    students.forEach(student => {
        const nim = student.nim || student.studentId;
        if (nim) {
            studentByNIM[nim] = student;
        }
    });
    
    // First pass: Match by NIM
    const unmatchedPhotos = [];
    photos.forEach(photo => {
        if (photo.nim && studentByNIM[photo.nim]) {
            matches[photo.nim] = {
                url: photo.url,
                student: studentByNIM[photo.nim],
                photo: photo,
                matchType: 'NIM'
            };
            nimMatchedCount++;
        } else {
            unmatchedPhotos.push(photo);
        }
    });
    
    log(`✅ Matched by NIM: ${nimMatchedCount} foto`, 'success');
    
    // Second pass: Match unmatched photos by name
    if (unmatchedPhotos.length > 0) {
        log(`🔍 Mencoba matching ${unmatchedPhotos.length} foto berdasarkan nama...`);
        
        const nameMatches = [];
        
        unmatchedPhotos.forEach(photo => {
            const extractedName = extractNameFromFilename(photo.public_id);
            
            if (extractedName && extractedName.length > 2) {
                let bestMatch = null;
                let bestScore = 0;
                
                // Compare with all students
                students.forEach(student => {
                    const fullName = student.fullName || student.name || '';
                    const similarityResult = calculateNameSimilarity(fullName, extractedName);
                    
                    if (similarityResult.isPartialMatch && similarityResult.similarity > bestScore) {
                        bestMatch = {
                            student: student,
                            similarity: similarityResult.similarity,
                            matchedWords: similarityResult.matchedWords,
                            extractedName: extractedName
                        };
                        bestScore = similarityResult.similarity;
                    }
                });
                
                if (bestMatch && bestScore >= 0.5) { // Minimum 50% similarity
                    const nim = bestMatch.student.nim || bestMatch.student.studentId;
                    
                    // Check if this student doesn't already have a photo matched
                    if (!matches[nim]) {
                        matches[nim] = {
                            url: photo.url,
                            student: bestMatch.student,
                            photo: photo,
                            matchType: 'NAME',
                            similarity: bestMatch.similarity,
                            extractedName: bestMatch.extractedName,
                            matchedWords: bestMatch.matchedWords
                        };
                        nameMatches.push({
                            photo: photo,
                            match: bestMatch,
                            nim: nim
                        });
                        nameMatchedCount++;
                    }
                }
            }
        });
        
        if (nameMatches.length > 0) {
            log(`✅ Matched by name: ${nameMatchedCount} foto`, 'success');
            
            console.log(`\n${colors.cyan}=== NAME MATCHING RESULTS ===${colors.reset}`);
            nameMatches.forEach((match, index) => {
                console.log(`${colors.white}${index + 1}. ${match.photo.filename}${colors.reset}`);
                console.log(`   👤 Matched: ${match.match.student.fullName || match.match.student.name} (${match.nim})`);
                console.log(`   🔍 Extracted: "${match.match.extractedName}"`);
                console.log(`   📊 Similarity: ${(match.match.similarity * 100).toFixed(1)}%`);
                console.log(`   🎯 Matched words: ${match.match.matchedWords.join(', ')}`);
                console.log();
            });
        }
    }
    
    const totalMatched = nimMatchedCount + nameMatchedCount;
    log(`✅ Total berhasil mencocokkan ${totalMatched} foto dari ${photos.length} foto (${nimMatchedCount} by NIM, ${nameMatchedCount} by name)`, 'success');
    
    // Show remaining unmatched photos
    const finalUnmatched = photos.filter(photo => {
        const nim = photo.nim;
        const hasNimMatch = nim && studentByNIM[nim];
        const hasNameMatch = Object.values(matches).some(match => match.photo.public_id === photo.public_id);
        return !hasNimMatch && !hasNameMatch;
    });
    
    if (finalUnmatched.length > 0) {
        log(`⚠️ ${finalUnmatched.length} foto masih belum cocok:`, 'warning');
        finalUnmatched.forEach(photo => {
            const extractedName = extractNameFromFilename(photo.public_id);
            console.log(`   📸 ${photo.filename}`);
            console.log(`      NIM: ${photo.nim || 'tidak ditemukan'}`);
            console.log(`      Name: "${extractedName || 'tidak dapat diekstrak'}"`);
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
        
        // Get general photos from nonformal-T25 folder
        const photos = await getGeneralPhotosFromCloudinary();

        if (photos.length === 0) {
            log('❌ Tidak ada foto ditemukan di folder nonformal-T25', 'error');
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
            log(`🎉 Selesai! ${updatedCount} generalphoto berhasil diupdate dari folder nonformal-T25`, 'success');
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

// --- INTERACTIVE RENAME FEATURE ---
import readline from 'readline';

async function interactiveRenameAssets({ dryRun = false } = {}) {
    log('🖼️  Cloudinary Asset Renamer (nonformal-T25)', 'info');
    // 1. Fetch assets
    let assets;
    try {
        const result = await cloudinary.api.resources_by_asset_folder('nonformal-T25', { max_results: 500 });
        assets = result.resources;
    } catch (err) {
        log(`Gagal mengambil assets: ${err.message}`, 'error');
        return;
    }
    if (!assets.length) {
        log('Tidak ada asset ditemukan di folder nonformal-T25', 'error');
        return;
    }
    // 2. Display numbered list
    console.log(`\n${colors.cyan}Daftar asset di nonformal-T25:${colors.reset}`);
    assets.forEach((asset, i) => {
        console.log(`${colors.white}${i + 1}. ${asset.public_id}${colors.reset}`);
    });

    // 3. Prompt for selection
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

    // 4. Prompt for new base names
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

    // 5. Preview step
    const preview = selectedAssets.map((asset, i) => {
        const ext = path.extname(asset.public_id);
        const newPublicId = `nonformal-T25/${newNames[i]}`;
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

    // 6. Collision check
    let collision = false;
    for (const { new: newId } of preview) {
        try {
            const exists = await cloudinary.api.resource(newId)
                .then(() => true)
                .catch(e => {
                    // Handle Cloudinary error structure: e.error.http_code
                    if (e && (e.http_code === 404 || (e.error && e.error.http_code === 404))) return false;
                    // Unexpected error, log details
                    log(`Gagal cek public_id ${newId}: ${e && e.message ? e.message : JSON.stringify(e)}`, 'error');
                    // Do NOT treat as collision, just skip this check
                    return null;
                });
            if (exists === true) {
                log(`ABORT: Target public_id sudah ada: ${newId}`, 'error');
                collision = true;
            } else if (exists === null) {
                // Unexpected error, abort the whole process for safety
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

    // 7. Confirm
    const confirm = await ask(`\n${colors.yellow}Lanjutkan rename? (y/N): ${colors.reset}`);
    if (!/^y(es)?$/i.test(confirm.trim())) {
        log('Rename dibatalkan.', 'warning');
        rl.close();
        return;
    }

    // 8. Dry run
    if (dryRun) {
        log('DRY RUN: Tidak ada perubahan dilakukan.', 'info');
        rl.close();
        return;
    }

    // 9. Execute rename
    for (const { old, new: newId } of preview) {
      try {
        await cloudinary.uploader.rename(old, newId, {
          invalidate: true,
          resource_type: "image",
        });

        log(`SUKSES: ${old} → ${newId}`, "success");
      } catch (e) {
        log(`GAGAL: ${old} → ${newId} (${e.message})`, "error");
      }
    }
    rl.close();
}

// --- CLI ENTRY POINT ---
const argv = process.argv.slice(2);
if (argv.includes('--rename-nonformal')) {
    interactiveRenameAssets({ dryRun: argv.includes('--dry-run') });
} else {
    main();
}
