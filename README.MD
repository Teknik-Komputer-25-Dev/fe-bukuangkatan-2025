# 🎓 Student Management Dashboard

Sebuah aplikasi **frontend** sederhana untuk mengelola data mahasiswa, dibangun dengan **Vue 3**, **Vite**, dan **TailwindCSS**.  
Proyek ini berfokus pada arsitektur yang bersih, maintainable, dan siap dikembangkan lebih lanjut. Bismillah dalam nama Allah yang maha pengasih dan maha penyayang

---

## 🚀 Tech Stack
- [Vue 3](https://vuejs.org/) (Composition API + `<script setup>`)
- [Vite](https://vitejs.dev/) (fast bundler & dev server)
- [TailwindCSS](https://tailwindcss.com/) (utility-first CSS framework)
- [Pinia](https://pinia.vuejs.org/) (state management, ringan & modern)
- [Vue Router](https://router.vuejs.org/) (navigasi antar halaman)
- [ESLint + Prettier](https://eslint.org/) (linting & formatting konsisten)
- [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/okonet/lint-staged) (pre-commit hooks untuk menjaga kualitas kode)

---


## 🛠️ Tech Stack

- **Vue 3** - Framework JavaScript modern dengan Composition API
- **Vite** - Build tool yang cepat dengan hot reload
- **TailwindCSS** - Utility-first CSS framework
- **Vue Router** - Client-side routing
- **Pinia** - State management
- **Swiper.js** - Carousel/slider component
- **Lottie** - Animasi vector
- **Lucide Vue** - Icon library

## 📦 Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd fe-bukuangkatan-2025
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # atau
   npm install
   ```

3. **Jalankan development server**
   ```bash
   pnpm dev
   # atau
   npm run dev
   ```

4. **Buka browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Struktur Project

```
src/
├── components/
│   ├── ui/                    # Komponen UI dasar
│   │   ├── BaseButton.vue     # Button component dengan berbagai variant
│   │   ├── BaseCarousel.vue   # Carousel/slider component
│   │   ├── LottieAnimation.vue # Lottie animation component
│   │   └── LazyImage.vue      # Lazy loading image component
│   └── features/              # Komponen fitur spesifik
├── composables/
│   └── useScrollAnimations.js # Utilitas scroll dan animasi
├── views/
│   └── HomeView.vue          # Halaman utama
├── assets/
│   └── images/               # Gambar dan SVG assets
├── stores/                   # Pinia stores
├── router/                   # Vue Router configuration
└── utils/                    # Utility functions
```

## 🎨 Komponen yang Tersedia

### BaseButton
Button dengan berbagai variant dan ukuran:
```vue
<BaseButton variant="primary" size="lg" @click="handleClick">
  Click Me
</BaseButton>
```

### BaseCarousel
Carousel menggunakan Swiper.js:
```vue
<BaseCarousel :items="photos" :autoplay="{ delay: 3000 }">
  <template #default="{ item }">
    <img :src="item.image" :alt="item.title" />
  </template>
</BaseCarousel>
```

### LottieAnimation
Komponen untuk animasi Lottie:
```vue
<LottieAnimation 
  :animation-data="animationData" 
  :height="300" 
  :width="300" 
/>
```

### LazyImage
Image dengan lazy loading:
```vue
<LazyImage 
  :src="imageUrl" 
  :alt="description"
  class="w-full h-64 object-cover" 
/>
```

## 🔧 Scripts

- `pnpm dev` - Menjalankan development server
- `pnpm build` - Build untuk production
- `pnpm preview` - Preview build production
- `pnpm lint` - Linting dengan ESLint

## 📱 Responsive Design

Project ini menggunakan TailwindCSS untuk responsive design:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🎯 TODO / Roadmap

- [ ] Halaman Identity (profil mahasiswa)
- [ ] Halaman Gallery lengkap
- [ ] Fitur search dan filter
- [ ] Dark mode support
- [ ] PWA implementation
- [ ] Unit testing