import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { User } from '@/types/user'
import { useToastStore } from '@/stores/toast'

// TODO replace mocking logic with call to backend endpoint
// Use /auth/login and /auth/register endpoints from the API
export const useAuthStore = defineStore('auth', () => {
  const toastStore = useToastStore()
  
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  
  const isAuthenticated = computed(() => !!user.value)
  
  function initializeAuth() {
    // TODO replace with proper JWT token validation and user info fetch
    const storedUser = localStorage.getItem('botc-user')
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch (error) {
        console.error('Failed to parse stored user', error)
        logout()
      }
    }
  }
  
  async function login(email: string, password: string) {
    isLoading.value = true
    try {
      // TODO replace with /auth/login endpoint call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        displayName: email.split('@')[0],
        avatarUrl: null,
        createdAt: new Date().toISOString()
      }
      
      user.value = newUser
      localStorage.setItem('botc-user', JSON.stringify(newUser))
      toastStore.show('Login successful!', 'success')
      return true
    } catch (error) {
      console.error('Login failed', error)
      toastStore.show('Login failed. Please try again.', 'error')
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  async function register(email: string, password: string, displayName: string) {
    isLoading.value = true
    try {
      // TODO replace with /auth/register endpoint call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        displayName,
        avatarUrl: null,
        createdAt: new Date().toISOString()
      }
      
      user.value = newUser
      localStorage.setItem('botc-user', JSON.stringify(newUser))
      toastStore.show('Registration successful!', 'success')
      return true
    } catch (error) {
      console.error('Registration failed', error)
      toastStore.show('Registration failed. Please try again.', 'error')
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  function logout() {
    // TODO add backend logout call if needed
    user.value = null
    localStorage.removeItem('botc-user')
    toastStore.show('You have been logged out', 'info')
  }
  
  async function updateProfile(profile: Partial<User>) {
    if (!user.value) return false
    
    try {
      // TODO replace with /users/me endpoint call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      user.value = {
        ...user.value,
        ...profile
      }
      
      localStorage.setItem('botc-user', JSON.stringify(user.value))
      toastStore.show('Profile updated successfully!', 'success')
      return true
    } catch (error) {
      console.error('Profile update failed', error)
      toastStore.show('Failed to update profile', 'error')
      return false
    }
  }
  
  return {
    user,
    isLoading,
    isAuthenticated,
    initializeAuth,
    login,
    register,
    logout,
    updateProfile
  }
})