import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "@/utils/supabaseClient.js";

// Import views (lazy loading untuk performa yang lebih baik)
const HomeView = () => import("@/views/HomeView.vue");
const AboutView = () => import("@/views/IdentityView.vue");
const ProfileView = () => import("@/views/ProfileView.vue");
const GalleryView = () => import("@/views/GalleryView.vue");
const GameView = () => import("@/views/GamesView.vue");
const LoginView = () => import("@/views/Login.vue");
const AdminDashboard = () => import("@/views/AdminDashboard.vue");

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
  {
    path: "/admin",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true, adminOnly: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession();
  const role = session?.user?.app_metadata?.role;
  const requiresAuth = to.matched.some(record => record.meta?.requiresAuth);
  const adminOnly = to.matched.some(record => record.meta?.adminOnly);
  

  if (requiresAuth && !session) {
    next('/login');
    return;
  }

  if (adminOnly && role !== 'admin') {
    next('/');
    return;
  }

  if (to.path === '/login' && session) {
    next('/');
    return;
  }

  next();
});

export default router;
