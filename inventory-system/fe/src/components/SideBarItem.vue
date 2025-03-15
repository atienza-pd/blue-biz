<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  to: string
  title: string
  isActive: boolean
  isDefault?: boolean
}>()
</script>

<template>
  <li>
    <RouterLink
      :to="to"
      class="relative py-2 px-4 rounded hover:bg-blue-500 flex items-center hover:text-white router-link"
      :class="{ 'default-link': isDefault, 'active-link': isActive }"
    >
      <slot name="icon"></slot>
      {{ title }}
    </RouterLink>
  </li>
</template>

<style scoped lang="css">
.router-link {
  @apply relative;
}

.active-link::before {
  content: '';
  @apply absolute left-0 top-0 w-1 h-full bg-blue-500 rounded-l;
}

.active-link {
  @apply bg-blue-100 text-black;
}

.default-link {
  @apply bg-gray-200 text-black hover:bg-blue-500 hover:text-white;
}
</style>
