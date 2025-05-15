<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="!authStore.isAuthenticated" class="text-center py-16">
      <h2 class="text-2xl font-bold mb-4">{{ $t('profile.signInRequired') }}</h2>
      <p class="text-light-600 mb-6">{{ $t('profile.signInRequiredDesc') }}</p>
      <router-link to="/login">
        <Button>{{ $t('auth.signIn') }}</Button>
      </router-link>
    </div>
    
    <template v-else>
      <!-- Profile Header -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 class="text-3xl md:text-4xl font-display font-bold text-primary-400 mb-2">
            {{ $t('profile.title') }}
          </h1>
          <p class="text-light-600">{{ $t('profile.subtitle') }}</p>
        </div>
        
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 rounded-full bg-primary-800 flex items-center justify-center text-white text-lg font-medium">
            {{ userInitials }}
          </div>
          <div class="text-right">
            <div class="font-medium text-light-900">{{ authStore.user?.displayName }}</div>
            <div class="text-sm text-light-500">{{ authStore.user?.email }}</div>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-12 gap-6">
        <!-- Sidebar Navigation -->
        <div class="col-span-12 md:col-span-3">
          <div class="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden">
            <nav class="flex flex-col">
              <button
                v-for="tab in tabs"
                :key="tab.value"
                @click="activeTab = tab.value"
                class="px-4 py-3 text-left transition-colors"
                :class="[
                  activeTab === tab.value
                    ? 'bg-dark-700 text-primary-400 font-medium'
                    : 'text-light-500 hover:bg-dark-700 hover:text-light-900'
                ]"
              >
                {{ $t(`profile.tabs.${tab.value}`) }}
              </button>
            </nav>
          </div>
        </div>
        
        <!-- Main Content -->
        <div class="col-span-12 md:col-span-9">
          <!-- Events Tab -->
          <div v-if="activeTab === 'events'" class="space-y-6">
            <div v-if="userEvents.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EventCard 
                v-for="event in userEvents" 
                :key="event.id" 
                :event="event" 
              />
            </div>
            
            <div v-else class="text-center py-12 bg-dark-800 rounded-lg border border-dark-700">
              <h3 class="text-xl font-bold mb-2">{{ $t('profile.noEventsYet') }}</h3>
              <p class="text-light-600 mb-6">{{ $t('profile.noEventsYetDesc') }}</p>
              <router-link to="/events">
                <Button>{{ $t('profile.findEvents') }}</Button>
              </router-link>
            </div>
          </div>
          
          <!-- Profile Settings Tab -->
          <div v-if="activeTab === 'profile'" class="space-y-6">
            <div class="bg-dark-800 rounded-lg border border-dark-700 p-6">
              <h3 class="text-xl font-bold mb-6">{{ $t('profile.settings.profileSettings') }}</h3>
              
              <form @submit.prevent="saveProfile" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-light-700 mb-1">
                      {{ $t('profile.settings.displayName') }}
                    </label>
                    <input
                      v-model="profileForm.displayName"
                      type="text"
                      class="input"
                      :placeholder="$t('profile.settings.displayName')"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-light-700 mb-1">
                      {{ $t('profile.settings.email') }}
                    </label>
                    <input
                      v-model="profileForm.email"
                      type="email"
                      disabled
                      class="input bg-dark-700 cursor-not-allowed"
                    />
                    <p class="mt-1 text-sm text-light-500">
                      {{ $t('profile.settings.emailNote') }}
                    </p>
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-light-700 mb-1">
                    {{ $t('profile.settings.bio') }}
                  </label>
                  <textarea
                    v-model="profileForm.bio"
                    rows="4"
                    class="input"
                    :placeholder="$t('profile.settings.bioPlaceholder')"
                  ></textarea>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-light-700 mb-1">
                    {{ $t('profile.settings.location') }}
                  </label>
                  <input
                    v-model="profileForm.location"
                    type="text"
                    class="input"
                    :placeholder="$t('profile.settings.locationPlaceholder')"
                  />
                </div>
                
                <div class="flex justify-end">
                  <Button type="submit" :loading="isLoading">
                    {{ $t('profile.settings.saveChanges') }}
                  </Button>
                </div>
              </form>
            </div>
            
            <div class="bg-dark-800 rounded-lg border border-dark-700 p-6">
              <h3 class="text-xl font-bold mb-6">{{ $t('profile.preferences.title') }}</h3>
              
              <form @submit.prevent="savePreferences" class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-light-700 mb-2">
                    {{ $t('profile.preferences.experienceLevel') }}
                  </label>
                  <div class="space-y-2">
                    <div class="flex items-center">
                      <input
                        type="radio"
                        id="beginner"
                        value="beginner"
                        v-model="preferencesForm.experienceLevel"
                        class="text-primary-600 focus:ring-primary-500 h-4 w-4 border-dark-500"
                      />
                      <label for="beginner" class="ml-2 text-sm text-light-700">
                        {{ $t('profile.preferences.beginner') }}
                      </label>
                    </div>
                    
                    <div class="flex items-center">
                      <input
                        type="radio"
                        id="intermediate"
                        value="intermediate"
                        v-model="preferencesForm.experienceLevel"
                        class="text-primary-600 focus:ring-primary-500 h-4 w-4 border-dark-500"
                      />
                      <label for="intermediate" class="ml-2 text-sm text-light-700">
                        {{ $t('profile.preferences.intermediate') }}
                      </label>
                    </div>
                    
                    <div class="flex items-center">
                      <input
                        type="radio"
                        id="expert"
                        value="expert"
                        v-model="preferencesForm.experienceLevel"
                        class="text-primary-600 focus:ring-primary-500 h-4 w-4 border-dark-500"
                      />
                      <label for="expert" class="ml-2 text-sm text-light-700">
                        {{ $t('profile.preferences.expert') }}
                      </label>
                    </div>
                  </div>
                </div>
                
                <div class="flex justify-end">
                  <Button type="submit" :loading="isLoading">
                    {{ $t('profile.preferences.savePreferences') }}
                  </Button>
                </div>
              </form>
            </div>
          </div>
          
          <!-- Notifications Tab -->
          <div v-if="activeTab === 'notifications'" class="space-y-6">
            <div class="bg-dark-800 rounded-lg border border-dark-700 p-6">
              <h3 class="text-xl font-bold mb-6">{{ $t('profile.notifications.title') }}</h3>
              
              <form @submit.prevent="saveNotifications" class="space-y-6">
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                    <div>
                      <h4 class="text-sm font-medium text-light-900">{{ $t('profile.notifications.email') }}</h4>
                      <p class="text-sm text-light-500">{{ $t('profile.notifications.emailDesc') }}</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        v-model="notificationsForm.email" 
                        class="sr-only peer"
                      />
                      <div class="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-2 
                                peer-focus:ring-primary-400 rounded-full peer peer-checked:after:translate-x-full 
                                peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                                after:left-[2px] after:bg-dark-800 after:border-gray-300 after:border after:rounded-full 
                                after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                    <div>
                      <h4 class="text-sm font-medium text-light-900">{{ $t('profile.notifications.reminders') }}</h4>
                      <p class="text-sm text-light-500">{{ $t('profile.notifications.remindersDesc') }}</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        v-model="notificationsForm.reminders" 
                        class="sr-only peer"
                      />
                      <div class="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-2 
                                peer-focus:ring-primary-400 rounded-full peer peer-checked:after:translate-x-full 
                                peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                                after:left-[2px] after:bg-dark-800 after:border-gray-300 after:border after:rounded-full 
                                after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                    <div>
                      <h4 class="text-sm font-medium text-light-900">{{ $t('profile.notifications.newEvents') }}</h4>
                      <p class="text-sm text-light-500">{{ $t('profile.notifications.newEventsDesc') }}</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        v-model="notificationsForm.newEvents" 
                        class="sr-only peer"
                      />
                      <div class="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-2 
                                peer-focus:ring-primary-400 rounded-full peer peer-checked:after:translate-x-full 
                                peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                                after:left-[2px] after:bg-dark-800 after:border-gray-300 after:border after:rounded-full 
                                after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </div>
                
                <div class="flex justify-end">
                  <Button type="submit" :loading="isLoading">
                    {{ $t('profile.notifications.saveSettings') }}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useEventsStore } from '@/stores/events';
