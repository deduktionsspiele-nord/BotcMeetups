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
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-display font-bold text-primary-400 mb-2">
          {{ $t('profile.title') }}
        </h1>
        <p class="text-light-600">{{ $t('profile.subtitle') }}</p>
      </div>
      
      <!-- Profile Tabs -->
      <div class="mb-8 border-b border-dark-700">
        <nav class="flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            @click="activeTab = tab.value"
            class="py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap"
            :class="[
              activeTab === tab.value
                ? 'border-primary-500 text-primary-400'
                : 'border-transparent text-light-500 hover:text-light-900 hover:border-light-700'
            ]"
          >
            {{ $t(`profile.tabs.${tab.value}`) }}
          </button>
        </nav>
      </div>
      
      <!-- Events Tab -->
      <div v-if="activeTab === 'events'" class="space-y-6">
        <h2 class="text-2xl font-bold mb-6">{{ $t('profile.yourEvents') }}</h2>
        
        <div v-if="userEvents.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <div v-if="activeTab === 'profile'" class="space-y-8">
        <!-- Basic Info -->
        <div class="bg-dark-800 rounded-lg border border-dark-700 p-6">
          <h3 class="text-xl font-bold mb-6">{{ $t('profile.settings.profileSettings') }}</h3>
          
          <form @submit.prevent="saveProfile" class="space-y-6">
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
        
        <!-- Game Preferences -->
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
      <div v-if="activeTab === 'notifications'" class="space-y-8">
        <div class="bg-dark-800 rounded-lg border border-dark-700 p-6">
          <h3 class="text-xl font-bold mb-6">{{ $t('profile.notifications.title') }}</h3>
          
          <form @submit.prevent="saveNotifications" class="space-y-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
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
              
              <div class="flex items-center justify-between">
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
              
              <div class="flex items-center justify-between">
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