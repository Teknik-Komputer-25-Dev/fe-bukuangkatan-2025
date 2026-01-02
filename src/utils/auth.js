export const isAuthenticated = () => localStorage.getItem('auth') === 'true'

export const logout = (router) => {
  localStorage.removeItem('auth')
  if (router) {
    router.replace({ name: 'Login' })
    return
  }
  window.location.assign('/login')
}
