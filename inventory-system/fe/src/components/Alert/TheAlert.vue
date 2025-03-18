<script setup lang="ts">
defineProps<{
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  show: boolean;
}>();

defineEmits<{
  (e: 'close'): void;
}>();
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform opacity-0"
    enter-to-class="transform opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div
      v-if="show"
      :class="['fixed top-5 right-5 z-50 p-4 rounded-md shadow-lg', {
        'bg-red-100 text-red-900 border border-red-200': type === 'error',
        'bg-green-100 text-green-900 border border-green-200': type === 'success',
        'bg-yellow-100 text-yellow-900 border border-yellow-200': type === 'warning',
        'bg-blue-100 text-blue-900 border border-blue-200': type === 'info'
      }]"
    >
      <div class="flex items-center justify-between gap-3">
        <span class="text-sm">{{ message }}</span>
        <button
          @click="$emit('close')"
          class="text-xl leading-none hover:opacity-75 transition-opacity"
        >
          ×
        </button>
      </div>
    </div>
  </Transition>
</template>
