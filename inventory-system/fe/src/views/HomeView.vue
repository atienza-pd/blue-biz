<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useProductsStore } from '../stores/products'
import PaperView from '@/components/PaperView.vue'

const productStore = useProductsStore()
const totalProducts = computed(() => productStore.products.length)
const latestProducts = computed(() => productStore.products.slice(-5))
</script>

<template>
  <PaperView title="Dashboard">
    <div>
      <div class="mb-4">
        <h2 class="text-xl font-semibold">Total Products: {{ totalProducts }}</h2>
      </div>
      <h2 class="text-xl font-semibold mb-2">Latest Products</h2>
      <ul class="space-y-2">
        <li
          v-for="product in latestProducts"
          :key="product.id ?? product.name"
          class="border p-2 rounded-md shadow-md"
        >
          <h3 class="text-lg font-medium">{{ product.name }}</h3>
          <p class="text-gray-700">{{ product.description }}</p>
          <p class="text-gray-500">Quantity: {{ product.quantity }}</p>
        </li>
      </ul>
    </div>
  </PaperView>
</template>

<style scoped></style>
