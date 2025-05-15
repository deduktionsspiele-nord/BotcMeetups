```vue
<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-md mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-display font-bold text-primary-400 mb-2">{{ $t('auth.welcome') }}</h1>
        <p class="text-light-600">
          {{ $t('auth.loginPrompt') }}
        </p>
      </div>
      
      <div class="bg-dark-800 rounded-lg border border-dark-700 p-6 md:p-8">
        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-light-700 mb-1">
                {{ $t('auth.email') }}
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="input"
                :placeholder="'your@email.com'"
              />
            </div>
            
            <div>
              <div class="flex items-center justify-between mb-1">
                <label for="password" class="block text-sm font-medium text-light-700">
                  {{ $t('auth.password') }}
                </label>
                <a href="#" class="text-sm text-primary-400 hover:text-primary-300">
                  {{ $t('auth.forgotPassword') }}
                </a>
              </div>
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="input"
                placeholder="••••••••"
              />
            </div>
            
            <div class="flex items-center">
              <input
                id="remember"
                v-model="form.remember"
                type="checkbox"
                class="text-primary-600 focus:ring-primary-500 h-4 w-4 border-dark-500"
              />
              <label for="remember" class="ml-2 block text-sm text-light-700">
                {{ $t('auth.rememberMe') }}
              </label>
            </div>
            
            <div>
              <Button type="submit" :loading="isLoading" fullWidth>{{ $t('auth.signIn') }}</Button>
            </div>
          </div>
        </form>
        
        <div class="mt-6 text-center">
          <p class="text-sm text-light-500">
            {{ $t('auth.noAccount') }}
            <router-link to="/register" class="text-primary-400 hover:text-primary-300 font-medium">
              {{ $t('auth.signUp') }}
            </router-link>
          </p>
        </div>
      </div>
      
      <div class="bg-dark-800 rounded-lg border border-dark-700 p-4 mt-6 text-center">
        <p class="text-sm text-light-600 mb-2">
          <strong>{{ $t('auth.demoAccount') }}:</strong> {{ $t('auth.demoAccountDesc') }}
        </p>
        <div class="flex items-center justify-center text-xs bg-dark-700 py-1 px-3 rounded text-light-500 font-mono inline-block">
          email: demo@example.com | password: password
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Button from '@/components/ui/Button.vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const isLoading = computed(() => authStore.isLoading);

const form = ref({
  email: 'demo@example.com',
  password: 'password',
  remember: false
});

async function handleSubmit() {
  const success = await authStore.login(form.value.email, form.value.password);
  
  if (success) {
    // If there's a redirect query param, go there. Otherwise go to homepage
    const redirectPath = route.query.redirect as string || '/';
    router.push(redirectPath);
  }
}
</script>
```