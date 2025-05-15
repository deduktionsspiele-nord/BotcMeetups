<template>
  <div class="min-h-screen flex flex-col bg-dark-950">
    <Navbar />
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter />
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Navbar from '@/components/layout/Navbar.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import Toast from '@/components/ui/Toast.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

onMounted(() => {
  // Initialize auth state on app mount
  authStore.initializeAuth();
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>