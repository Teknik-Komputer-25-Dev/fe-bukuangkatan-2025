/**
 * Browser-based script untuk mengambil foto dari Cloudinary
 * Jalankan di browser console atau sebagai module
 */

class CloudinaryPhotoUpdater {
  constructor(cloudName) {
    this.cloudName = cloudName;
    this.baseUrl = `https://res.cloudinary.com/${cloudName}`;
  }

  /**
   * Generate Cloudinary URL dengan transformasi
   * @param {string} publicId - Public ID dari foto
   * @param {Object} options - Transformasi options
   * @returns {string} Full Cloudinary URL
   */
  generateUrl(publicId, options = {}) {
    const {
      width = 400,
      height = 400,
      crop = 'fill',
      quality = 'auto',
      format = 'auto'
    } = options;
    
    const transformations = `w_${width},h_${height},c_${crop},q_${quality},f_${format}`;
    return `${this.baseUrl}/image/upload/${transformations}/${publicId}`;
  }

  /**
   * Mengambil daftar foto dari Cloudinary menggunakan unsigned preset
   * Note: Perlu setup unsigned upload preset di Cloudinary dashboard
   */
  async getPhotosFromApi(folder = '') {
    try {
      // Note: Ini memerlukan CORS dan unsigned preset
      // Alternatif lain adalah menyediakan list manual
      const response = await fetch(`https://api.cloudinary.com/v1_1/${this.cloudName}/resources/image`, {
        headers: {
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch from Cloudinary API');
      }
      
      const data = await response.json();
      return data.resources;
    } catch (error) {
      console.error('API call failed:', error);
      return null;
    }
  }

  /**
   * Manual mapping untuk foto (gunakan ini jika API tidak work)
   * Tambahkan public_id foto Anda di sini
   */
  getManualPhotoMapping() {
    return {
      // Format: 'NIM': 'public_id_di_cloudinary'
      '21120125130058': 'profile-photos/21120125130058',
      '21120125140124': 'profile-photos/21120125140124',
      // Tambahkan mapping lainnya di sini
      // Contoh:
      // '21120125130001': 'profile-photos/john_doe',
      // '21120125130002': 'profile-photos/jane_smith',
    };
  }

  /**
   * Update people data dengan foto dari mapping manual
   * @param {Array} peopleData - Data orang dari JSON
   * @param {Object} photoMapping - Manual mapping NIM to public_id
   * @returns {Array} Updated people data
   */
  updatePeopleWithManualMapping(peopleData, photoMapping = null) {
    const mapping = photoMapping || this.getManualPhotoMapping();
    
    return peopleData.map(person => {
      const publicId = mapping[person.nim];
      
      if (publicId) {
        const photoUrl = this.generateUrl(publicId, {
          width: 400,
          height: 400,
          crop: 'fill',
          quality: 'auto'
        });
        
        console.log(`✅ Adding photo for ${person.fullName} (${person.studentId})`);
        
        return {
          ...person,
          formalphoto: photoUrl, // Replace existing formalphoto field
          _cloudinary_info: {
            public_id: publicId,
            transformations: 'w_400,h_400,c_fill,q_auto'
          }
        };
      }
      
              console.log(`❌ No photo found for ${person.fullName} (${person.studentId})`);
      return person;
    });
  }

  /**
   * Download updated JSON file
   * @param {Array} updatedData - Updated people data
   * @param {string} filename - Download filename
   */
  downloadUpdatedJson(updatedData, filename = 'people-updated.json') {
    const dataStr = JSON.stringify(updatedData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log(`📥 Downloaded ${filename}`);
  }
}

// Usage example untuk browser console:
/*
// 1. Load people.json data
fetch('/data/people.json')
  .then(response => response.json())
  .then(peopleData => {
    // 2. Create updater instance
    const updater = new CloudinaryPhotoUpdater('dr5hcyo7i');
    
    // 3. Update manual mapping di getManualPhotoMapping() method
    
    // 4. Update people data
    const updatedPeople = updater.updatePeopleWithManualMapping(peopleData);
    
    // 5. Download updated file
    updater.downloadUpdatedJson(updatedPeople);
    
    console.log('✅ Process completed!');
  })
  .catch(error => console.error('Error:', error));
*/

// Export untuk module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CloudinaryPhotoUpdater;
}