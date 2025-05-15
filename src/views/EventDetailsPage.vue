<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
    
    <div v-else-if="!event" class="text-center py-16">
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16 text-light-500 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <h3 class="text-xl font-bold mb-2">{{ $t('events.noEvents') }}</h3>
      <p class="text-light-600 mb-6">
        {{ $t('events.noEventsDesc') }}
      </p>
      <router-link to="/events">
        <Button>{{ $t('events.title') }}</Button>
      </router-link>
    </div>
    
    <div v-else>
      <!-- Event Header -->
      <div class="flex flex-col md:flex-row gap-8 mb-10">
        <!-- Event Image -->
        <div class="md:w-1/3">
          <div class="relative rounded-lg overflow-hidden border border-dark-700 h-64">
            <img 
              :src="event.image || 'https://images.pexels.com/photos/1309766/pexels-photo-1309766.jpeg?auto=compress&cs=tinysrgb&w=800'" 
              :alt="event.title" 
              class="w-full h-full object-cover"
            />
            <div v-if="!event.isPublic" class="absolute top-4 right-4 bg-dark-900/80 text-light-900 py-1 px-3 rounded-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span class="text-sm font-medium">{{ $t('events.details.private') }}</span>
            </div>
          </div>
        </div>
        
        <!-- Event Info -->
        <div class="flex-1">
          <div class="flex flex-wrap items-start justify-between gap-4 mb-4">
            <h1 class="text-3xl md:text-4xl font-display font-bold text-primary-400">
              {{ event.title }}
            </h1>
            
            <div class="flex space-x-2">
              <Button 
                v-if="isHost"
                variant="outline"
                @click="showEditMode = !showEditMode"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                {{ showEditMode ? $t('events.details.cancelEdit') : $t('events.details.editEvent') }}
              </Button>
              
              <Button 
                v-if="!isParticipant && !isFull" 
                @click="showRsvpModal = true"
              >
                {{ $t('events.details.rsvp') }}
              </Button>
              
              <Button 
                v-else-if="isParticipant && !isHost" 
                variant="outline"
                @click="leaveEvent"
              >
                {{ $t('events.details.leave') }}
              </Button>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="flex items-center text-light-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>{{ formattedDate }}</span>
            </div>
            
            <div class="flex items-center text-light-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>{{ formattedTime }}</span>
            </div>
            
            <div class="flex items-center text-light-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{{ event.location }}</span>
            </div>
            
            <div class="flex items-center text-light-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>{{ event.currentPlayers }} / {{ event.maxPlayers }} {{ $t('events.details.player').toLowerCase() }}</span>
              <Badge
                v-if="isFull"
                variant="error"
                class="ml-2"
              >
                {{ $t('events.spots.full') }}
              </Badge>
              <Badge
                v-else
                variant="success"
                class="ml-2"
              >
                {{ $t('events.spots.left', { count: event.maxPlayers - event.currentPlayers }) }}
              </Badge>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-xl font-bold mb-2">{{ $t('events.details.description') }}</h3>
            <p class="text-light-600 leading-relaxed">{{ event.description }}</p>
          </div>
          
          <div class="flex flex-wrap gap-2">
            <Button variant="outline" class="!px-3 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
              {{ $t('events.details.share') }}
            </Button>
            
            <Button variant="outline" class="!px-3 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              {{ $t('events.details.save') }}
            </Button>
            
            <Button 
              v-if="isHost"
              variant="outline" 
              class="!px-3 text-sm text-error-500 hover:bg-error-500 hover:text-white"
              @click="showDeleteModal = true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
              {{ $t('events.details.delete') }}
            </Button>
          </div>
        </div>
      </div>
      
      <!-- Participants Section -->
      <div class="bg-dark-800 rounded-lg border border-dark-700 p-6 mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">{{ $t('events.details.participants') }}</h2>
          <Badge variant="primary">{{ event.currentPlayers }} / {{ event.maxPlayers }}</Badge>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div 
            v-for="participant in event.participants" 
            :key="participant.userId"
            class="bg-dark-700 rounded-lg p-4 flex items-center gap-3 border border-dark-600"
          >
            <div class="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center flex-shrink-0">
              <span v-if="!participant.avatarUrl" class="text-white font-medium">
                {{ getInitials(participant.displayName) }}
              </span>
              <img v-else :src="participant.avatarUrl" :alt="participant.displayName" class="w-full h-full rounded-full object-cover" />
            </div>
            
            <div class="flex-1 min-w-0">
              <div class="flex items-center">
                <span class="font-medium truncate">{{ participant.displayName }}</span>
                <Badge v-if="participant.isHost" variant="accent" class="ml-2">{{ $t('events.details.host') }}</Badge>
              </div>
              <div class="text-sm text-light-500">{{ participant.role }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- RSVP Modal -->
    <RsvpModal 
      v-if="showRsvpModal && event" 
      :event="event" 
      @close="showRsvpModal = false"
      @confirm="joinEvent"
    />
    
    <!-- Delete Confirmation Modal -->
    <DeleteConfirmModal
      v-if="showDeleteModal && event"
      :event-title="event.title"
      @close="showDeleteModal = false"
      @confirm="deleteEvent"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useEventsStore } from '@/stores/events';
