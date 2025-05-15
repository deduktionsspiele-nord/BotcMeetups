import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
  duration: number
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])

  function show(message: string, type: ToastType = 'info', duration: number = 3000) {
    const id = crypto.randomUUID()
    
    toasts.value.push({
      id,
      message,
      type,
      duration
    })
    
    // Auto remove toast after duration
    setTimeout(() => {
      remove(id)
    }, duration)
  }
  
  function remove(id: string) {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }
  
  return {
    toasts,
    show,
    remove
  }
})