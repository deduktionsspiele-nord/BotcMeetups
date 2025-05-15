<template>
  <div class="flex flex-col">
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <!-- Overlay gradient -->
      <div class="absolute inset-0 bg-gradient-to-b from-dark-950/90 via-dark-950/70 to-dark-950 z-10"></div>
      
      <!-- Background image -->
      <div class="absolute inset-0 bg-cover bg-center" 
           style="background-image: url('https://images.pexels.com/photos/5480855/pexels-photo-5480855.jpeg?auto=compress&cs=tinysrgb&w=1920'); 
                  background-position: 50% 40%;
                  filter: brightness(0.3)">
      </div>
      
      <div class="container mx-auto px-4 py-16 md:py-32 relative z-20">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-medieval font-bold mb-6 text-light-950 leading-tight">
            <span class="text-primary-400">{{ $t('app.name') }}</span> <br />
            <span class="text-accent-400">{{ $t('nav.home') }}</span>
          </h1>
          
          <p class="text-xl md:text-2xl mb-8 text-light-700 leading-relaxed">
            {{ $t('app.tagline') }}
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4">
            <router-link to="/events">
              <Button size="lg">
                {{ $t('events.title') }}
              </Button>
            </router-link>
            
            <router-link :to="authStore.isAuthenticated ? '/create-event' : '/register'">
              <Button variant="outline" size="lg">
                {{ authStore.isAuthenticated ? $t('events.createEventCta') : $t('auth.createAccount') }}
              </Button>
            </router-link>
          </div>
        </div>
      </div>
      
      <!-- Decorative clock tower silhouette -->
      <div class="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 opacity-20 z-10 hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-primary-500">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 1v2m0 18v2M4.2 4.2l1.4 1.4m12.8 12.8l1.4 1.4M1 12h2m18 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 5a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    </section>
    
    <!-- Why Join Section -->
    <section class="container mx-auto px-4 py-12">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-display font-bold text-primary-400 mb-4">
          {{ $t('profile.title') }}
        </h2>
        <p class="text-lg max-w-3xl mx-auto text-light-600">
          {{ $t('app.tagline') }}
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="bg-dark-800 rounded-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:bg-dark-700 border border-dark-700">
          <div class="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <h3 class="text-xl font-display font-bold mb-2 text-light-900">{{ $t('events.title') }}</h3>
          <p class="text-light-600">
            {{ $t('events.subtitle') }}
          </p>
        </div>
        
        <div class="bg-dark-800 rounded-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:bg-dark-700 border border-dark-700">
          <div class="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <h3 class="text-xl font-display font-bold mb-2 text-light-900">{{ $t('events.location') }}</h3>
          <p class="text-light-600">
            {{ $t('profile.settings.locationPlaceholder') }}
          </p>
        </div>
        
        <div class="bg-dark-800 rounded-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:bg-dark-700 border border-dark-700">
          <div class="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3 class="text-xl font-display font-bold mb-2 text-light-900">{{ $t('events.details.player') }}</h3>
          <p class="text-light-600">
            {{ $t('profile.preferences.favoriteRoles') }}
          </p>
        </div>
        
        <div class="bg-dark-800 rounded-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:bg-dark-700 border border-dark-700">
          <div class="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h3 class="text-xl font-display font-bold mb-2 text-light-900">{{ $t('events.dateRange') }}</h3>
          <p class="text-light-600">
            {{ $t('events.dateOptions.today') }}
          </p>
        </div>
      </div>
    </section>
    
    <!-- Upcoming Events Section -->
    <section class="bg-dark-800 py-12">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between mb-8">
          <h2 class="text-3xl font-display font-bold text-primary-400 mb-4 md:mb-0">
            {{ $t('events.title') }}
          </h2>
          <router-link to="/events">
            <Button variant="outline">{{ $t('events.title') }}</Button>
          </router-link>
        </div>
        
        <div v-if="upcomingEvents.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EventCard 
            v-for="event in upcomingEvents.slice(0, 3)" 
            :key="event.id" 
            :event="event" 
          />
        </div>
        
        <div v-else class="text-center py-12 bg-dark-700 rounded-lg border border-dark-600">
          <h3 class="text-xl font-bold mb-2">{{ $t('events.noEvents') }}</h3>
          <p class="text-light-600 mb-6">{{ $t('events.noEventsDesc') }}</p>
          <router-link :to="authStore.isAuthenticated ? '/create-event' : '/login'">
            <Button>
              {{ authStore.isAuthenticated ? $t('events.createEventCta') : $t('events.signInToCreate') }}
            </Button>
          </router-link>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="container mx-auto px-4 py-12">
      <div class="bg-gradient-to-r from-dark-800 to-dark-700 rounded-lg p-8 md:p-12 text-center">
        <h2 class="text-3xl md:text-4xl font-display font-bold text-primary-400 mb-6">
          {{ $t('auth.createAccount') }}
        </h2>
        <p class="text-lg max-w-3xl mx-auto mb-8 text-light-600">
          {{ $t('app.tagline') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <template v-if="!authStore.isAuthenticated">
            <router-link to="/register">
              <Button size="lg">{{ $t('auth.signUp') }}</Button>
            </router-link>
            <router-link to="/login">
              <Button variant="outline" size="lg">{{ $t('auth.signIn') }}</Button>
            </router-link>
          </template>
          <router-link v-else to="/create-event">
            <Button size="lg">{{ $t('events.createEventCta') }}</Button>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import Button from '@/components/ui/Button.vue';
import EventCard from '@/components/events/EventCard.vue';
import { useEventsStore } from '@/stores/events';
import { useAuthStore } from '@/stores/auth';

const eventsStore = useEventsStore();
const authStore = useAuthStore();

const upcomingEvents = computed(() => eventsStore.upcomingEvents);

onMounted(async () => {
  await eventsStore.fetchEvents();
});
</script>