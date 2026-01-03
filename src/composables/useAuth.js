import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabaseClient.js'
import { useRouter } from 'vue-router'

const user = ref(null)
const loading = ref(true)

export function useAuth() {
  const router = useRouter()

  // Initialize session on load
  const initAuth = async () => {
    loading.value = true
    const { data: { session } } = await supabase.auth.getSession()
    user.value = session ? session.user : null
    
    // Listen for auth changes (login/logout/expiry)
    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session ? session.user : null
      loading.value = false
      
      // Redirect to login if signed out
      if (!session) router.push('/login')
    })
    loading.value = false
  }

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const sendMagicLink = async (email) => {
    const { error: supabaseError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: window.location.origin },
    })
    if (supabaseError) throw supabaseError
    return true
  }

  return { user, loading, initAuth, logout, sendMagicLink }
}