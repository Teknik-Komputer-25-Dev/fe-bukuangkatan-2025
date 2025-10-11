// Utility untuk menangani gambar yang error
export const handleImageError = (event, fallbackUrl = '/images/placeholder-profile.jpg') => {
  event.target.src = fallbackUrl
  event.target.onerror = null // Prevent infinite loop
}

// Format tanggal dari DD/MM/YYYY ke format yang lebih readable
export const formatDisplayDate = (dateString) => {
  if (!dateString) return ''
  
  try {
    const [day, month, year] = dateString.split('/')
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ]
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`
  } catch (error) {
    return dateString
  }
}

// Convert DD/MM/YYYY ke YYYY-MM-DD untuk input date
export const convertToInputDate = (dateString) => {
  if (!dateString) return ''
  
  try {
    const [day, month, year] = dateString.split('/')
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  } catch (error) {
    return ''
  }
}

// Normalize string untuk perbandingan
export const normalizeString = (str) => {
  return str.toLowerCase().trim().replace(/\s+/g, ' ')
}

// Random array element
export const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

// Shuffle array
export const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}