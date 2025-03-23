<script lang="ts" setup>
import InputAutoComplete from '@/components/InputAutoComplete.vue'
import PaperView from '@/components/PaperView.vue'
import { useProductsStore } from '@/stores/products'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const product = ref({ id: '', productId: '', quantity: 0 })
const id = route.params.id as string
const productsStore = useProductsStore()
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
  <PaperView title="Order Item Detail">
    <form class="space-y-6">
      <div>
        <label for="supplier" class="block text-sm font-medium text-gray-700">Product</label>
        <div class="relative mt-1">
          <InputAutoComplete v-model="product.productId" :values="[...products]" />
        </div>
      </div>
      <div>
        <label for="unitPrice" class="block text-sm font-medium text-gray-700">Unit Price</label>
        <input id="unitPrice" disabled v-model="selectedProduct.unitPrice" type="number" autocomplete="off"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" />
      </div>
      <div>
        <label for="quantity" class="block text-sm font-medium text-gray-700">Quantity</label>
        <input id="quantity" v-model="product.quantity" type="number" autocomplete="off"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" />
      </div>
      <div>
        <label for="totalPrice" class="block text-sm font-medium text-gray-700">Total Price</label>
        <input id="totalPrice" disabled v-model="totalPrice" type="number" autocomplete="off"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" />
      </div>
    </form>
  </PaperView>
</template>
