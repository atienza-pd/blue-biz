<script setup lang="ts">
import PaperView from '@/components/PaperView.vue'
import { useEventBus } from '@/eventBus'
import { useSuppliersStore } from '@/stores/suppliers'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import OrderItemsView from '../order-items/OrderItemsView.vue'
import type { OrderModel } from './purchase-order'
import { useOrdersStore } from './purchase-order.store'
import { useOrderFormValidation } from './useOrderFormValidation'

const ordersStore = useOrdersStore()
const suppliersStore = useSuppliersStore()
const router = useRouter()
const route = useRoute()
const { emit } = useEventBus()
let id = route.params.id as string
const orderDetail = ref({} as OrderModel)
const { errors, isFormValid, isFormDirty } = useOrderFormValidation(orderDetail)

const selectOrderDetail = computed(() => {
  return ordersStore.selectPurchaseOrder(id) as OrderModel
})

watch(selectOrderDetail, (value) => {
  orderDetail.value = { ...value }
}, { immediate: true })

watch(() => route.params.id, (newId) => {
  id = newId as string
  if (newId === 'new') {
    orderDetail.value = {} as OrderModel
  } else {
    orderDetail.value = { ...ordersStore.selectPurchaseOrder(id) ?? {} as OrderModel }
  }
})

const onSubmit = async () => {
  if (id === 'new') {
    ordersStore.addPurchaseOrder(orderDetail.value)
    const newId = ordersStore.orderlist[ordersStore.orderlist.length - 1].id
    router.replace({ params: { id: newId } })
    emit('alert', { type: 'success', message: 'Purchase order has been saved!' })
  } else {
    ordersStore.editPurchaseOrder(orderDetail.value)
    emit<{ type: string, message: string }>('alert', { type: 'success', message: 'Purchase order has been updated!' })
  }
}

const reset = () => {
  if (id === 'new') {
    orderDetail.value = {} as OrderModel
  } else {
    orderDetail.value = { ...ordersStore.selectPurchaseOrder(id) ?? {} as OrderModel }
  }
}


</script>

<template>
  <div class="space-y-1">
    <PaperView title="Purchase Order Detail" :collapsed="true" collapsed-state="expanded">
      <form @submit.prevent="onSubmit" class="space-y-6">
        <div>
          <label for="poNumber" class="block text-sm font-medium text-gray-700">PO Number</label>
          <div class="mt-1">
            <input v-model="orderDetail!.poNumber" type="text" id="poNumber"
              class="block p-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm" />
            <span v-if="errors.poNumber" class="text-red-500 text-sm">{{ errors.poNumber }}</span>
          </div>
        </div>
        <div>
          <label for="orderDate" class="block text-sm font-medium text-gray-700">Order Date</label>
          <div class="mt-1">
            <input v-model="orderDetail!.orderDate" type="date" id="orderDate"
              class="block p-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm" />
            <span v-if="errors.orderDate" class="text-red-500 text-sm">{{ errors.orderDate }}</span>
          </div>
        </div>
        <div>
          <label for="deliveryDate" class="block text-sm font-medium text-gray-700">Delivery Date</label>
          <div class="mt-1">
            <input v-model="orderDetail!.deliveryDate" type="date" id="deliveryDate"
              class="block p-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm" />
            <span v-if="errors.deliveryDate" class="text-red-500 text-sm">{{ errors.deliveryDate }}</span>
          </div>
        </div>
        <div>
          <label for="supplier" class="block text-sm font-medium text-gray-700">Supplier</label>
          <div class="mt-1">
            <select v-model="orderDetail!.supplierId" id="supplier"
              class="  block w-full p-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm focus:outline-none">
              <option :value="null" disabled selected>Select a supplier</option>
              <option v-for="(supplier, index) in suppliersStore.suppliers" :key="supplier.id ?? index"
                :value="supplier.id">{{ supplier.name }}</option>
            </select>
            <span v-if="errors.supplierId" class="text-red-500 text-sm">{{ errors.supplierId }}</span>
          </div>
        </div>

        <div>
          <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
          <div class="mt-1">
            <select id="status" v-model="orderDetail!.status"
              class="block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
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
    <PaperView title="Order Details" :collapsed="true" :fixed-collapsed="id === 'new'">
      <OrderItemsView />
    </PaperView>
  </div>
</template>
