/**
 * Environment configuration utilities
 * Centralizes access to environment variables
 */

export const env = {
  // Cloudinary Configuration
  cloudinary: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
    apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
  },

  // App Configuration
  app: {
    title: import.meta.env.VITE_APP_TITLE || 'Buku Angkatan 2025',
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173',
    debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
  },

  // Environment Info
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
}

// Validation function to check required env vars
export const validateEnv = () => {
  const requiredVars = [
    'VITE_CLOUDINARY_CLOUD_NAME',
    'VITE_CLOUDINARY_API_KEY',
  ]

  const missing = requiredVars.filter(
    varName => !import.meta.env[varName]
  )

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing)
    throw new Error(`Missing environment variables: ${missing.join(', ')}`)
  }

  if (env.app.debugMode) {
    console.log('✅ Environment configuration loaded:', {
      cloudName: env.cloudinary.cloudName,
      mode: env.mode,
      isDev: env.isDevelopment,
    })
  }
}

// Helper to generate Cloudinary URLs
export const generateCloudinaryUrl = (publicId, options = {}) => {
  const {
    width = 400,
    height = 400,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    ...otherOptions
  } = options

  if (!env.cloudinary.cloudName) {
    console.warn('⚠️  Cloudinary cloud name not configured')
    return '/images/default-avatar.svg'
  }

  if (!publicId) {
    return '/images/default-avatar.svg'
  }

  const params = new URLSearchParams({
    w: width,
    h: height,
    c: crop,
    q: quality,
    f: format,
    ...otherOptions
  }).toString()

  return `https://res.cloudinary.com/${env.cloudinary.cloudName}/image/upload/${params}/${publicId}`
}

export default env