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

## 📂 Project Structure
```bash
student-dashboard/
├── src/
│   ├── assets/        # static assets (images, icons, etc.)
│   ├── components/    # reusable UI components
│   ├── layouts/       # base layouts (dashboard, auth, etc.)
│   ├── pages/         # route-based views
│   ├── store/         # Pinia stores
│   ├── services/      # API services (fetch, axios wrapper)
│   ├── router/        # Vue Router config
│   ├── utils/         # helper functions
│   └── main.ts        # app entry point
├── .eslintrc.cjs      # eslint config
├── .prettierrc        # prettier config
├── package.json
└── vite.config.ts
