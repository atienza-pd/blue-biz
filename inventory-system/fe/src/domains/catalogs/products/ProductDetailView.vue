<script setup lang="ts">
import PaperView from '@/components/PaperView.vue'
import { useProductsStore } from '@/stores/products'
import {
  computed,
  reactive,
  ref,
  type Reactive,
  type Ref,
  onMounted,
  watch,
  watchEffect,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Product } from './product'

const productStore = useProductsStore()
const route = useRoute()
const router = useRouter()
const errors = ref({
  name: '',
  price: '',
  quantity: '',
})

const id = route.params.id as string

const product = computed(() => {
  return id === 'new'
    ? reactive({ id: null, name: '', description: '', unitPrice: 0, quantity: 0 })
    : productStore.selectProduct(id)
})

const title = id === 'new' ? 'Add new' : `Edit `

const originalProduct = ref({ ...product.value })

const isFormValid = computed(() => {
  return product.value?.name && product.value?.unitPrice && product.value?.quantity
})

const isFormDirty = computed(() => {
  return JSON.stringify(product.value) !== JSON.stringify(originalProduct.value)
})

const validateForm = () => {
  errors.value.name = product.value?.name ? '' : 'Product Name is required'
  errors.value.price = product.value?.unitPrice ? '' : 'Product Price is required'
  errors.value.quantity = product.value?.quantity ? '' : 'Product Quantity is required'
}

const validateField = (field: keyof typeof errors.value) => {
  switch (field) {
    case 'name':
      errors.value.name = product.value?.name ? '' : 'Product Name is required'
      break
    case 'price':
      errors.value.price = product.value?.unitPrice ? '' : 'Product Price is required'
      break
    case 'quantity':
      errors.value.quantity = product.value?.quantity ? '' : 'Product Quantity is required'
      break
  }
}

watchEffect(() => validateField('name'))
watchEffect(() => validateField('price'))
watchEffect(() => validateField('quantity'))

const submit = () => {
  validateForm()
  if (!isFormValid.value) return

  if (product.value?.id) {
    productStore.editProduct(product.value as Product)
  } else {
    productStore.addProduct(product.value as Product)
  }

  alert(`Product ${product.value?.name} has been saved!`)

  router.push({ name: 'products' })
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <PaperView v-if="product" :title="`${title} ${product.name}`">
    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          id="name"
          v-model="product.name"
          type="text"
          autocomplete="off"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
        />
        <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700"
          >Product Description</label
        >
        <input
          id="description"
          v-model="product.description"
          type="text"
          autocomplete="off"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <label for="price" class="block text-sm font-medium text-gray-700">Product Price</label>
        <input
          id="price"
          v-model="product.unitPrice"
          type="number"
          autocomplete="off"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
        />
        <span v-if="errors.price" class="text-red-500 text-sm">{{ errors.price }}</span>
      </div>
      <div>
        <label for="quantity" class="block text-sm font-medium text-gray-700"
          >Product Quantity</label
        >
        <input
          id="quantity"
          v-model="product.quantity"
          type="number"
          autocomplete="off"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
        />
        <span v-if="errors.quantity" class="text-red-500 text-sm">{{ errors.quantity }}</span>
      </div>
      <div class="flex space-x-4">
        <button
          type="submit"
          :disabled="!isFormValid || !isFormDirty"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          Save
        </button>
        <button
          type="button"
          @click="goBack"
          class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Back
        </button>
      </div>
    </form>
  </PaperView>
  <div v-else>Loading...</div>
</template>

<style scoped>
/* No additional styles needed */
</style>
