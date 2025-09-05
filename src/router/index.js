import { createRouter, createWebHistory } from "vue-router";

// Import views (lazy loading untuk performa yang lebih baik)
const HomeView = () => import('../views/Home.vue')
const AboutView = () => import('../views/AboutView.vue')
const ProfileView = () => import('../views/ProfileView.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView
  },
  // Catch-all route untuk 404 (redirect ke home untuk sekarang)
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router