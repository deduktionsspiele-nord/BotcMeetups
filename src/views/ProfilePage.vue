<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="!authStore.isAuthenticated" class="text-center py-16">
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16 text-light-500 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
      <h3 class="text-xl font-bold mb-2">Please Sign In</h3>
      <p class="text-light-600 mb-6 max-w-md mx-auto">
        You need to be signed in to view your profile.
      </p>
      <router-link to="/login">
        <Button>Sign In</Button>
      </router-link>
    </div>
    
    <div v-else>
      <div class="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl md:text-4xl font-display font-bold text-primary-400 mb-2">Your Profile</h1>
          <p class="text-light-600">
            Manage your preferences and view your Blood on the Clocktower activity
          </p>
        </div>
        
        <Button variant="outline" @click="logout">
          Sign Out
        </Button>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div class="lg:col-span-1">
          <div class="bg-dark-800 rounded-lg border border-dark-700 p-6 sticky top-20">
            <div class="text-center mb-6">
              <div class="w-24 h-24 rounded-full bg-primary-800 mx-auto mb-4 flex items-center justify-center">
                <span class="text-white text-2xl font-bold">{{ userInitials }}</span>
              </div>
              <h2 class="text-xl font-bold text-light-900">{{ authStore.user?.displayName }}</h2>
              <p class="text-light-600 text-sm mt-1">{{ authStore.user?.email }}</p>
            </div>
            
            <div class="space-y-2 mt-6">
              <button 
                v-for="tab in tabs" 
                :key="tab.key"
                :class="[
                  'w-full text-left px-3 py-2 rounded-md flex items-center transition-colors',
                  activeTab === tab.key ? 'bg-primary-900/30 text-primary-300' : 'text-light-600 hover:bg-dark-700'
                ]"
                @click="activeTab = tab.key"
              >
                <component :is="tab.icon" class="w-5 h-5 mr-2" />
                {{ tab.label }}
              </button>
            </div>
          </div>
        </div>
        
        <div class="lg:col-span-3">
          <!-- My Events Tab -->
          <div v-if="activeTab === 'events'" class="space-y-6">
            <div class="bg-dark-800 rounded-lg border border-dark-700 p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold">Your Events</h3>
                <router-link to="/create-event">
                  <Button size="sm">Create Event</Button>
                </router-link>
              </div>
              
              <div v-if="myEvents.length" class="space-y-4">
                <router-link 
                  v-for="event in myEvents" 
                  :key="event.id"
                  :to="`/events/${event.id}`"
                  class="block bg-dark-700 rounded-lg p-4 border border-dark-600 hover:border-primary-600 transition-colors"
                >
                  <div class="flex justify-between items-start mb-1">
                    <h4 class="font-bold text-lg">{{ event.title }}</h4>
                    <Badge
                      :variant="isEventHost(event) ? 'accent' : 'primary'"
                      class="ml-2"
                    >
                      {{ isEventHost(event) ? 'Host' : 'Attending' }}
                    </Badge>
                  </div>
                  <div class="text-light-500 text-sm mb-2">
                    {{ formatEventDate(event.date) }}
                  </div>
                  <div class="flex items-center text-light-600 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {{ event.location }}
                  </div>
                </router-link>
              </div>
              
              <div v-else class="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-light-500 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <h4 class="font-bold mb-2">No Events Yet</h4>
                <p class="text-light-600 mb-4">You haven't created or joined any events yet.</p>
                <router-link to="/events">
                  <Button>Find Events</Button>
                </router-link>
              </div>
            </div>
          </div>
          
          <!-- Profile Settings Tab -->
          <div v-else-if="activeTab === 'profile'" class="space-y-6">
            <div class="bg-dark-800 rounded-lg border border-dark-700 p-6">
              <h3 class="text-xl font-bold mb-6">Profile Settings</h3>
              
              <form @submit.prevent="updateUserProfile">
                <div class="space-y-4">
                  <div>
                    <label for="profileName" class="block text-sm font-medium text-light-700 mb-1">
                      Display Name
                    </label>
                    <input
                      id="profileName"
                      v-model="profileForm.displayName"
                      type="text"
                      required
                      class="input"
                    />
                  </div>
                  
                  <div>
                    <label for="profileEmail" class="block text-sm font-medium text-light-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="profileEmail"
                      v-model="profileForm.email"
                      type="email"
                      required
                      class="input"
                      disabled
                    />
                    <p class="mt-1 text-sm text-light-500">
                      Email address cannot be changed at this time.
                    </p>
                  </div>
                  
                  <div>
                    <label for="profileBio" class="block text-sm font-medium text-light-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="profileBio"
                      v-model="profileForm.bio"
                      rows="3"
                      class="input"
                      placeholder="Tell others about your Blood on the Clocktower experience..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label for="profileLocation" class="block text-sm font-medium text-light-700 mb-1">
                      Location
                    </label>
                    <input
                      id="profileLocation"
                      v-model="profileForm.location"
                      type="text"
                      class="input"
                      placeholder="City, State"
                    />
                  </div>
                  
                  <div class="pt-4 flex justify-end">
                    <Button type="submit" :loading="isLoading">Save Changes</Button>
                  </div>
                </div>
              </form>
            </div>
            
            <div class="bg-dark-800 rounded-lg border border-dark-700 p-6">
              <h3 class="text-xl font-bold mb-6">Game Preferences</h3>
              
              <form @submit.prevent="updateGamePreferences">
                <div class="space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-light-700 mb-3">
                      Experience Level
                    </label>
                    <div class="space-y-2">
                      <div class="flex items-center">
                        <input
                          id="beginner"
                          v-model="preferencesForm.experienceLevel"
                          value="beginner"
                          type="radio"
                          name="experience"
                          class="text-primary-600 focus:ring-primary-500 h-4 w-4 border-dark-500"
                        />
                        <label for="beginner" class="ml-2 block text-sm text-light-900">
                          Beginner - New to Blood on the Clocktower
                        </label>
                      </div>
                      <div class="flex items-center">
                        <input
                          id="intermediate"
                          v-model="preferencesForm.experienceLevel"
                          value="intermediate"
                          type="radio"
                          name="experience"
                          class="text-primary-600 focus:ring-primary-500 h-4 w-4 border-dark-500"
                        />
                        <label for="intermediate" class="ml-2 block text-sm text-light-900">
                          Intermediate - Played several games
                        </label>
                      </div>
                      <div class="flex items-center">
                        <input
                          id="expert"
                          v-model="preferencesForm.experienceLevel"
                          value="expert"
                          type="radio"
                          name="experience"
                          class="text-primary-600 focus:ring-primary-500 h-4 w-4 border-dark-500"
                        />
                        <label for="expert" class="ml-2 block text-sm text-light-900">
                          Expert - Experienced player
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-light-700 mb-3">
                      Favorite Roles
                    </label>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <div 
                        v-for="role in availableRoles" 
                        :key="role"
                        class="flex items-center"
                      >
                        <input
                          :id="`role-${role}`"
                          v-model="preferencesForm.favoriteRoles"
                          :value="role"
                          type="checkbox"
                          class="text-primary-600 focus:ring-primary-500 h-4 w-4 border-dark-500"
                        />
                        <label :for="`role-${role}`" class="ml-2 block text-sm text-light-900">
                          {{ role }}
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div class="pt-4 flex justify-end">
                    <Button type="submit" :loading="isLoading">Save Preferences</Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          <!-- Notification Settings Tab -->
          <div v-else-if="activeTab === 'notifications'" class="space-y-6">
            <div class="bg-dark-800 rounded-lg border border-dark-700 p-6">
              <h3 class="text-xl font-bold mb-6">Notification Settings</h3>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between py-2">
                  <div>
                    <h4 class="font-medium text-light-900">Email Notifications</h4>
                    <p class="text-sm text-light-500">
                      Receive notifications about your events via email
                    </p>
                  </div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="notificationSettings.email"
                      class="sr-only peer"
                    />
                    <div class="relative w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-2 
                              peer-focus:ring-primary-400 rounded-full peer peer-checked:after:translate-x-full 
                              peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                              after:left-[2px] after:bg-dark-800 after:border-gray-300 after:border after:rounded-full 
                              after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
                
                <div class="flex items-center justify-between py-2">
                  <div>
                    <h4 class="font-medium text-light-900">Event Reminders</h4>
                    <p class="text-sm text-light-500">
                      Get reminded about upcoming events you've joined
                    </p>
                  </div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="notificationSettings.reminders"
                      class="sr-only peer"
                    />
                    <div class="relative w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-2 
                              peer-focus:ring-primary-400 rounded-full peer peer-checked:after:translate-x-full 
                              peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                              after:left-[2px] after:bg-dark-800 after:border-gray-300 after:border after:rounded-full 
                              after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
                
                <div class="flex items-center justify-between py-2">
                  <div>
                    <h4 class="font-medium text-light-900">New Local Events</h4>
                    <p class="text-sm text-light-500">
                      Be notified when new events are created in your area
                    </p>
                  </div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="notificationSettings.newEvents"
                      class="sr-only peer"
                    />
                    <div class="relative w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-2 
                              peer-focus:ring-primary-400 rounded-full peer peer-checked:after:translate-x-full 
                              peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                              after:left-[2px] after:bg-dark-800 after:border-gray-300 after:border after:rounded-full 
                              after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
                
                <div class="pt-4 flex justify-end">
                  <Button @click="saveNotificationSettings" :loading="isLoading">Save Settings</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { format } from 'date-fns';
