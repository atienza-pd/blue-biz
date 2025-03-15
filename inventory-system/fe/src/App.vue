<script setup lang="ts">
import { RouterView } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useProductsStore } from './stores/products'
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'
</script>

<template>
  <div id="app" class="flex flex-col h-screen bg-gray-50 overflow-hidden">
    <NavBar />
    <div class="flex flex-1 overflow-hidden">
      <SideBar />
      <div class="flex-1 p-4 overflow-auto">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
}
</style>
