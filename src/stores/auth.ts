import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { User } from '@/types/user'
import { useToastStore } from '@/stores/toast'

export const useAuthStore = defineStore('auth', () => {
  const toastStore = useToastStore()
  
  // State
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  
  // Getters
  const isAuthenticated = computed(() => !!user.value)
  
  // Actions
  function initializeAuth() {
    // Check local storage for existing session
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
      // TODO: Replace with actual API call
      // POST /api/v1/auth/login
      // Body: { email, password }
      
      // Mock login - in real app, this would call an auth service
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // For demo purposes, any email/password combination works
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
      // TODO: Replace with actual API call
      // POST /api/v1/auth/register
      // Body: { email, password, displayName }
      
      // Mock registration - in real app, this would call an auth service
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
    user.value = null
    localStorage.removeItem('botc-user')
    toastStore.show('You have been logged out', 'info')
  }
  
  async function updateProfile(profile: Partial<User>) {
    if (!user.value) return false
    
    try {
      // TODO: Replace with actual API call
      // PUT /api/v1/users/me
      // Body: profile
      
      // Mock profile update
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