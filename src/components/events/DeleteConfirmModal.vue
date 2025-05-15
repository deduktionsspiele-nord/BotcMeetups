<template>
  <div class="fixed inset-0 bg-dark-950/80 flex items-center justify-center p-4 z-50">
    <div 
      class="bg-dark-800 rounded-lg max-w-md w-full border border-dark-700 shadow-xl animate-slide-up"
      @click.stop
    >
      <div class="p-6">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-xl font-bold text-light-900">{{ $t('events.details.deleteEvent') }}</h3>
          <button 
            @click="$emit('close')"
            class="text-light-500 hover:text-light-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="mb-6">
          <div class="p-3 bg-error-500/10 border border-error-500/20 rounded-md mb-4 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-error-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <div class="text-sm text-light-900">
              <strong>{{ $t('common.warning') }}:</strong> {{ $t('events.details.deleteWarning', { title: eventTitle }) }}
            </div>
          </div>
          
          <p class="text-light-600">
            {{ $t('events.details.typeDeleteConfirm') }}
          </p>
          
          <input
            type="text"
            v-model="confirmText"
            :placeholder="$t('events.details.typeDeleteConfirm')"
            class="input mt-3"
          />
        </div>
        
        <div class="flex justify-end space-x-3">
          <Button variant="outline" @click="$emit('close')">{{ $t('common.cancel') }}</Button>
          <Button 
            :disabled="confirmText !== 'delete'"
            :class="confirmText === 'delete' ? 'bg-error-600 hover:bg-error-700' : ''"
            @click="$emit('confirm')"
          >
            {{ $t('events.details.deleteEvent') }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/ui/Button.vue';

defineProps<{
  eventTitle: string
}>();

defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>();

const confirmText = ref('');
</script>