import { useAuthStore } from '@/stores/auth';
import { useEventsStore } from '@/stores/events';
import { useToastStore } from '@/stores/toast';
import { Event } from '@/types/event';
import Button from '@/components/ui/Button.vue';
import Badge from '@/components/ui/Badge.vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const eventsStore = useEventsStore();
const toastStore = useToastStore();
const isLoading = computed(() => authStore.isLoading || eventsStore.isLoading);

// Tabs
const tabs = [
  { key: 'events', label: 'My Events', icon: 'svg-calendar' },
  { key: 'profile', label: 'Profile Settings', icon: 'svg-user' },
  { key: 'notifications', label: 'Notifications', icon: 'svg-bell' }
];

// Parse tab from query param or default to 'events'
const initialTab = computed(() => {
  const tabParam = route.query.tab as string;
  return tabs.some(t => t.key === tabParam) ? tabParam : 'events';
});

const activeTab = ref(initialTab.value);

// Profile form
const profileForm = ref({
  displayName: '',
  email: '',
  bio: '',
  location: ''
});

// Game preferences form
const preferencesForm = ref({
  experienceLevel: 'beginner',
  favoriteRoles: [] as string[]
});

// Notification settings
const notificationSettings = ref({
  email: true,
  reminders: true,
  newEvents: false
});

