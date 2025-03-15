<script setup lang="ts">
import { useModal } from '@/composables/useModal'
import ModalView from './PopupModal.vue'

const { isOpen, open, close } = useModal()
</script>

<template>
  <button @click="open" class="rounded-md bg-blue-500 px-4 py-2 text-white">Open Modal</button>

  <ModalView v-model="isOpen" title="Example Modal">
    <p>Modal content goes here</p>

    <template #footer>
      <div class="flex justify-end gap-2">
        <button @click="close" class="rounded-md px-4 py-2 hover:bg-gray-100">Close</button>
      </div>
    </template>
  </ModalView>
</template>
