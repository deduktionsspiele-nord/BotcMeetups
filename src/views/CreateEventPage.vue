<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl md:text-4xl font-display font-bold text-primary-400 mb-2">Create Event</h1>
      <p class="text-light-600">
        Organize a Blood on the Clocktower game and invite players to join
      </p>
    </div>
    
    <div class="bg-dark-800 rounded-lg border border-dark-700 p-6 md:p-8 max-w-3xl mx-auto">
      <form @submit.prevent="createEvent">
        <div class="space-y-6">
          <!-- Event Title -->
          <div>
            <label for="title" class="block text-sm font-medium text-light-700 mb-1">
              Event Title *
            </label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              required
              class="input"
              placeholder="e.g., Beginner-Friendly BOTC Night"
            />
          </div>
          
          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-light-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              v-model="form.description"
              rows="4"
              required
              class="input"
              placeholder="Describe your event, what to expect, etc."
            ></textarea>
          </div>
          
          <!-- Date & Time -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="date" class="block text-sm font-medium text-light-700 mb-1">
                Date *
              </label>
              <input
                id="date"
                v-model="form.date"
                type="date"
                required
                class="input"
                :min="minDate"
              />
            </div>
            <div>
              <label for="time" class="block text-sm font-medium text-light-700 mb-1">
                Time *
              </label>
              <input
                id="time"
                v-model="form.time"
                type="time"
                required
                class="input"
              />
            </div>
          </div>
          
          <!-- Location -->
          <div>
            <label for="location" class="block text-sm font-medium text-light-700 mb-1">
              Location *
            </label>
            <input
              id="location"
              v-model="form.location"
              type="text"
              required
              class="input"
              placeholder="e.g., Game Haven Board Game Café"
            />
          </div>
          
          <!-- Address -->
          <div>
            <label for="address" class="block text-sm font-medium text-light-700 mb-1">
              Address
            </label>
            <input
              id="address"
              v-model="form.address"
              type="text"
              class="input"
              placeholder="Street address for the venue"
            />
            <p class="mt-1 text-sm text-light-500">
              Optional. Will only be shown to confirmed participants.
            </p>
          </div>
          
          <!-- Max Players -->
          <div>
            <label for="maxPlayers" class="block text-sm font-medium text-light-700 mb-1">
              Maximum Players *
            </label>
            <input
              id="maxPlayers"
              v-model.number="form.maxPlayers"
              type="number"
              required
              min="5"
              max="20"
              class="input"
            />
            <p class="mt-1 text-sm text-light-500">
              Recommended: 7-15 players for optimal gameplay.
            </p>
          </div>
          
          <!-- Image URL -->
          <div>
            <label for="image" class="block text-sm font-medium text-light-700 mb-1">
              Image URL
            </label>
            <input
              id="image"
              v-model="form.image"
              type="url"
              class="input"
              placeholder="https://example.com/image.jpg"
            />
            <p class="mt-1 text-sm text-light-500">
              Optional. Add an image URL to customize your event.
            </p>
          </div>
          
          <!-- Visibility -->
          <div>
            <span class="block text-sm font-medium text-light-700 mb-1">
              Event Visibility *
            </span>
            <div class="space-y-2">
              <div class="flex items-center">
                <input
                  id="public"
                  v-model="form.isPublic"
                  :value="true"
                  type="radio"
                  name="visibility"
                  class="text-primary-600 focus:ring-primary-500 h-4 w-4 border-dark-500"
                />
                <label for="public" class="ml-2 block text-sm text-light-900">
                  Public - Anyone can view and join this event
                </label>
              </div>
              <div class="flex items-center">
                <input
                  id="private"
                  v-model="form.isPublic"
                  :value="false"
                  type="radio"
                  name="visibility"
                  class="text-primary-600 focus:ring-primary-500 h-4 w-4 border-dark-500"
                />
                <label for="private" class="ml-2 block text-sm text-light-900">
                  Private - Only people with the link can view and join
                </label>
              </div>
            </div>
          </div>
          
          <div class="flex justify-between pt-4 border-t border-dark-600">
            <Button type="button" variant="outline" @click="router.push('/events')">
              Cancel
            </Button>
            <Button type="submit" :loading="isLoading">
              Create Event
            </Button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useEventsStore } from '@/stores/events';
import Button from '@/components/ui/Button.vue';
import { format } from 'date-fns';

const router = useRouter();
const eventsStore = useEventsStore();
const isLoading = computed(() => eventsStore.isLoading);

// Form data
const form = ref({
  title: '',
  description: '',
  date: format(new Date(), 'yyyy-MM-dd'),
  time: '19:00',
  location: '',
  address: '',
  maxPlayers: 12,
  image: '',
  isPublic: true
});

// Set min date to today
const minDate = computed(() => {
  return format(new Date(), 'yyyy-MM-dd');
});

async function createEvent() {
  // Combine date and time into a single ISO string
  const dateTime = new Date(`${form.value.date}T${form.value.time}`);
  
  const eventData = {
    title: form.value.title,
    description: form.value.description,
    date: dateTime.toISOString(),
    location: form.value.location,
    address: form.value.address || undefined,
    maxPlayers: form.value.maxPlayers,
    image: form.value.image || null,
    isPublic: form.value.isPublic
  };
  
  const newEvent = await eventsStore.createEvent(eventData);
  if (newEvent) {
    router.push(`/events/${newEvent.id}`);
  }
}
</script>