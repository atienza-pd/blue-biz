import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import type { PurchaseOrderList } from './purchase-order'
import { fetchPurchaseOrders } from './fetch-purchase-orders'

export const usePurchaseOrderStore = defineStore('purchaseOrders', () => {
  const purchaseOrders = ref([] as PurchaseOrderList[])

  const addPurchaseOrder = (po: PurchaseOrderList) => {
    purchaseOrders.value = [
      ...purchaseOrders.value,
      { ...po, id: Math.random().toString(36).substring(2, 11) },
    ]
  }

  const editPurchaseOrder = (po: PurchaseOrderList) => {
    const index = purchaseOrders.value.findIndex((p) => p.id === po.id)
    if (index !== -1) {
      purchaseOrders.value.splice(index, 1, po)
    }
  }

  const deletePurchaseOrder = (id: string) => {
    purchaseOrders.value = purchaseOrders.value.filter((po) => po.id !== id)
  }

  const selectPurchaseOrder = (id: string): PurchaseOrderList | null => {
    return purchaseOrders.value.find((po) => po.id === id) ?? null
  }

  onMounted(async () => {
    purchaseOrders.value = await fetchPurchaseOrders()
  })

  return {
    purchaseOrders,
    addPurchaseOrder,
    editPurchaseOrder,
    deletePurchaseOrder,
    selectPurchaseOrder,
  }
})
