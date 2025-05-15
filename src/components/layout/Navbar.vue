<template>
  <header 
    :class="[
      'sticky top-0 z-50 transition-all duration-300',
      scrolled ? 'bg-dark-900/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
    ]"
  >
    <div class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo & Nav Links -->
        <div class="flex items-center space-x-8">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-contain bg-center bg-no-repeat" style="background-image: url('/src/assets/images/DSN_Logo_screen_new.png')"></div>
            <span class="font-display text-xl font-bold text-primary-400 hidden md:block">
              {{ $t('app.name') }}
            </span>
          </router-link>
          
          <nav class="hidden md:flex items-center space-x-6">
            <router-link 
              v-for="link in navLinks" 
              :key="link.path" 
              :to="link.path"
              class="text-light-700 hover:text-primary-400 transition-colors py-1"
              active-class="text-primary-400 border-b-2 border-primary-400"
            >
              {{ $t(link.label) }}
            </router-link>
          </nav>
        </div>
        
        <!-- Auth Buttons / User Menu -->
        <div class="flex items-center space-x-4">
          <LanguageSwitcher class="mr-2" />
          
          <template v-if="!authStore.isAuthenticated">
            <router-link to="/login" class="text-light-700 hover:text-light-900">
              {{ $t('nav.login') }}
            </router-link>
            <router-link to="/register" class="btn btn-primary">
              {{ $t('nav.signup') }}
            </router-link>
          </template>
          <template v-else>
            <div class="relative">
              <button 
                @click="toggleUserMenu"
                class="flex items-center space-x-2 focus:outline-none"
                aria-haspopup="true"
                :aria-expanded="userMenuOpen"
              >
                <div class="w-8 h-8 rounded-full bg-primary-800 flex items-center justify-center text-white">
                  {{ userInitials }}
                </div>
                <span class="hidden md:block text-light-700">{{ authStore.user?.displayName }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-light-700" :class="{ 'rotate-180': userMenuOpen }" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <div 
                v-if="userMenuOpen"
                class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-dark-800 border border-dark-700 overflow-hidden z-20"
              >
                <div class="py-1">
                  <router-link 
                    v-for="item in userMenuItems" 
                    :key="item.label" 
                    :to="item.path"
                    class="block px-4 py-2 text-sm text-light-700 hover:bg-dark-700"
                    @click="userMenuOpen = false"
                  >
                    {{ item.label }}
                  </router-link>
                  <button 
                    @click="logout"
                    class="block w-full text-left px-4 py-2 text-sm text-light-700 hover:bg-dark-700"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </template>
          
          <!-- Mobile menu button -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden rounded-md p-2 text-light-700 hover:bg-dark-800 transition"
            aria-controls="mobile-menu"
            :aria-expanded="mobileMenuOpen"
          >
            <span class="sr-only">Open main menu</span>
            <svg 
              v-if="!mobileMenuOpen"
              xmlns="http://www.w3.org/2000/svg" 
              class="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg 
              v-else
              xmlns="http://www.w3.org/2000/svg" 
              class="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <div 
      v-if="mobileMenuOpen"
      class="md:hidden bg-dark-800 shadow-lg animate-fade-in"
      id="mobile-menu"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link 
          v-for="link in navLinks" 
          :key="link.path" 
          :to="link.path"
          class="block px-3 py-2 rounded-md text-base font-medium text-light-700 hover:bg-dark-700 hover:text-light-900"
          active-class="bg-primary-900 text-primary-100"
          @click="mobileMenuOpen = false"
        >
          {{ $t(link.label) }}
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import LanguageSwitcher from './LanguageSwitcher.vue';

const authStore = useAuthStore();
const router = useRouter();

const mobileMenuOpen = ref(false);
const userMenuOpen = ref(false);
const scrolled = ref(false);

const navLinks = [
  { label: 'nav.home', path: '/' },
  { label: 'nav.events', path: '/events' },
  { label: 'nav.createEvent', path: '/create-event' },
];

const userMenuItems = [
  { label: 'Profile', path: '/profile' },
  { label: 'My Events', path: '/profile?tab=events' },
];

const userInitials = computed(() => {
  if (!authStore.user) return '';
  return authStore.user.displayName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
});

function toggleUserMenu() {
  userMenuOpen.value = !userMenuOpen.value;
}

function logout() {
  authStore.logout();
  userMenuOpen.value = false;
  router.push('/');
}

function handleScroll() {
  scrolled.value = window.scrollY > 20;
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (userMenuOpen.value && !target.closest('[aria-haspopup="true"]')) {
    userMenuOpen.value = false;
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
});
</script>