<script setup lang="ts">
import { ref } from 'vue'
import { IconHome, IconProduct, IconContact, IconAbout } from './icons'
import IconExample from './icons/IconExample.vue'
import SideBarItem from './SideBarItem.vue'

const isSidebarVisible = ref(true)

function toggleSidebar() {
  isSidebarVisible.value = !isSidebarVisible.value
}
</script>

<template>
  <aside v-if="isSidebarVisible" class="bg-gray-100 text-black w-64 h-full py-8 px-6 relative">
    <button
      @click="toggleSidebar"
      class="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full"
      style="top: 50%"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <ul class="space-y-4">
      <SideBarItem to="/" title="Home" :isActive="$route.path === '/'" :is-default="true">
        <template #icon>
          <IconHome custom-class="text-red-500" />
        </template>
      </SideBarItem>
      <SideBarItem to="/catalog" title="Catalog" :isActive="$route.path.includes('/catalog')">
        <template #icon>
          <IconProduct />
        </template>
      </SideBarItem>
      <SideBarItem
        to="/orders"
        title="Orders"
        :isActive="$route.path.includes('/orders')"
      >
        <template #icon>
          <IconProduct />
        </template>
      </SideBarItem>
      <SideBarItem to="/sales" title="Sales" :isActive="$route.path.includes('/sales')">
        <template #icon>
          <IconProduct />
        </template>
      </SideBarItem>
      <SideBarItem to="/contact" title="Contact" :isActive="$route.path === '/contact'">
        <template #icon>
          <IconContact />
        </template>
      </SideBarItem>
      <SideBarItem to="/about" title="About" :isActive="$route.path === '/about'">
        <template #icon>
          <IconAbout />
        </template>
      </SideBarItem>
      <SideBarItem to="/examples" title="Examples" :isActive="$route.path === '/examples'">
        <template #icon>
          <IconExample />
        </template>
      </SideBarItem>
    </ul>
  </aside>

  <button
    v-if="!isSidebarVisible"
    @click="toggleSidebar"
    class="fixed left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full"
    style="top: 53.8%"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  </button>
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
</style>
