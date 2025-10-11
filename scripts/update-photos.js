import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET
});

if (!process.env.VITE_CLOUDINARY_CLOUD_NAME) {
  console.error('❌ Missing VITE_CLOUDINARY_CLOUD_NAME in environment variables');
  console.error('Please check your .env file');
  process.exit(1);
}

async function getCloudinaryImages(folder = '') {
  try {
    console.log('🔍 Mengambil daftar foto dari Cloudinary...');
    
    const result = await cloudinary.search
      .expression(folder ? `folder:${folder}` : '')
      .sort_by([['created_at', 'desc']])
      .max_results(500)
      .execute();

    console.log(`✅ Berhasil mengambil ${result.resources.length} foto`);
    
    return result.resources.map(resource => ({
      public_id: resource.public_id,
      url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      format: resource.format,
      created_at: resource.created_at,
      filename: path.basename(resource.public_id)
    }));
    
  } catch (error) {
    console.error('❌ Error mengambil foto dari Cloudinary:', error);
    throw error;
  }
}

/**
 * Fungsi untuk mencocokkan NIM dengan foto berdasarkan nama file
 * @param {Array} images - Array foto dari Cloudinary
 * @param {Array} people - Array data orang dari JSON
 * @returns {Array} Updated people data with photo URLs
 */
function matchPhotosWithPeople(images, people) {
  console.log('🔄 Mencocokkan foto dengan data orang...');
  
  const updatedPeople = people.map(person => {

    const matchingImage = images.find(img => {
      const imgFilename = img.filename.toLowerCase();
      const personNim = person.studentId.toLowerCase();
      
      return imgFilename === personNim || 
             imgFilename.includes(personNim) ||
             personNim.includes(imgFilename);
    });

    if (matchingImage) {
      console.log(`✅ Found photo for ${person.fullName} (${person.studentId}): ${matchingImage.filename}`);
      return {
        ...person,
        photo: matchingImage.url,
        photo_info: {
          public_id: matchingImage.public_id,
          width: matchingImage.width,
          height: matchingImage.height,
          format: matchingImage.format
        }
      };
    } else {
      console.log(`⚠️  No photo found for ${person.fullName} (${person.studentId})`);
      return person;
    }
  });

  const matchedCount = updatedPeople.filter(p => p.formalphoto && !p.formalphoto.includes('drive.google.com')).length;
  console.log(`✅ Successfully matched ${matchedCount}/${people.length} photos`);
  
  return updatedPeople;
}

/**
 * Fungsi utama untuk update people.json dengan foto dari Cloudinary
 */
async function updatePeopleWithCloudinaryPhotos() {
  try {
    console.log('🚀 Starting Cloudinary photo update process...');
    
    const peopleJsonPath = path.join(__dirname, '../public/data/people.json');
    console.log(`📖 Reading people.json from: ${peopleJsonPath}`);
    
    if (!fs.existsSync(peopleJsonPath)) {
      throw new Error(`File people.json tidak ditemukan di: ${peopleJsonPath}`);
    }
    
    const peopleData = JSON.parse(fs.readFileSync(peopleJsonPath, 'utf8'));
    console.log(`📊 Found ${peopleData.length} people in JSON`);
    
    const images = await getCloudinaryImages('profile-photos'); 
    
    const updatedPeople = matchPhotosWithPeople(images, peopleData);
    
    const backupPath = path.join(__dirname, '../public/data/people-backup.json');
    fs.writeFileSync(backupPath, JSON.stringify(peopleData, null, 2));
    console.log(`💾 Backup saved to: ${backupPath}`);
    
    fs.writeFileSync(peopleJsonPath, JSON.stringify(updatedPeople, null, 2));
    console.log(`✅ Updated people.json saved successfully!`);
    
    const stats = {
      total_people: updatedPeople.length,
      with_cloudinary_photos: updatedPeople.filter(p => p.formalphoto && !p.formalphoto.includes('drive.google.com')).length,
      still_google_drive: updatedPeople.filter(p => p.formalphoto && p.formalphoto.includes('drive.google.com')).length,
      no_photos: updatedPeople.filter(p => !p.formalphoto).length
    };
    
    console.log('\n📊 SUMMARY:');
    console.log(`Total people: ${stats.total_people}`);
    console.log(`With Cloudinary photos: ${stats.with_cloudinary_photos}`);
    console.log(`Still Google Drive: ${stats.still_google_drive}`);
    console.log(`No photos: ${stats.no_photos}`);
    
    const peopleWithoutCloudinaryPhotos = updatedPeople.filter(p => !p.formalphoto || p.formalphoto.includes('drive.google.com'));
    if (peopleWithoutCloudinaryPhotos.length > 0) {
      console.log('\n⚠️  People without Cloudinary photos:');
      peopleWithoutCloudinaryPhotos.forEach(person => {
        console.log(`   - ${person.fullName} (${person.studentId})`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error in main process:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  updatePeopleWithCloudinaryPhotos();
}

export {
  getCloudinaryImages,
  matchPhotosWithPeople,
  updatePeopleWithCloudinaryPhotos
};