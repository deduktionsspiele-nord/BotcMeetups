<template>
  <span 
    :class="[
      'badge',
      `badge-${variant}`,
      className
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) => 
      ['primary', 'secondary', 'success', 'warning', 'error'].includes(value)
  },
  className: {
    type: String,
    default: ''
  }
});
</script>