<template>
  <a 
    :href="href" 
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    class="flex items-center space-x-2"
  >
    <div class="w-10 h-10 bg-contain bg-center bg-no-repeat" style="background-image: url('/src/assets/images/DSN_Logo_screen_new.png')"></div>
    <span class="font-display text-xl font-bold text-floral-500 hidden md:block">
      {{ $t('organisation.longName') }}
    </span>
  </a>
</template>

<script setup lang="ts">
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