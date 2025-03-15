<script setup lang="ts">
import { ref } from 'vue'
import Modal from './PopupModal.vue'

const isModalOpen = ref(false)

const onConfirm = () => {
  console.log('Confirmed')
  isModalOpen.value = false
}
</script>

<template>
  <div>
    <button
      @click="isModalOpen = true"
      class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    >
      Open Modal
    </button>

    <Modal v-model="isModalOpen" title="Example Modal">
      <p>This is the modal content.</p>

      <template #footer>
        <div class="flex justify-end gap-2">
          <button @click="isModalOpen = false" class="rounded-md px-4 py-2 hover:bg-gray-100">
            Cancel
          </button>
          <button
            @click="onConfirm"
            class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>
