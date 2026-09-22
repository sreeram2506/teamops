import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
  role: string
}

export const useAuthStore = defineStore('auth', () => {

  const user = useCookie<User | null>('teamops-user', {
    default: () => null,
    sameSite: 'lax'
  })

  const isLoggedIn = computed(() => !!user.value)

  const login = (email: string, password: string) => {
    if (!email || !password) {
      return false
    }

    user.value = {
      id: 1,
      name: 'John Doe',
      email,
      role: 'Admin'
    }

    return true
  }

  const logout = async () => {
    user.value = null
    await navigateTo('/login')
  }

  return {
    user,
    isLoggedIn,
    login,
    logout
  }
})
