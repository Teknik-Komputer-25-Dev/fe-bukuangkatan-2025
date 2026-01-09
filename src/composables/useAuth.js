import { ref, computed } from "vue";
import { supabase } from "@/utils/supabaseClient.js";
import { useRouter } from "vue-router";

const user = ref(null);
const loading = ref(true);

let authListener = null;

export function useAuth() {
  const router = useRouter();

  const initAuth = async () => {
    loading.value = true;

    const { data } = await supabase.auth.getSession();
    
    user.value = data.session?.user ?? null;

    if (!authListener) {
      authListener = supabase.auth.onAuthStateChange((_event, session) => {
        user.value = session?.user ?? null;
      });
    }

    loading.value = false;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const sendMagicLink = async (email) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { redirectTo: window.location.origin },
    });
    if (error) throw error;
    return true;
  };

  const role = computed(() => user.value?.app_metadata?.role ?? null);
  const isAdmin = computed(() => role.value === "admin");

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