import { useAuthStore } from '@/stores/auth';
import { useToastStore } from '@/stores/toast';
import Button from '@/components/ui/Button.vue';
import Badge from '@/components/ui/Badge.vue';
import RsvpModal from '@/components/events/RsvpModal.vue';
import DeleteConfirmModal from '@/components/events/DeleteConfirmModal.vue';
import { formatDate, dateFormats } from '@/utils/dateFormat';

const { locale } = useI18n();
const route = useRoute();
const router = useRouter();
const eventsStore = useEventsStore();
const authStore = useAuthStore();
const toastStore = useToastStore();

const eventId = computed(() => route.params.id as string);
const isLoading = computed(() => eventsStore.isLoading);
const event = ref(null);
const selectedRole = ref('Player');

const showRsvpModal = ref(false);
const showDeleteModal = ref(false);
const showEditMode = ref(false);

const formattedDate = computed(() => {
  if (!event.value) return '';
  return formatDate(event.value.date, dateFormats.eventDetails[locale.value], locale.value);
});

const formattedTime = computed(() => {
  if (!event.value) return '';
  return formatDate(event.value.date, dateFormats.time[locale.value], locale.value);
});

const isHost = computed(() => {
  if (!event.value || !authStore.user) return false;
  return event.value.createdById === authStore.user.id;
});

const isParticipant = computed(() => {
  if (!event.value || !authStore.user) return false;
  return event.value.participants.some(p => p.userId === authStore.user.id);
});

const isFull = computed(() => {
  if (!event.value) return false;
  return event.value.currentPlayers >= event.value.maxPlayers;
});

async function fetchEventDetails() {
  const eventData = await eventsStore.fetchEventById(eventId.value);
  if (eventData) {
    event.value = eventData;
  }
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

async function joinEvent(role: string) {
  if (!authStore.isAuthenticated) {
    toastStore.show('You must be logged in to join events', 'error');
    router.push({ name: 'login', query: { redirect: route.fullPath } });
    return;
  }
  
  const success = await eventsStore.joinEvent(eventId.value, role);
  if (success) {
    showRsvpModal.value = false;
    await fetchEventDetails();
  }
}

async function leaveEvent() {
  const success = await eventsStore.leaveEvent(eventId.value);
  if (success) {
    await fetchEventDetails();
  }
}

async function deleteEvent() {
  const success = await eventsStore.deleteEvent(eventId.value);
  if (success) {
    router.push('/events');
  }
}

onMounted(fetchEventDetails);
</script>