# 📁 Arsitektur Folder Digital Book Angkatan '25

## 🗂️ Struktur Folder Lengkap

```
src/
├── assets/           # Asset statis
│   ├── images/       # Gambar (logo, maskot, dll)
│   ├── icons/        # Icon SVG
│   └── data/         # Data JSON (mahasiswa, gallery, dll)
│
├── components/       # Komponen reusable
│   ├── ui/           # Base UI components
│   ├── features/     # Feature-specific components
│   └── layout/       # Layout components
│
├── views/            # Halaman utama
├── layouts/          # Layout wrappers
├── composables/      # Reusable logic
├── stores/           # Pinia stores
├── utils/            # Helper functions
├── router/           # Vue Router
└── style.css        # Global styles
```

---

## 📂 Penjelasan Detail Setiap Folder

### 1. 🖼️ **`assets/`** - Tempat Semua Asset Statis

#### **`assets/images/`**
```
images/
├── logo/
│   ├── class-logo.png
│   ├── class-logo-breakdown/
│   │   ├── element-1.png
│   │   ├── element-2.png
│   │   └── element-3.png
│   └── mascot/
│       ├── mascot-full.png
│       ├── mascot-expressions/
│       └── mascot-poses/
├── home/
│   ├── hero-banner.jpg
│   ├── class-photos/
│   └── backgrounds/
├── identity/
│   ├── vision-illustration.png
│   ├── mission-grid/
│   └── color-palette/
└── gallery/
    ├── events/
    ├── formal/
    └── candid/
```

#### **`assets/icons/`**
```
icons/
├── navigation/
│   ├── home.svg
│   ├── profile.svg
│   └── gallery.svg
├── social/
│   ├── instagram.svg
│   └── linkedin.svg
└── ui/
    ├── arrow-left.svg
    ├── search.svg
    └── filter.svg
```

#### **`assets/data/`**
```
data/
├── students.json       # Data semua mahasiswa
├── gallery.json        # Data foto-foto acara
├── identity.json       # Data visi, misi, warna
└── game-config.json    # Konfigurasi game
```

---

### 2. 🧩 **`components/`** - Komponen yang Bisa Dipakai Ulang

#### **`components/ui/`** - Komponen UI Dasar
```javascript
// BaseButton.vue - Tombol yang konsisten di seluruh app
<BaseButton 
  variant="primary" 
  size="lg" 
  @click="handleClick"
>
  Explore Us
</BaseButton>

// BaseCard.vue - Card untuk student profile, gallery
<BaseCard 
  :image="student.photo" 
  :title="student.name"
  :subtitle="student.major"
/>

// BaseCarousel.vue - Carousel untuk logo breakdown, gallery
<BaseCarousel 
  :items="logoElements" 
  :autoplay="true"
/>

// BaseModal.vue - Modal untuk detail foto, student info
<BaseModal 
  v-model="showModal" 
  :title="modalTitle"
/>
```

#### **`components/features/`** - Komponen Khusus Per Halaman

**`features/home/`**
```javascript
// HeroSection.vue - Banner utama home
// ClassCarousel.vue - Carousel foto kelas
// ScrollReveal.vue - Animasi scroll reveal
// ExploreButton.vue - Tombol menuju Identity
```

**`features/identity/`**
```javascript
// VisionSection.vue - Section visi
// MissionGrid.vue - Grid mission dalam layout
// ColorPalette.vue - Grid 4 warna
// LogoBreakdown.vue - Penjelasan elemen logo
// MascotShowcase.vue - Detail mascot dengan swipe
```

**`features/profile/`**
```javascript
// StudentGrid.vue - Grid foto mahasiswa
// StudentCard.vue - Card individual mahasiswa
// SearchBar.vue - Pencarian dan filter
// Pagination.vue - Navigasi halaman
// StudentModal.vue - Detail mahasiswa
```

**`features/gallery/`**
```javascript
// PhotoGrid.vue - Grid foto acara
// PhotoModal.vue - Modal detail foto
// EventFilter.vue - Filter berdasarkan acara
// LightBox.vue - Viewer foto fullscreen
```

**`features/game/`**
```javascript
// GameBoard.vue - Board game utama
// GameControls.vue - Kontrol game
// ScoreBoard.vue - Papan skor
// GameOverModal.vue - Modal game selesai
```

#### **`components/layout/`** - Komponen Layout
```javascript
// NavBar.vue - Navigation bar responsif
// Footer.vue - Footer dengan info kontak
// SideBar.vue - Sidebar untuk mobile menu
```

---

### 3. 📄 **`views/`** - Halaman Utama

```javascript
// HomeView.vue - Landing page dengan hero + carousel
// IdentityView.vue - Visi, misi, logo, mascot
// ProfileView.vue - Grid mahasiswa dengan search
// GalleryView.vue - Foto-foto acara
// GameView.vue - Interactive game
```

