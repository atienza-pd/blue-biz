<script setup lang="ts">
import PaperView from '@/components/PaperView.vue'
</script>

<template>
  <PaperView title="Contact">
    <p class="mb-4">If you found out any issues or have any suggestions, please let us know.</p>
    <form class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          id="message"
          rows="4"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
        ></textarea>
      </div>
      <div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Send
        </button>
      </div>
    </form>
  </PaperView>
</template>

<style scoped></style>
