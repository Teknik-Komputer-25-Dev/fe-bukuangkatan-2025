import { createRouter, createWebHistory } from "vue-router";

// Import views (lazy loading untuk performa yang lebih baik)
const HomeView = () => import("@/views/HomeView.vue");
const AboutView = () => import("@/views/IdentityView.vue");
const ProfileView = () => import("@/views/ProfileView.vue");
const GalleryView = () => import("@/views/GalleryView.vue");
const GameView = () => import("@/views/GamesView.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/identity",
    name: "Identity",
    component: AboutView,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: GalleryView,
  },
  {
    path: "/games",
    name: "Games",
    component: GameView,
  },
  // Catch-all route untuk 404 (redirect ke home untuk sekarang)
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
