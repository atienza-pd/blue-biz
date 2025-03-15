import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface OrderItem {
  id: string
  productId: string
  quantity: number
  unitPrice: number
  subtotal: number
}

export const useOrderItemStore = defineStore('purchaseOrderItems', () => {
  const orderItems = ref([] as OrderItem[])

  const add = (po: OrderItem) => {
    orderItems.value = [
      ...orderItems.value,
      { ...po, id: Math.random().toString(36).substring(2, 11) },
    ]
  }

  return {
    orderItems,
    add,
  }
})
