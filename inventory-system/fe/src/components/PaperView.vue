<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  title: string
  collapsed?: boolean
  collapsedState?: 'collapsed' | 'expanded'
}>()

const defaultCollapsedState = props.collapsedState && props.collapsedState === 'collapsed'
const isCollapsed = ref(defaultCollapsedState)
</script>

<template>
  <div
    class="bg-white text-black flex flex-col shadow-md"
    :class="{ 'collapsed-paper': collapsed, 'not-collapsed-paper': !collapsed }"
  >
    <div class="bg-blue-600 text-white py-4 px-8 rounded-t-md flex justify-between">
      <h1 class="text-2xl font-bold">{{ title }}</h1>
      <button
        v-show="collapsed"
        type="button"
        @click="isCollapsed = !isCollapsed"
        class="p-2 text-gray-200 hover:text-gray-700 rounded-full hover:bg-gray-100"
      >
        <svg
          class="w-5 h-5 transform transition-transform duration-200"
          :class="{ 'rotate-180': isCollapsed }"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <div
      class="overflow-auto flex-1"
      :class="{ 'collapsed-content': isCollapsed, 'not-collapsed-content': !isCollapsed }"
    >
      <div v-show="!isCollapsed" class="transition-all duration-200">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.not-collapsed-paper {
  @apply h-full;
}

.not-collapsed-content {
  @apply p-8;
}
</style>
