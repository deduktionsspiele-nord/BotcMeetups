<template>
  <div class="relative">
    <button 
      @click="isOpen = !isOpen"
      class="flex items-center space-x-2 text-light-700 hover:text-light-900 transition-colors"
      aria-haspopup="true"
      :aria-expanded="isOpen"
    >
      <span class="text-sm">{{ currentLanguage }}</span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-4 w-4" 
        :class="{ 'rotate-180': isOpen }" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>

    <div 
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-dark-800 border border-dark-700 overflow-hidden z-20"
    >
      <div class="py-1">
        <button
          v-for="lang in availableLanguages"
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          class="block w-full text-left px-4 py-2 text-sm text-light-700 hover:bg-dark-700"
          :class="{ 'bg-dark-700': lang.code === currentLocale }"
        >
          <span class="mr-2 p-2 bg-color-white">{{ lang.flag }}</span>
          {{ lang.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
const isOpen = ref(false);

const availableLanguages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

const currentLocale = computed(() => i18n.locale.value);

const currentLanguage = computed(() => {
  const lang = availableLanguages.find(l => l.code === currentLocale.value);
  return lang ? `${lang.flag} ${lang.name}` : 'English';
});

function changeLanguage(locale: string) {
  i18n.locale.value = locale;
  localStorage.setItem('locale', locale);
  isOpen.value = false;
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (isOpen.value && !target.closest('[aria-haspopup="true"]')) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>