import { ref, computed } from "vue";
import { supabase } from "@/utils/supabaseClient.js";
import { useRouter } from "vue-router";

export const authState = {
  user: ref(null),
  loading: ref(true),
  initialized: ref(false),
};

let authListener = null;

export function useAuth() {
  const router = useRouter();

  const initAuth = async () => {
    if (authState.initialized.value) return; 

    authState.loading.value = true;

    const { data } = await supabase.auth.getSession();

    authState.user.value = data.session?.user ?? null;

    if (!authListener) {
      authListener = supabase.auth.onAuthStateChange((_event, session) => {
        authState.user.value = session?.user ?? null;
        authState.loading.value = false;
      });
    }

    authState.loading.value = false;
    authState.initialized.value = true;
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      authState.user.value = null;
      await router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      authState.user.value = null;
      await router.push('/');
    }
  };

  const sendMagicLink = async (email) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { redirectTo: window.location.origin },
    });
    if (error) throw error;
    return true;
  };

  const role = computed(() => authState.user.value?.app_metadata?.role ?? null);
  const isAdmin = computed(() => role.value === "admin");

  return {
    user: authState.user,
    loading: authState.loading,
    initAuth,
    logout,
    sendMagicLink,
    role,
    isAdmin,
  };
}
