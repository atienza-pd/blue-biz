<script lang="ts" setup>
import InputAutoComplete from '@/components/InputAutoComplete.vue'
import PaperView from '@/components/PaperView.vue'
import { useProductsStore } from '@/stores/products'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type OrderItem, useOrderItemsStore } from './order-items.store'
import { useOrderItemFormValidation } from './use-order-item-form-validation'

const defaultFormValue = { id: '', orderId: '', productId: '', quantity: 0 }
const route = useRoute()
const router = useRouter()
const orderItem = ref<OrderItem>({ ...defaultFormValue })
const id = route.params.itemid as string
const orderId = route.params.id as string
const productsStore = useProductsStore()
const orderItemsStore = useOrderItemsStore()
const { errors, isFormValid, isFormDirty } = useOrderItemFormValidation(orderItem)
const products = computed(() =>
  productsStore.products.map((product) => ({
    id: product.id ?? '',
    name: product.name,
    unitPrice: product.unitPrice,
  })),
)

const selectOrderItemDetail = computed(() => {
  return orderItemsStore.select(id) as OrderItem
})

watch(selectOrderItemDetail, (value) => {
  if (value) {
    orderItem.value = { ...value }
    return;
  }

  orderItem.value = { ...defaultFormValue }
}, { immediate: true })

const selectedProduct = computed(() => {
  const selectedProduct = productsStore.selectProduct(orderItem.value.productId)

  return (
    selectedProduct ?? {
      id: '',
      name: '',
      unitPrice: 0,
    }
  )
})

const reset = () => {
  if (id === 'new') {
    orderItem.value = { ...defaultFormValue, orderId }
    return;
  }

  orderItem.value = { ...selectOrderItemDetail.value }
}

const totalPrice = computed(() => orderItem.value.quantity * selectedProduct.value.unitPrice)

const onSubmit = () => {
  if (id === 'new') {

    orderItemsStore.add({ ...orderItem.value, orderId })
    router.push({ name: 'order-detail', params: { id: orderId, } })
  } else {
    // orderItemsStore(orderItem.value)
  }
}
</script>

<template>
  <PaperView title="Order Item Detail" @back="router.back">
    <form @submit.prevent="onSubmit" class="space-y-6">
      <div>
        <label for="products" class="block text-sm font-medium text-gray-700">Product</label>
        <div class="relative mt-1">
          <InputAutoComplete v-model="orderItem.productId" :values="[...products]" />
        </div>
        <span v-if="errors.productId" class="text-red-500 text-sm">{{ errors.productId }}</span>
      </div>
      <div>
        <label for="unitPrice" class="block text-sm font-medium text-gray-700">Unit Price</label>
        <input id="unitPrice" disabled v-model="selectedProduct.unitPrice" type="number" autocomplete="off"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" />
      </div>
      <div>
        <label for="quantity" class="block text-sm font-medium text-gray-700">Quantity</label>
        <input id="quantity" v-model="orderItem.quantity" type="number" autocomplete="off"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" />
        <span v-if="errors.quantity" class="text-red-500 text-sm">{{ errors.quantity }}</span>
      </div>
      <div>
        <label for="totalPrice" class="block text-sm font-medium text-gray-700">Total Price</label>
        <input id="totalPrice" disabled v-model="totalPrice" type="number" autocomplete="off"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" />
      </div>
      <div class="flex justify-end space-x-3">
        <button type="button" @click="reset"
          class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Reset
        </button>
        <button type="submit" :disabled="!isFormValid || !isFormDirty"
          class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50">
          Save
        </button>
      </div>
    </form>
  </PaperView>
</template>