**Contoh struktur HomeView.vue:**
```vue
<template>
  <div class="home-view">
    <HeroSection />
    <ClassIntroSection />
    <ClassCarousel />
  </div>
</template>

<script setup>
import HeroSection from '@/components/features/home/HeroSection.vue'
import ClassIntroSection from '@/components/features/home/ClassIntroSection.vue'
import ClassCarousel from '@/components/features/home/ClassCarousel.vue'
</script>
```

---

### 4. 🎨 **`layouts/`** - Layout Wrapper

```javascript
// DefaultLayout.vue - Layout standar dengan navbar + footer
// GameLayout.vue - Layout khusus game (fullscreen)
```

---

### 5. ⚡ **`composables/`** - Logic yang Bisa Dipakai Ulang

```javascript
// useScroll.js - Handle scroll animations
export function useScroll() {
  const scrollY = ref(0)
  const isScrolling = ref(false)
  
  const handleScroll = () => {
    scrollY.value = window.scrollY
  }
  
  return { scrollY, isScrolling, handleScroll }
}

// useCarousel.js - Logic carousel
export function useCarousel(items) {
  const currentIndex = ref(0)
  const next = () => currentIndex.value++
  const prev = () => currentIndex.value--
  
  return { currentIndex, next, prev }
}

// useSearch.js - Logic search dan filter
export function useSearch(data) {
  const searchQuery = ref('')
  const filters = ref({})
  
  const filteredData = computed(() => {
    return data.filter(item => 
      item.name.includes(searchQuery.value)
    )
  })
  
  return { searchQuery, filters, filteredData }
}

// usePagination.js - Logic pagination
export function usePagination(data, itemsPerPage = 12) {
  const currentPage = ref(1)
  const totalPages = computed(() => 
    Math.ceil(data.length / itemsPerPage)
  )
  
  return { currentPage, totalPages }
}
```

---

### 6. 🗄️ **`stores/`** - State Management dengan Pinia

```javascript
// stores/students.js
export const useStudentsStore = defineStore('students', () => {
  const students = ref([])
  const selectedStudent = ref(null)
  
  const fetchStudents = async () => {
    const data = await import('@/assets/data/students.json')
    students.value = data.default
  }
  
  const selectStudent = (id) => {
    selectedStudent.value = students.value.find(s => s.id === id)
  }
  
  return { students, selectedStudent, fetchStudents, selectStudent }
})

// stores/gallery.js
export const useGalleryStore = defineStore('gallery', () => {
  const photos = ref([])
  const selectedPhoto = ref(null)
  const currentEvent = ref('all')
  
  return { photos, selectedPhoto, currentEvent }
})

// stores/identity.js
export const useIdentityStore = defineStore('identity', () => {
  const vision = ref('')
  const missions = ref([])
  const colorPalette = ref([])
  const logoElements = ref([])
  
  return { vision, missions, colorPalette, logoElements }
})
```

---

### 7. 🛠️ **`utils/`** - Helper Functions

```javascript
// utils/constants.js
export const COLORS = {
  primary: '#3B82F6',
  secondary: '#EF4444',
  accent: '#10B981',
  neutral: '#6B7280'
}

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
}

// utils/formatters.js
export const formatName = (name) => {
  return name.trim().toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID')
}

// utils/validators.js
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}
```

---

### 8. 🛣️ **`router/`** - Routing Configuration

```javascript
// router/index.js
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Digital Book Engineering \'25' }
  },
  {
    path: '/identity',
    name: 'Identity',
    component: () => import('@/views/IdentityView.vue'),
    meta: { title: 'Our Identity' }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { title: 'Student Profiles' }
  },
  // ... routes lainnya
]
```

---

## 🚀 **Workflow Development**

### **1. Mulai dari Data**
```bash
# 1. Buat file data JSON dulu
src/assets/data/students.json
src/assets/data/gallery.json
```

### **2. Buat Komponen UI Dasar**
```bash
# 2. Buat base components
src/components/ui/BaseButton.vue
src/components/ui/BaseCard.vue
```

### **3. Buat Store untuk State Management**
```bash
# 3. Setup stores
src/stores/students.js
src/stores/gallery.js
```

### **4. Buat Feature Components**
```bash
# 4. Buat komponen specific per halaman
src/components/features/home/HeroSection.vue
src/components/features/profile/StudentGrid.vue
```

### **5. Rakit di Views**
```bash
# 5. Rakit semua komponen di views
src/views/HomeView.vue
src/views/ProfileView.vue
```

---

## 🎯 **Best Practices**

1. **Naming Convention**: PascalCase untuk components, camelCase untuk variables
2. **Props Definition**: Selalu define props dengan type dan default value
3. **Emits**: Gunakan defineEmits untuk event handling
4. **Composition API**: Gunakan `<script setup>` untuk code yang lebih clean
5. **TypeScript**: Consider menggunakan TypeScript untuk type safety
6. **Performance**: Lazy loading untuk components yang besar