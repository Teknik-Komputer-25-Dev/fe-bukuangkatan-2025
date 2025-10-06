import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import { validateEnv } from '@/utils/env.js'

import App from './App.vue'
import router from './router'

// Validate environment configuration
try {
  validateEnv()
  console.log('✅ Environment configuration validated successfully')
} catch (error) {
  console.error('❌ Environment validation failed:', error.message)
  console.warn('⚠️  Some features may not work properly without proper configuration')
}

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount("#app");
