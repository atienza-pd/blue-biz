<script setup lang="ts">
import type { Product } from '@/domains/catalogs/products/product'
import { useRouter } from 'vue-router'

defineProps<{ products: Product[] }>()
const router = useRouter()
const navigateToProductDetail = (id: number | string = 'new') => {
  router.push({ path: `/products/${id}` })
}
</script>

<template>
  <div>
    <button @click="navigateToProductDetail()">Add New</button>
    <ul>
      <li v-for="(product, index) in products" :key="index">
        <span>{{ product.name }}</span>
        <button @click="navigateToProductDetail(product.id as string | number)">View</button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
ul {
  list-style: none;

  li {
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
    &:hover {
      background-color: rgb(125, 125, 125);
      color: black;
      border-radius: 3px;
    }

    button {
      font-size: 12px;
      border: solid rgb(214, 214, 214) 1px;
      border-radius: 3px;
      &:hover {
        background-color: rgb(176, 176, 52);
      }
    }
  }
}
</style>
