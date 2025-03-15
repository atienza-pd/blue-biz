<template>
  <PaperView title="Catalogs">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <RouterLink
        v-for="(product, index) in catalogs"
        :key="index"
        :to="`/catalog${product.route}`"
        class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <div class="p-4">
          <div class="overflow-hidden rounded-md">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-48 object-contain rounded-md mb-4 transform hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
          <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
          <p class="text-gray-600 mb-2">{{ product.description }}</p>
        </div>
      </RouterLink>
    </div>
  </PaperView>
</template>

<script setup lang="ts">
import PaperView from '@/components/PaperView.vue'
import { ref } from 'vue'

interface Catalog {
  name: string
  description: string
  image: string
  route: string
}

const catalogs = ref<Catalog[]>([
  {
    name: 'Products',
    description: 'List of all Products and Basic Details',
    route: '/products',
    image: '/src/assets/inventory_products.png',
  },
  {
    name: 'Suppliers',
    description: 'List of all Suppliers and Basic Details',
    route: '/suppliers',
    image: '/src/assets/inventory_products.png',
  },
  {
    name: 'Addresses',
    description: 'List of all Addresses',
    route: '/addresses',
    image: '',
  },
])
</script>

<style scoped></style>