import Button from '@/components/ui/Button.vue';
import EventCard from '@/components/events/EventCard.vue';

const route = useRoute();
const authStore = useAuthStore();
const eventsStore = useEventsStore();

const isLoading = ref(false);

const tabs = [
  { value: 'events', label: 'My Events' },
  { value: 'profile', label: 'Profile Settings' },
  { value: 'notifications', label: 'Notifications' }
];

const activeTab = ref(route.query.tab?.toString() || 'events');

const userEvents = computed(() => eventsStore.userEvents);

const userInitials = computed(() => {
  if (!authStore.user?.displayName) return '';
  return authStore.user.displayName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
});

// Profile form
const profileForm = ref({
  displayName: authStore.user?.displayName || '',
  email: authStore.user?.email || '',
  bio: '',
  location: ''
});

// Preferences form
const preferencesForm = ref({
  experienceLevel: 'beginner'
});

// Notifications form
const notificationsForm = ref({
  email: true,
  reminders: true,
  newEvents: false
});

async function saveProfile() {
  isLoading.value = true;
  try {
    await authStore.updateProfile({
      displayName: profileForm.value.displayName
    });
  } finally {
    isLoading.value = false;
  }
}

async function savePreferences() {
  isLoading.value = true;
  try {
    // In a real app, this would save to the backend
    await new Promise(resolve => setTimeout(resolve, 500));
  } finally {
    isLoading.value = false;
  }
}

async function saveNotifications() {
  isLoading.value = true;
  try {
    // In a real app, this would save to the backend
    await new Promise(resolve => setTimeout(resolve, 500));
  } finally {
    isLoading.value = false;
  }
}
</script>