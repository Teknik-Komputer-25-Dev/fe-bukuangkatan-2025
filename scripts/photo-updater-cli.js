#!/usr/bin/env node

import { createRequire } from 'module';
import fs from 'fs/promises';
import path from 'path';
import readline from 'readline';

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
const cloudConfig = {
    cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.VITE_CLOUDINARY_API_KEY,
    api_secret: process.env.VITE_CLOUDINARY_API_SECRET
};

console.log('Environment variables loaded:');
console.log('Cloud Name:', cloudConfig.cloud_name || 'NOT FOUND');
console.log('API Key:', cloudConfig.api_key ? 'LOADED' : 'NOT FOUND');
console.log('API Secret:', cloudConfig.api_secret ? 'LOADED' : 'NOT FOUND');

cloudinary.config(cloudConfig);

class PhotoUpdater {
    constructor() {
        this.cloudinaryPhotos = [];
        this.studentData = [];
        this.photoMatches = {};
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    log(message, type = 'info') {
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

    async testConnection() {
        try {
            this.log('Testing Cloudinary connection...');
            const result = await cloudinary.api.ping();
            this.log('Cloudinary connection successful!', 'success');
            return true;
        } catch (error) {
            this.log(`Connection failed: ${error.message}`, 'error');
            return false;
        }
    }

    async loadPhotos() {
        try {
            this.log('Loading photos from Cloudinary...');
            
            let allPhotos = [];
            let nextCursor = null;
            
            do {
                const options = {
                    max_results: 600,
                    resource_type: 'image'
                };
                
                if (nextCursor) {
                    options.next_cursor = nextCursor;
                }
                
                const result = await cloudinary.api.resources(options);
                allPhotos = allPhotos.concat(result.resources);
                nextCursor = result.next_cursor;
                
                this.log(`Loaded ${allPhotos.length} photos so far...`);
                
            } while (nextCursor);
            
            this.cloudinaryPhotos = allPhotos;
            this.log(`Successfully loaded ${this.cloudinaryPhotos.length} photos from Cloudinary`, 'success');
            return true;
        } catch (error) {
            this.log(`Error loading photos: ${error.message}`, 'error');
            return false;
        }
    }

    async loadStudentData() {
        try {
            this.log('Loading student data...');
            const dataPath = path.join(process.cwd(), 'public/data/people.json');
            const data = await fs.readFile(dataPath, 'utf8');
            const rawData = JSON.parse(data);
            
            // Filter out invalid student records
            this.studentData = rawData.filter((student, index) => {
                if (!student) {
                    this.log(`Warning: Empty student record at index ${index}`, 'warning');
                    return false;
                }
                // Check for both nim and studentId fields
                const id = student.nim || student.studentId;
                if (!id) {
                    this.log(`Warning: Student without NIM/studentId at index ${index}: ${student.name || student.fullName || 'unnamed'}`, 'warning');
                    return false;
                }
                const name = student.name || student.fullName;
                if (!name) {
                    this.log(`Warning: Student without name at index ${index}: ID ${id}`, 'warning');
                    return false;
                }
                
                // Normalize the student object
                student.nim = id;
                student.name = name;
                
                return true;
            });
            
            const filteredCount = rawData.length - this.studentData.length;
            if (filteredCount > 0) {
                this.log(`Filtered out ${filteredCount} invalid student records`, 'warning');
            }
            
            this.log(`Successfully loaded ${this.studentData.length} valid student records`, 'success');
            return true;
        } catch (error) {
            this.log(`Error loading student data: ${error.message}`, 'error');
            return false;
        }
    }

    findPhotoForNIM(nim) {
        if (!nim) return null;
        
        // Try exact match first
        let photo = this.cloudinaryPhotos.find(p => p.public_id.includes(nim));
        if (photo) return photo;

        // Try partial matches
        photo = this.cloudinaryPhotos.find(p => {
            const publicId = p.public_id.toLowerCase();
            const nimStr = nim.toString().toLowerCase();
            return publicId.includes(nimStr) || nimStr.includes(publicId.split('/').pop());
        });

        return photo;
    }

    async startMatching() {
        this.log('Starting automatic photo matching...');
        this.photoMatches = {};
        let matchedCount = 0;

        for (let i = 0; i < this.studentData.length; i++) {
            const student = this.studentData[i];
            
            // Skip if student data is incomplete
            if (!student || !student.nim || !student.name) {
                console.log(`\n${colors.yellow}⚠️ Skipping invalid student data at index ${i}${colors.reset}`);
                continue;
            }
            
            const progress = `(${i + 1}/${this.studentData.length})`;
            
            process.stdout.write(`\r${colors.cyan}Matching ${progress}: ${student.name} (${student.nim})...${colors.reset}`);
            
            const photo = this.findPhotoForNIM(student.nim);
            if (photo) {
                const photoUrl = cloudinary.url(photo.public_id);
                this.photoMatches[student.nim] = photoUrl;
                matchedCount++;
            }
        }

        console.log(); // New line after progress
        this.log(`Matching complete! Found ${matchedCount} matches out of ${this.studentData.length} students`, 'success');
        
        const unmatchedCount = this.studentData.length - matchedCount;
        if (unmatchedCount > 0) {
            this.log(`${unmatchedCount} students still need photos`, 'warning');
        }
        
        return { matched: matchedCount, total: this.studentData.length };
    }

    async showUnmatchedStudents() {
        const unmatchedStudents = this.studentData.filter(student => {
            const id = student.nim || student.studentId;
            return student && id && !this.photoMatches[id];
        });
        
        if (unmatchedStudents.length === 0) {
            this.log('All students have been matched with photos!', 'success');
            return;
        }

        this.log(`\n${colors.yellow}Unmatched Students (${unmatchedStudents.length}):${colors.reset}`);
        unmatchedStudents.forEach((student, index) => {
            const name = student.name || student.fullName || 'Unknown';
            const id = student.nim || student.studentId || 'No ID';
            console.log(`${colors.white}${index + 1}. ${name} (${id})${colors.reset}`);
        });
    }

    async addManualMatch() {
        const nim = await this.question('Enter student NIM: ');
        const photoUrl = await this.question('Enter photo URL: ');
        
        if (nim && photoUrl) {
            this.photoMatches[nim] = photoUrl;
            this.log(`Manual match added: ${nim} -> ${photoUrl}`, 'success');
        } else {
            this.log('Invalid input. Please provide both NIM and photo URL.', 'error');
        }
    }

    async saveUpdatedJSON() {
        try {
            this.log('Updating formalPhoto fields in existing JSON...');
            
            // Read the original file again to ensure we have the latest data
            const dataPath = path.join(process.cwd(), 'public/data/people.json');
            const originalData = JSON.parse(await fs.readFile(dataPath, 'utf8'));
            
            let updatedCount = 0;
            
            // Update only the formalPhoto field for matched students
            const updatedData = originalData.map(student => {
                const id = student.nim || student.studentId;
                if (id && this.photoMatches[id]) {
                    updatedCount++;
                    return {
                        ...student,
                        formalphoto: this.photoMatches[id]
                    };
                }
                return student; // Return unchanged if no match
            });

            // Overwrite the original file
            await fs.writeFile(dataPath, JSON.stringify(updatedData, null, 2));
            
            this.log(`Successfully updated ${updatedCount} formalPhoto fields in people.json`, 'success');
            this.log(`File updated: ${dataPath}`, 'success');
            
            return dataPath;
        } catch (error) {
            this.log(`Error updating JSON: ${error.message}`, 'error');
            return null;
        }
    }

    async showStats() {
        console.log(`\n${colors.cyan}=== STATISTICS ===${colors.reset}`);
        console.log(`${colors.white}Total Photos:     ${this.cloudinaryPhotos.length}${colors.reset}`);
        console.log(`${colors.white}Total Students:   ${this.studentData.length}${colors.reset}`);
        console.log(`${colors.green}Matched Photos:   ${Object.keys(this.photoMatches).length}${colors.reset}`);
        console.log(`${colors.yellow}Unmatched:        ${this.studentData.length - Object.keys(this.photoMatches).length}${colors.reset}`);
    }

    question(prompt) {
        return new Promise((resolve) => {
            this.rl.question(`${colors.cyan}${prompt}${colors.reset}`, resolve);
        });
    }

    async showMenu() {
        console.log(`\n${colors.magenta}=== PHOTO UPDATER MENU ===${colors.reset}`);
        console.log(`${colors.white}1. Test Cloudinary Connection${colors.reset}`);
        console.log(`${colors.white}2. Load Photos from Cloudinary${colors.reset}`);
        console.log(`${colors.white}3. Load Student Data${colors.reset}`);
        console.log(`${colors.white}4. Start Auto Matching${colors.reset}`);
        console.log(`${colors.white}5. Show Statistics${colors.reset}`);
        console.log(`${colors.white}6. Show Unmatched Students${colors.reset}`);
        console.log(`${colors.white}7. Add Manual Match${colors.reset}`);
        console.log(`${colors.white}8. Update formalPhoto in people.json${colors.reset}`);
        console.log(`${colors.white}9. Exit${colors.reset}`);
        
        const choice = await this.question('\nSelect an option (1-9): ');
        return choice;
    }

    async run() {
        console.log(`${colors.green}🖼️  Photo Updater CLI Tool${colors.reset}`);
        console.log(`${colors.white}============================${colors.reset}\n`);

        while (true) {
            const choice = await this.showMenu();

            switch (choice) {
                case '1':
                    await this.testConnection();
                    break;
                case '2':
                    await this.loadPhotos();
                    break;
                case '3':
                    await this.loadStudentData();
                    break;
                case '4':
                    if (this.cloudinaryPhotos.length === 0) {
                        this.log('Please load photos first (option 2)', 'error');
                    } else if (this.studentData.length === 0) {
                        this.log('Please load student data first (option 3)', 'error');
                    } else {
                        await this.startMatching();
                    }
                    break;
                case '5':
                    await this.showStats();
                    break;
                case '6':
                    await this.showUnmatchedStudents();
                    break;
                case '7':
                    await this.addManualMatch();
                    break;
                case '8':
                    if (Object.keys(this.photoMatches).length === 0) {
                        this.log('No matches found. Please run matching first (option 4)', 'error');
                    } else {
                        const result = await this.saveUpdatedJSON();
                        if (result) {
                            this.log('✅ formalPhoto fields have been updated in the original file', 'success');
                        }
                    }
                    break;
                case '9':
                    this.log('Goodbye!', 'success');
                    this.rl.close();
                    process.exit(0);
                    break;
                default:
                    this.log('Invalid option. Please select 1-9.', 'error');
            }
        }
    }
}

// Run the application
const updater = new PhotoUpdater();
updater.run().catch(error => {
    console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`);
    process.exit(1);
});