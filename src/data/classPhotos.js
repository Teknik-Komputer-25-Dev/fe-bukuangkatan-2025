/**
 * Class photos data for home carousel
 */
export const classPhotosData = [
  {
    id: 'orientation',
    image: 'https://res.cloudinary.com/dr5hcyo7i/image/upload/v1760168816/orientation_hrkem0.jpg',
    title: 'Orientasi Mahasiswa Baru',
    description: 'Hari pertama kami bertemu dan memulai perjalanan bersama',
    date: 'Agustus 2025',
    category: 'event'
  },
  {
    id: 'study-group',
    image: 'https://res.cloudinary.com/dr5hcyo7i/image/upload/v1760168826/study-group_upegkg.jpg',
    title: 'Belajar Bersama',
    description: 'Saling membantu dalam menghadapi tantangan akademik',
    date: 'Agustus 2025',
    category: 'academic'
  },
  {
    id: 'project-demo',
    image: 'https://res.cloudinary.com/dr5hcyo7i/image/upload/v1760803168/project-demo_saio0d.jpg',
    title: 'Demo Proyek',
    description: 'Menampilkan hasil karya dan inovasi terbaru',
    date: 'Agustus 2025',
    category: 'project'
  }
];

/**
 * Get filtered photos by category
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered photos array
 */
export const getPhotosByCategory = (category) => {
  if (!category) return classPhotosData;
  return classPhotosData.filter(photo => photo.category === category);
};

/**
 * Get photo by ID
 * @param {string} id - Photo ID
 * @returns {Object|null} Photo object or null if not found
 */
export const getPhotoById = (id) => {
  return classPhotosData.find(photo => photo.id === id) || null;
};