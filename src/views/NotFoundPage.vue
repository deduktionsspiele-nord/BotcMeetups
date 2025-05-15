<template>
  <div class="container mx-auto px-4 py-16 text-center">
    <div class="max-w-lg mx-auto">
      <h1 class="text-6xl font-display font-bold text-primary-400 mb-6">404</h1>
      
      <div class="relative w-32 h-32 mx-auto my-8">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-accent-400 absolute h-full w-full animate-pulse-slow opacity-60">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 1v2m0 18v2M4.2 4.2l1.4 1.4m12.8 12.8l1.4 1.4M1 12h2m18 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 5a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-primary-400 absolute h-full w-full rotate-45">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h2 class="text-2xl font-bold mb-4">Page Not Found</h2>
      
      <p class="text-light-600 mb-8">
        The townsfolk searched high and low, but couldn't find the page you're looking for. 
        It may have been killed by the demon, or it never existed in the first place.
      </p>
      
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <Button @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Go Back
        </Button>
        
        <router-link to="/">
          <Button variant="outline">Return to Home</Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from '@/components/ui/Button.vue';

const router = useRouter();

function goBack() {
  router.back();
}
</script>