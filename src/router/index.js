import { createRouter, createWebHistory } from "vue-router";

// Import views (pakai lazy loading untuk performa)
const HomeView = () => import("../views/HomeView.vue");
const AboutView = () => import("../views/IdentityView.vue");
const ProfileView = () => import("../views/ProfileView.vue");
const GalleryView = () => import("../views/GalleryView.vue");

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
  // Catch-all route untuk 404 (sementara redirect ke home)
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
