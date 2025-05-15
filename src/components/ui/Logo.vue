<template>
  <a 
    :href="href" 
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    class="flex items-center space-x-2"
  >
    <div class="w-10 h-10 bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: `url(${logoUrl})` }"></div>
    <span class="font-display text-xl font-bold text-floral-500 ">
      {{ $t('organisation.longName') }}
    </span>
    <span class="font-display text-xl font-bold text-floral-500 hidden">
      {{ $t('organisation.veryShortName') }}
    </span>
  </a>
</template>

<script setup lang="ts">
import logoUrl from '@/assets/images/DSN_Logo_screen_new.png'

defineProps({
  href: {
    type: String,
    default: '/'
  },
  external: {
    type: Boolean,
    default: false
  }
});
</script>