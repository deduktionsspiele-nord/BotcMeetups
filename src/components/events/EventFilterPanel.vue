<template>
  <div class="bg-dark-800 rounded-lg border border-dark-600 p-6 mb-6 animate-fadeIn">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-bold text-light-100">Filter Events</h3>
      <button 
        @click="resetFilters"
        class="text-light-300 hover:text-light-100 flex items-center text-sm"
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
        <label class="block text-sm font-medium text-light-200 mb-2 flex items-center">
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
          class="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-primary-400 text-light-100"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-light-200 mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Date Range
        </label>
        <select 
          class="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-primary-400 text-light-100"
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
        <label class="block text-sm font-medium text-light-200 mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          Event Type
        </label>
        <select 
          class="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-primary-400 text-light-100"
          v-model="filters.isPublic"
        >
          <option value="">All events</option>
          <option :value="true">Public only</option>
          <option :value="false">Private only</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-light-200 mb-2 flex items-center">
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
            <span class="ml-3 text-sm font-medium text-light-200">
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
      <Button @click="$emit('apply')">
        Apply Filters
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import Button from '@/components/ui/Button.vue';
import type { EventFilters } from '@/types/event';

const props = defineProps<{
  filters: EventFilters;
}>();

const emit = defineEmits<{
  (e: 'update:filters', filters: EventFilters): void;
  (e: 'apply'): void;
}>();

function resetFilters() {
  emit('update:filters', {
    location: '',
    dateRange: null,
    isPublic: null,
    hasAvailableSpots: false
  });
}
</script>