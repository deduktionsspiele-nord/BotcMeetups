import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Event, EventFilters } from '@/types/event'
import { useToastStore } from '@/stores/toast'
import { useAuthStore } from '@/stores/auth'
import { events as mockEvents } from '@/data/mockEvents'

export const useEventsStore = defineStore('events', () => {
  const toastStore = useToastStore()
  const authStore = useAuthStore()
  
  // State
  const events = ref<Event[]>([...mockEvents])
  const isLoading = ref(false)
  
  // Getters
  const allEvents = computed(() => events.value)
  
  const upcomingEvents = computed(() => {
    const now = new Date()
    return events.value
      .filter(event => new Date(event.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 6)
  })
  
  const userEvents = computed(() => {
    if (!authStore.user) return []
    
    return events.value.filter(event => 
      event.createdById === authStore.user?.id || 
      event.participants.some(p => p.userId === authStore.user?.id)
    )
  })
  
  const getEventById = computed(() => {
    return (id: string) => events.value.find(event => event.id === id)
  })
  
  const filteredEvents = computed(() => {
    return (filters: EventFilters) => {
      return events.value.filter(event => {
        // Filter by search term
        if (filters.searchTerm && !event.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) && 
            !event.location.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
          return false
        }
        
        // Filter by location
        if (filters.location && !event.location.toLowerCase().includes(filters.location.toLowerCase())) {
          return false
        }
        
        // Filter by public/private
        if (filters.isPublic !== null && event.isPublic !== filters.isPublic) {
          return false
        }
        
        // Filter by available spots
        if (filters.hasAvailableSpots && event.currentPlayers >= event.maxPlayers) {
          return false
        }
        
        // Filter by date range
        if (filters.dateRange) {
          const eventDate = new Date(event.date)
          const now = new Date()
          
          if (filters.dateRange === 'today') {
            const today = new Date()
            if (eventDate.getDate() !== today.getDate() || 
                eventDate.getMonth() !== today.getMonth() || 
                eventDate.getFullYear() !== today.getFullYear()) {
              return false
            }
          } else if (filters.dateRange === 'this-week') {
            const weekLater = new Date()
            weekLater.setDate(now.getDate() + 7)
            if (eventDate < now || eventDate > weekLater) {
              return false
            }
          } else if (filters.dateRange === 'this-month') {
            const monthLater = new Date()
            monthLater.setMonth(now.getMonth() + 1)
            if (eventDate < now || eventDate > monthLater) {
              return false
            }
          } else if (filters.dateRange === 'next-month') {
            const nextMonthStart = new Date()
            nextMonthStart.setMonth(now.getMonth() + 1)
            nextMonthStart.setDate(1)
            
            const nextMonthEnd = new Date()
            nextMonthEnd.setMonth(now.getMonth() + 2)
            nextMonthEnd.setDate(0)
            
            if (eventDate < nextMonthStart || eventDate > nextMonthEnd) {
              return false
            }
          }
        }
        
        return true
      })
    }
  })
  
  // Actions
  async function fetchEvents() {
    isLoading.value = true
    try {
      // TODO: Replace with actual API call
      // GET /api/v1/events
      // Query params: filters
      
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500))
      // Events are already loaded from mock data
      return true
    } catch (error) {
      console.error('Failed to fetch events', error)
      toastStore.show('Failed to load events', 'error')
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  async function fetchEventById(id: string) {
    isLoading.value = true
    try {
      // TODO: Replace with actual API call
      // GET /api/v1/events/{id}
      
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 300))
      return getEventById.value(id)
    } catch (error) {
      console.error(`Failed to fetch event ${id}`, error)
      toastStore.show('Failed to load event details', 'error')
      return null
    } finally {
      isLoading.value = false
    }
  }
  
  async function createEvent(eventData: Omit<Event, 'id' | 'createdAt' | 'createdById' | 'participants' | 'currentPlayers'>) {
    if (!authStore.user) {
      toastStore.show('You must be logged in to create events', 'error')
      return null
    }
    
    isLoading.value = true
    try {
      // TODO: Replace with actual API call
      // POST /api/v1/events
      // Body: eventData
      
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const newEvent: Event = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        createdById: authStore.user.id,
        currentPlayers: 1, // Creator counts as first player
        participants: [
          {
            userId: authStore.user.id,
            displayName: authStore.user.displayName,
            avatarUrl: authStore.user.avatarUrl,
            isHost: true,
            role: 'Storyteller',
            joinedAt: new Date().toISOString()
          }
        ],
        ...eventData
      }
      
      events.value.unshift(newEvent)
      toastStore.show('Event created successfully!', 'success')
      return newEvent
    } catch (error) {
      console.error('Failed to create event', error)
      toastStore.show('Failed to create event', 'error')
      return null
    } finally {
      isLoading.value = false
    }
  }
  
  async function updateEvent(id: string, updates: Partial<Event>) {
    isLoading.value = true
    try {
      // TODO: Replace with actual API call
      // PUT /api/v1/events/{id}
      // Body: updates
      
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const index = events.value.findIndex(e => e.id === id)
      if (index === -1) {
        throw new Error('Event not found')
      }
      
      events.value[index] = {
        ...events.value[index],
        ...updates
      }
      
      toastStore.show('Event updated successfully!', 'success')
      return events.value[index]
    } catch (error) {
      console.error('Failed to update event', error)
      toastStore.show('Failed to update event', 'error')
      return null
    } finally {
      isLoading.value = false
    }
  }
  
  async function deleteEvent(id: string) {
    isLoading.value = true
    try {
      // TODO: Replace with actual API call
      // DELETE /api/v1/events/{id}
      
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const index = events.value.findIndex(e => e.id === id)
      if (index === -1) {
        throw new Error('Event not found')
      }
      
      events.value.splice(index, 1)
      toastStore.show('Event deleted successfully!', 'success')
      return true
    } catch (error) {
      console.error('Failed to delete event', error)
      toastStore.show('Failed to delete event', 'error')
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  async function joinEvent(eventId: string, role: string = 'Player') {
    if (!authStore.user) {
      toastStore.show('You must be logged in to join events', 'error')
      return false
    }
    
    isLoading.value = true
    try {
      // TODO: Replace with actual API call
      // POST /api/v1/events/{id}/join
      // Body: { role }
      
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const index = events.value.findIndex(e => e.id === eventId)
      if (index === -1) {
        throw new Error('Event not found')
      }
      
      const event = events.value[index]
      
      // Check if already joined
      if (event.participants.some(p => p.userId === authStore.user?.id)) {
        toastStore.show('You are already participating in this event', 'info')
        return true
      }
      
      // Check if event is full
      if (event.currentPlayers >= event.maxPlayers) {
        toastStore.show('This event is already full', 'error')
        return false
      }
      
      // Add user to participants
      const newParticipant = {
        userId: authStore.user.id,
        displayName: authStore.user.displayName,
        avatarUrl: authStore.user.avatarUrl,
        isHost: false,
        role,
        joinedAt: new Date().toISOString()
      }
      
      event.participants.push(newParticipant)
      event.currentPlayers += 1
      
      toastStore.show('You have successfully joined the event!', 'success')
      return true
    } catch (error) {
      console.error('Failed to join event', error)
      toastStore.show('Failed to join event', 'error')
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  async function leaveEvent(eventId: string) {
    if (!authStore.user) {
      return false
    }
    
    isLoading.value = true
    try {
      // TODO: Replace with actual API call
      // POST /api/v1/events/{id}/leave
      
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const index = events.value.findIndex(e => e.id === eventId)
      if (index === -1) {
        throw new Error('Event not found')
      }
      
      const event = events.value[index]
      
      // Check if user is in the event
      const participantIndex = event.participants.findIndex(p => p.userId === authStore.user?.id)
      if (participantIndex === -1) {
        return false
      }
      
      // Check if user is the host
      if (event.participants[participantIndex].isHost) {
        toastStore.show('As the host, you cannot leave the event. You must delete it instead.', 'error')
        return false
      }
      
      // Remove user from participants
      event.participants.splice(participantIndex, 1)
      event.currentPlayers -= 1
      
      toastStore.show('You have left the event', 'success')
      return true
    } catch (error) {
      console.error('Failed to leave event', error)
      toastStore.show('Failed to leave event', 'error')
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  return {
    events,
    isLoading,
    allEvents,
    upcomingEvents,
    userEvents,
    getEventById,
    filteredEvents,
    fetchEvents,
    fetchEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    joinEvent,
    leaveEvent
  }
})