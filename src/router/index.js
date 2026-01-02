import { createRouter, createWebHistory } from "vue-router";

// Import views (lazy loading untuk performa yang lebih baik)
const HomeView = () => import("@/views/HomeView.vue");
const AboutView = () => import("@/views/IdentityView.vue");
const ProfileView = () => import("@/views/ProfileView.vue");
const GalleryView = () => import("@/views/GalleryView.vue");
const GameView = () => import("@/views/GamesView.vue");
const LoginView = () => import("@/views/Login.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/identity",
    name: "Identity",
    component: AboutView,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: GalleryView,
    meta: { requiresAuth: true },
  },
  {
    path: "/games",
    name: "Games",
    component: GameView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("auth") === "true";
  const requiresAuth = to.matched.some(record => record.meta?.requiresAuth);

  if (to.name === "Login" && isAuthenticated) {
    return next({ name: "Home" });
  }

  if (requiresAuth && !isAuthenticated) {
    return next({ name: "Login" });
  }

  return next();
});

export default router;
