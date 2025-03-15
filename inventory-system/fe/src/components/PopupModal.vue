<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import IconInformation from './icons/IconInformation.vue'

interface Props {
  modelValue: boolean
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Notification',
})

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50" @click="close"></div>

        <!-- Modal -->
        <div class="relative z-50 w-full max-w-md rounded-lg bg-white shadow-xl">
          <!-- Header -->
          <div class="flex items-center justify-between border-b p-4">
            <div class="flex space-x-1">
              <div v-if="$slots.headerIcon" class="p-1">
                <slot name="headerIcon"> </slot>
              </div>
              <div v-else class="p-1">
                <IconInformation />
              </div>
              <h2 class="text-xl font-semibold">{{ title }}</h2>
            </div>
            <button @click="close" class="rounded-lg p-1 hover:bg-gray-100">
              <svg
                class="h-5 w-5"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="p-4">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="border-t p-4">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
