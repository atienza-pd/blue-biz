<script setup lang="ts">
import InputAutoComplete from '@/components/InputAutoComplete.vue'
import { useProductsStore } from '@/stores/products'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: { id: string; productId: string; quantity: number }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: { id: string; productId: string; quantity: number }): void
}>()

const productsStore = useProductsStore()
const product = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const products = computed(() =>
  productsStore.products.map((product) => ({
    id: product.id ?? '',
    name: product.name,
    unitPrice: product.unitPrice,
  })),
)

const selectedProduct = computed(() => {
  const selectedProduct = productsStore.selectProduct(product.value.productId)

  return (
    selectedProduct ?? {
      id: '',
      name: '',
      unitPrice: 0,
    }
  )
})

const totalPrice = computed(() => product.value.quantity * selectedProduct.value.unitPrice)
</script>

<template>
  <form class="space-y-6">
    <div>
      <label for="supplier" class="block text-sm font-medium text-gray-700">Product</label>
      <div class="relative mt-1">
        <InputAutoComplete v-model="product.productId" :values="[...products]" />
      </div>
    </div>
    <div>
      <label for="unitPrice" class="block text-sm font-medium text-gray-700">Unit Price</label>
      <input
        id="unitPrice"
        disabled
        v-model="selectedProduct.unitPrice"
        type="number"
        autocomplete="off"
        class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
      />
    </div>
    <div>
      <label for="quantity" class="block text-sm font-medium text-gray-700">Quantity</label>
      <input
        id="quantity"
        v-model="product.quantity"
        type="number"
        autocomplete="off"
        class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
      />
    </div>
    <div>
      <label for="totalPrice" class="block text-sm font-medium text-gray-700">Total Price</label>
      <input
        id="totalPrice"
        disabled
        v-model="totalPrice"
        type="number"
        autocomplete="off"
        class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
      />
    </div>
  </form>
</template>