const availableRoles = [
  'Storyteller',
  'Washerwoman',
  'Librarian',
  'Investigator',
  'Chef',
  'Empath',
  'Fortune Teller',
  'Undertaker',
  'Monk',
  'Ravenkeeper',
  'Virgin',
  'Slayer',
  'Soldier',
  'Mayor',
  'Poisoner',
  'Spy',
  'Scarlet Woman',
  'Baron',
  'Imp'
];

// User events
const myEvents = computed(() => eventsStore.userEvents);

// User initials for avatar
const userInitials = computed(() => {
  if (!authStore.user) return '';
  return authStore.user.displayName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
});

// Format event date
function formatEventDate(dateString: string) {
  return format(new Date(dateString), 'EEE, MMM d, yyyy - h:mm a');
}

// Check if user is the host of an event
function isEventHost(event: Event) {
  return event.createdById === authStore.user?.id;
}

// Update profile
async function updateUserProfile() {
  if (!authStore.user) return;
  
  await authStore.updateProfile({
    displayName: profileForm.value.displayName,
    // Note: We're not updating email in this demo
  });
}

// Update game preferences
async function updateGamePreferences() {
  toastStore.show('Preferences saved successfully!', 'success');
}

// Save notification settings
function saveNotificationSettings() {
  toastStore.show('Notification settings updated!', 'success');
}

// Logout function
function logout() {
  authStore.logout();
  router.push('/');
}

// Initialize forms with user data
onMounted(() => {
  if (authStore.user) {
    profileForm.value.displayName = authStore.user.displayName;
    profileForm.value.email = authStore.user.email;
    
    // Fetching user events
    eventsStore.fetchEvents();
  }
});

// SVG icons as Vue components
const svgCalendar = (props, context) => {
  return h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    ...context.attrs
  }, [
    h('rect', { x: '3', y: '4', width: '18', height: '18', rx: '2', ry: '2' }),
    h('line', { x1: '16', y1: '2', x2: '16', y2: '6' }),
    h('line', { x1: '8', y1: '2', x2: '8', y2: '6' }),
    h('line', { x1: '3', y1: '10', x2: '21', y2: '10' })
  ]);
};

const svgUser = (props, context) => {
  return h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    ...context.attrs
  }, [
    h('path', { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }),
    h('circle', { cx: '12', cy: '7', r: '4' })
  ]);
};

const svgBell = (props, context) => {
  return h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    ...context.attrs
  }, [
    h('path', { d: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' }),
    h('path', { d: 'M13.73 21a2 2 0 0 1-3.46 0' })
  ]);
};

import { h } from 'vue';
</script>