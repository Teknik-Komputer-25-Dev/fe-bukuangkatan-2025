/**
 * Class photos data for home carousel
 */
export const classPhotosData = [
  {
    id: 'orientation',
    image: 'src/assets/images/orientation.JPG',
    title: 'Orientasi Mahasiswa Baru',
    description: 'Hari pertama kami bertemu dan memulai perjalanan bersama',
    date: 'Agustus 2025',
    category: 'event'
  },
  {
    id: 'study-group',
    image: 'src/assets/images/study-group.JPG',
    title: 'Belajar Bersama',
    description: 'Saling membantu dalam menghadapi tantangan akademik',
    date: 'Agustus 2025',
    category: 'academic'
  },
  {
    id: 'project-demo',
    image: 'src/assets/images/project-demo.JPG',
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