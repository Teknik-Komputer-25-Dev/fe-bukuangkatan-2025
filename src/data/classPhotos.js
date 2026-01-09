/**
 * Class photos data for home carousel
 */
export const classPhotosData = [
  {
    id: 'orientation',
    image: 'https://res.cloudinary.com/dbzgw6qbd/image/upload/v1767958954/home-1_b3czip.jpg',
    title: 'Orientasi Mahasiswa Baru',
    description: 'Hari pertama kami bertemu dan memulai perjalanan bersama',
    date: 'Agustus 2025',
    category: 'event'
  },
  {
    id: 'study-group',
    image: 'https://res.cloudinary.com/dbzgw6qbd/image/upload/v1767959275/discuss-1_veffio.jpg',
    title: 'Belajar Bersama',
    description: 'Saling membantu dalam menghadapi tantangan akademik',
    date: 'Agustus 2025',
    category: 'academic'
  },
  {
    id: 'project-demo',
    image: 'https://res.cloudinary.com/dbzgw6qbd/image/upload/v1767958954/demo-1_fjqn01.jpg',
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