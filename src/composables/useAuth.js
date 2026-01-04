import { ref, onMounted, computed } from "vue";
import { supabase } from "@/utils/supabaseClient.js";
import { useRouter } from "vue-router";

const user = ref(null);
const loading = ref(true);

let authListener = null;

export function useAuth() {
  const router = useRouter();

  const initAuth = async () => {
    loading.value = true;

    // 1. Ambil session SEKALI
    const { data } = await supabase.auth.getSession();
    
    user.value = data.session?.user ?? null;

    // 2. Pasang listener SEKALI
    if (!authListener) {
      authListener = supabase.auth.onAuthStateChange((_event, session) => {
        user.value = session?.user ?? null;
      });
    }

    loading.value = false;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    // routing biarkan router guard
  };

  const sendMagicLink = async (email) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) throw error;
    return true;
  };

  const role = computed(() => user.value?.app_metadata?.role ?? null);
  const isAdmin = computed(() => role.value === "admin");
  console.log('user role:', role.value, 'isAdmin:', isAdmin.value);
  

  return {
    user,
    loading,
    initAuth,
    logout,
    sendMagicLink,
    role,
    isAdmin,
  };
}
