<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-md mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-display font-bold text-primary-400 mb-2">Create an Account</h1>
        <p class="text-light-600">
          Join the Blood on the Clocktower community to find and organize games
        </p>
      </div>
      
      <div class="bg-dark-800 rounded-lg border border-dark-700 p-6 md:p-8">
        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div>
              <label for="displayName" class="block text-sm font-medium text-light-700 mb-1">
                Display Name
              </label>
              <input
                id="displayName"
                v-model="form.displayName"
                type="text"
                required
                class="input"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-light-700 mb-1">
                Email
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="input"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label for="password" class="block text-sm font-medium text-light-700 mb-1">
                Password
              </label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="input"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <label for="passwordConfirm" class="block text-sm font-medium text-light-700 mb-1">
                Confirm Password
              </label>
              <input
                id="passwordConfirm"
                v-model="form.passwordConfirm"
                type="password"
                required
                class="input"
                placeholder="••••••••"
              />
              <p v-if="passwordMismatch" class="mt-1 text-sm text-error-500">
                Passwords don't match
              </p>
            </div>
            
            <div class="flex items-center">
              <input
                id="terms"
                v-model="form.acceptTerms"
                type="checkbox"
                required
                class="text-primary-600 focus:ring-primary-500 h-4 w-4 border-dark-500"
              />
              <label for="terms" class="ml-2 block text-sm text-light-700">
                I agree to the 
                <a href="#" class="text-primary-400 hover:text-primary-300">Terms of Service</a> 
                and 
                <a href="#" class="text-primary-400 hover:text-primary-300">Privacy Policy</a>
              </label>
            </div>
            
            <div>
              <Button 
                type="submit" 
                :loading="isLoading" 
                :disabled="!form.acceptTerms || passwordMismatch" 
                fullWidth
              >
                Create Account
              </Button>
            </div>
          </div>
        </form>
        
        <div class="mt-6 text-center">
          <p class="text-sm text-light-500">
            Already have an account?
            <router-link to="/login" class="text-primary-400 hover:text-primary-300 font-medium">
              Sign in
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useToastStore } from '@/stores/toast';
import Button from '@/components/ui/Button.vue';

const router = useRouter();
const authStore = useAuthStore();
const toastStore = useToastStore();
const isLoading = computed(() => authStore.isLoading);

const form = ref({
  displayName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  acceptTerms: false
});

const passwordMismatch = computed(() => {
  return form.value.password !== form.value.passwordConfirm && form.value.passwordConfirm.length > 0;
});

async function handleSubmit() {
  if (passwordMismatch.value) {
    toastStore.show('Passwords do not match', 'error');
    return;
  }
  
  const success = await authStore.register(
    form.value.email, 
    form.value.password, 
    form.value.displayName
  );
  
  if (success) {
    router.push('/events');
  }
}
</script>