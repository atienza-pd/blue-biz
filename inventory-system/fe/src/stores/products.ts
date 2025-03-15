import { fetchProducts } from '@/domains/catalogs/products/fetch-products'
import type { Product } from '@/domains/catalogs/products/product'
import { defineStore } from 'pinia'
import { onMounted, readonly, ref, type Ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref([] as Product[])

  const addProduct = (product: Product) => {
    products.value = [
      ...products.value,
      { ...product, id: Math.random().toString(36).substring(2, 11) },
    ]
  }

  const editProduct = (product: Product) => {
    const index = products.value.findIndex((p) => p.id === product.id)
    if (index !== -1) {
      products.value.splice(index, 1, product)
    }
  }

  const deleteProduct = (id: string) => {
    products.value = products.value.filter((p) => p.id !== id)
  }

  const selectProduct = (id: string): Product | null => {
    return products.value.find((p) => p.id === id) ?? null
  }

  onMounted(async () => {
    products.value = await fetchProducts()
  })

  return {
    products: readonly(products),
    addProduct,
    editProduct,
    deleteProduct,
    selectProduct,
  }
})
