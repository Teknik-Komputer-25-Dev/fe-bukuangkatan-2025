import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

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

async function listCloudinaryPhotos() {
  try {
    console.log('🔍 Mengambil daftar foto dari Cloudinary...\n');
    
    const result = await cloudinary.api.resources({
      type: 'upload',
      max_results: 50
    });

    console.log(`📊 Total foto ditemukan: ${result.resources.length}\n`);
    
    console.log('📁 Daftar Folder:');
    const folders = [...new Set(result.resources.map(r => r.public_id.split('/')[0]))];
    folders.forEach(folder => {
      const count = result.resources.filter(r => r.public_id.startsWith(folder)).length;
      console.log(`   📂 ${folder}/ (${count} files)`);
    });
    
    console.log('\n📸 Daftar Foto:');
    result.resources.forEach((resource, index) => {
      console.log(`${index + 1}. ${resource.public_id}`);
      console.log(`   📏 ${resource.width}x${resource.height} | ${resource.format}`);
      console.log(`   🔗 ${resource.secure_url}`);
      console.log(`   📅 ${new Date(resource.created_at).toLocaleDateString()}\n`);
    });
    
    console.log('📝 Template untuk manual mapping:');
    console.log('Copy paste ini ke getManualPhotoMapping() di cloudinary-browser.js:\n');
    
    result.resources.forEach(resource => {
      const filename = resource.public_id.split('/').pop();
      const nimMatch = filename.match(/21120125\d{6}/);
      if (nimMatch) {
        console.log(`      '${nimMatch[0]}': '${resource.public_id}',`);
      } else {
        console.log(`      // '${filename}': '${resource.public_id}',`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

listCloudinaryPhotos();