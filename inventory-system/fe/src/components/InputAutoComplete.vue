<script setup lang="ts">

import { computed, nextTick, ref, watch } from 'vue';

interface Props {
  modelValue: string
  values: Array<{ id: string; name: string }>
}

const props = withDefaults(defineProps<Props>(), {
  values: () => [],
  modelValue: '',
})

const emit = defineEmits(['update:modelValue'])

const searchQuery = ref(props.modelValue)
const showDropdown = ref(false)
const activeIndex = ref(-1)
const dropdownRef = ref<HTMLUListElement | null>(null)

watch(() => props.modelValue, (newValue) => {
  if (!props.modelValue) {
    searchQuery.value = ''
  }
})

const filteredItems = computed(() => {
  return props.values.filter((item) =>
    item.name?.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const selectItem = (item: { id: string; name: string }) => {
  searchQuery.value = item.name
  emit('update:modelValue', item.id)
  showDropdown.value = false
  activeIndex.value = -1
}

const onBlurAutoComplete = () => {
  setTimeout(() => {
    showDropdown.value = false
  }, 200)
}

const handleKeydown = (e: KeyboardEvent) => {
  showDropdown.value = true
  if (!showDropdown.value || filteredItems.value.length === 0) return

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      activeIndex.value = (activeIndex.value + 1) % filteredItems.value.length
      scrollActiveItemIntoView()
      break
    case 'ArrowUp':
      e.preventDefault()
      activeIndex.value =
        activeIndex.value <= 0 ? filteredItems.value.length - 1 : activeIndex.value - 1
      scrollActiveItemIntoView()
      break
    case 'Enter':
      e.preventDefault()
      if (activeIndex.value > -1) {
        selectItem(filteredItems.value[activeIndex.value])
      }
      break
    case 'Escape':
      showDropdown.value = false
      activeIndex.value = -1
      break
  }
}

const scrollActiveItemIntoView = () => {
  nextTick(() => {
    const activeItem = dropdownRef.value?.children[activeIndex.value] as HTMLElement
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest' })
    }
  })
}

const onFocusInput = () => {
  showDropdown.value = true
  activeIndex.value = -1
}
</script>

<template>
  <input type="text" id="supplier" v-model="searchQuery" @focus="onFocusInput" @keydown="handleKeydown"
    @blur="onBlurAutoComplete"
    class="block w-full p-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm focus:outline-none"
    placeholder="Search supplier..." />
  <!-- Dropdown -->
  <div v-if="showDropdown && filteredItems.length > 0"
    class="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
    <ul ref="dropdownRef" class="max-h-60 overflow-auto py-1">
      <li v-for="(item, index) in filteredItems" :key="item.id" @mousedown="selectItem(item)"
        @mouseover="activeIndex = index" :class="[
          'px-4 py-2 cursor-pointer',
          activeIndex === index ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100',
        ]">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
