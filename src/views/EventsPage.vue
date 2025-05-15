<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-3xl md:text-4xl font-display font-bold text-primary-400 mb-2">Find Events</h1>
        <p class="text-light-600">
          Discover Blood on the Clocktower games in your area or create your own
        </p>
      </div>
      
      <router-link v-if="authStore.isAuthenticated" to="/create-event">
        <Button>Create New Event</Button>
      </router-link>
    </div>
    
    <div class="mb-8">
      <div class="flex flex-col md:flex-row gap-4 mb-4">
        <div class="relative flex-grow">
          <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-500 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search by title or location..."
            v-model="filters.searchTerm"
            class="input pl-10"
          />
        </div>
        
        <Button 
          variant="outline" 
          @click="showFilters = !showFilters"
          class="md:w-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filters
        </Button>
      </div>
      
      <div 
        v-if="showFilters"
        class="bg-dark-800 rounded-lg border border-dark-700 p-6 mb-6 animate-fade-in"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold text-light-900">Filter Events</h3>
          <button 
            @click="resetFilters"
            class="text-light-500 hover:text-light-900 flex items-center text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            Reset
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-light-700 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Location
            </label>
            <input
              type="text"
              placeholder="City or venue"
              v-model="filters.location"
              class="input"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-light-700 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Date Range
            </label>
            <select 
              class="input"
              v-model="filters.dateRange"
            >
              <option value="">Any date</option>
              <option value="today">Today</option>
              <option value="this-week">This week</option>
              <option value="this-month">This month</option>
              <option value="next-month">Next month</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-light-700 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              Event Type
            </label>
            <select 
              class="input"
              v-model="filters.isPublic"
            >
              <option :value="null">All events</option>
              <option :value="true">Public only</option>
              <option :value="false">Private only</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-light-700 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Availability
            </label>
            <div class="flex items-center h-[42px]">
              <label class="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="filters.hasAvailableSpots"
                  class="sr-only peer"
                />
                <div class="relative w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-2 
                          peer-focus:ring-primary-400 rounded-full peer peer-checked:after:translate-x-full 
                          peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                          after:left-[2px] after:bg-dark-800 after:border-gray-300 after:border after:rounded-full 
                          after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                <span class="ml-3 text-sm font-medium text-light-700">
                  Has available spots
                </span>
              </label>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end mt-4">
          <Button 
            variant="outline" 
            @click="resetFilters"
            class="mr-2"
          >
            Clear
          </Button>
          <Button @click="applyFilters">
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
    
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
    
    <div v-else-if="filteredResults.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <EventCard 
        v-for="event in filteredResults" 
        :key="event.id" 
        :event="event" 
      />
    </div>
    
    <div v-else class="text-center py-16 bg-dark-800 rounded-lg border border-dark-700">
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16 text-light-500 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
      <h3 class="text-xl font-bold mb-2">No events found</h3>
      <p class="text-light-600 mb-6 max-w-md mx-auto">
        We couldn't find any events matching your criteria. Try adjusting your filters or create your own event!
      </p>
      <router-link :to="authStore.isAuthenticated ? '/create-event' : '/login'">
        <Button>{{ authStore.isAuthenticated ? 'Create an Event' : 'Sign in to Create Event' }}</Button>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useEventsStore } from '@/stores/events';
import { useAuthStore } from '@/stores/auth';
import { EventFilters } from '@/types/event';
import Button from '@/components/ui/Button.vue';
import EventCard from '@/components/events/EventCard.vue';

const eventsStore = useEventsStore();
const authStore = useAuthStore();
const isLoading = computed(() => eventsStore.isLoading);

const showFilters = ref(false);
const filters = ref<EventFilters>({
  searchTerm: '',
  location: '',
  dateRange: null,
  isPublic: null,
  hasAvailableSpots: false
});

const filteredResults = computed(() => {
  return eventsStore.filteredEvents(filters.value);
});

function resetFilters() {
  filters.value = {
    searchTerm: '',
    location: '',
    dateRange: null,
    isPublic: null,
    hasAvailableSpots: false
  };
}

function applyFilters() {
  // This function is mostly for UX - the computed property will handle the actual filtering
  showFilters.value = false; // Hide filter panel after applying
}

onMounted(async () => {
  await eventsStore.fetchEvents();
});
</script>