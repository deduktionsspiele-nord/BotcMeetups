<template>
  <div class="fixed inset-0 bg-dark-950/80 flex items-center justify-center p-4 z-50">
    <div 
      class="bg-dark-800 rounded-lg max-w-lg w-full border border-dark-700 shadow-xl animate-slide-up"
      @click.stop
    >
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-xl font-bold text-light-900">Join Event</h3>
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
          <p class="text-light-600 mb-4">
            You're joining "{{ event.title }}" on {{ formattedDate }}. Please select your preferred role:
          </p>
          
          <div class="space-y-2">
            <div class="flex items-center">
              <input 
                type="radio" 
                id="player" 
                value="Player" 
                v-model="selectedRole"
                class="text-primary-600 focus:ring-primary-500 h-4 w-4 border-dark-500"
              />
              <label for="player" class="ml-2 text-light-900">
                Player
              </label>
            </div>
            
            <div class="flex items-center">
              <input 
                type="radio" 
                id="storyteller" 
                value="Storyteller" 
                v-model="selectedRole"
                class="text-primary-600 focus:ring-primary-500 h-4 w-4 border-dark-500"
              />
              <label for="storyteller" class="ml-2 text-light-900">
                Storyteller
              </label>
            </div>
            
            <div class="flex items-center">
              <input 
                type="radio" 
                id="spectator" 
                value="Spectator" 
                v-model="selectedRole"
                class="text-primary-600 focus:ring-primary-500 h-4 w-4 border-dark-500"
              />
              <label for="spectator" class="ml-2 text-light-900">
                Spectator
              </label>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end space-x-3">
          <Button variant="outline" @click="$emit('close')">Cancel</Button>
          <Button @click="confirmJoin">Join Event</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { format } from 'date-fns';
import { Event } from '@/types/event';
import Button from '@/components/ui/Button.vue';

const props = defineProps<{
  event: Event
}>();

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm', role: string): void
}>();

const selectedRole = ref('Player');

const formattedDate = computed(() => {
  return format(new Date(props.event.date), 'EEEE, MMMM d, yyyy');
});

function confirmJoin() {
  emit('confirm', selectedRole.value);
}
</script>