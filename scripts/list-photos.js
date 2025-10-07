import { v2 as cloudinary } from 'cloudinary';

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: 'dr5hcyo7i',
});

/**
 * Script untuk melihat daftar foto yang ada di Cloudinary
 */
async function listCloudinaryPhotos() {
  try {
    console.log('🔍 Mengambil daftar foto dari Cloudinary...\n');
    
    const result = await cloudinary.api.resources({
      type: 'upload',
      max_results: 200
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
    
    // Generate manual mapping template
    console.log('📝 Template untuk manual mapping:');
    console.log('Copy paste ini ke getManualPhotoMapping() di cloudinary-browser.js:\n');
    
    result.resources.forEach(resource => {
      const filename = resource.public_id.split('/').pop();
      // Coba extract NIM pattern (21120125xxxxxx)
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

// Jalankan script
listCloudinaryPhotos();