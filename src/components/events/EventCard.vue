<template>
  <router-link 
    :to="`/events/${event.id}`"
    class="group block bg-dark-800 rounded-lg overflow-hidden transition-all duration-300 
           hover:transform hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-900/20 
           border border-dark-700 hover:border-primary-600"
  >
    <div class="relative h-48 overflow-hidden">
      <img 
        :src="event.image || 'https://images.pexels.com/photos/1309766/pexels-photo-1309766.jpeg?auto=compress&cs=tinysrgb&w=800'" 
        :alt="event.title" 
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      <div v-if="!event.isPublic" class="absolute top-3 right-3 bg-dark-900/80 text-light-900 py-1 px-2 rounded-md flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span class="text-xs font-medium">{{ $t('events.details.private') }}</span>
      </div>
      
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-900 to-transparent h-24"></div>
    </div>
    
    <div class="p-5">
      <div class="mb-3">
        <div class="flex justify-between items-start">
          <h3 class="text-xl font-display font-bold text-light-900 group-hover:text-primary-400 transition-colors duration-300 mb-1">
            {{ event.title }}
          </h3>
          <Badge
            :variant="spotsAvailable > 0 ? 'success' : 'error'"
            class="ml-2 mt-1"
          >
            {{ spotsAvailable > 0 ? $t('events.spots.left', { count: spotsAvailable }) : $t('events.spots.full') }}
          </Badge>
        </div>
        
        <div class="flex items-center text-light-500 mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span class="text-sm">
            {{ formattedDate }}
          </span>
        </div>
        
        <div class="flex items-center text-light-500 mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span class="text-sm truncate">{{ event.location }}</span>
        </div>
        
        <div class="flex items-center text-light-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span class="text-sm">{{ event.currentPlayers }} / {{ event.maxPlayers }} {{ $t('events.details.player').toLowerCase() }}</span>
        </div>
      </div>
      
      <div class="pt-3 border-t border-dark-600 flex justify-between items-center mt-2">
        <span class="text-sm font-medium text-primary-400 group-hover:text-primary-300 transition-colors">
          {{ $t('events.details.viewDetails') }}
        </span>
        
        <div class="flex -space-x-2">
          <div 
            v-for="(participant, i) in displayedParticipants" 
            :key="i"
            class="w-6 h-6 rounded-full bg-dark-600 border border-dark-800 flex items-center justify-center"
          >
            <span v-if="!participant.avatarUrl" class="text-xs text-light-500">{{ getInitials(participant.displayName) }}</span>
            <img v-else :src="participant.avatarUrl" :alt="participant.displayName" class="w-full h-full rounded-full object-cover" />
          </div>
          
          <div v-if="remainingParticipants > 0" class="w-6 h-6 rounded-full bg-dark-600 border border-dark-800 flex items-center justify-center">
            <span class="text-xs text-light-500">+{{ remainingParticipants }}</span>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Event } from '@/types/event';
import Badge from '@/components/ui/Badge.vue';
import { formatDate, dateFormats } from '@/utils/dateFormat';

const { locale } = useI18n();
const props = defineProps<{
  event: Event
}>();

const spotsAvailable = computed(() => 
  props.event.maxPlayers - props.event.currentPlayers
);

const formattedDate = computed(() => 
  formatDate(props.event.date, dateFormats.eventCard[locale.value], locale.value)
);

const displayedParticipants = computed(() => 
  props.event.participants.slice(0, 3)
);

const remainingParticipants = computed(() => 
  Math.max(0, props.event.participants.length - 3)
);

function getInitials(name: string) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}
</script>