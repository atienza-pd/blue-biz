import { fetchSuppliers } from '@/domains/catalogs/suppliers/fetch-suppliers'
import type { Supplier } from '@/domains/catalogs/suppliers/supplier'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

export const useSuppliersStore = defineStore('suppliers', () => {
  const suppliers = ref([] as Supplier[])

  const addSupplier = (product: Supplier) => {
    suppliers.value = [
      ...suppliers.value,
      { ...product, id: Math.random().toString(36).substring(2, 11) },
    ]
  }

  const editSupplier = (supplier: Supplier) => {
    const index = suppliers.value.findIndex((p) => p.id === supplier.id)
    if (index !== -1) {
      suppliers.value.splice(index, 1, supplier)
    }
  }

  const deleteSupplier = (id: string) => {
    suppliers.value = suppliers.value.filter((p) => p.id !== id)
  }

  const select = (id: string): Supplier | null => {
    return suppliers.value.find((p) => p.id === id) ?? null
  }

  onMounted(async () => {
    suppliers.value = await fetchSuppliers()
  })

  return {
    suppliers,
    addSupplier,
    editSupplier,
    deleteSupplier,
    select,
  }
})
