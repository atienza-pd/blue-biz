import type { Product } from '@/domains/catalogs/products/product'
import { computed, ref, watchEffect, type Ref } from 'vue'

export function useProductFormValidation(product: Ref<Partial<Product | null>>) {
  const originalProduct = ref({ ...product.value })

  const isFormDirty = computed(() => {
    return JSON.stringify(product.value) !== JSON.stringify(originalProduct.value)
  })

  const errors = ref({
    name: '',
    price: '',
    quantity: '',
  })

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

  const validateForm = () => {
    errors.value.name = product.value?.name ? '' : 'Product Name is required'
    errors.value.price = product.value?.unitPrice ? '' : 'Product Price is required'
    errors.value.quantity = product.value?.quantity ? '' : 'Product Quantity is required'
  }

  const isFormValid = computed(() => {
    return product.value?.name && product.value?.unitPrice && product.value?.quantity
  })

  watchEffect(() => validateField('name'))
  watchEffect(() => validateField('price'))
  watchEffect(() => validateField('quantity'))

  return {
    errors,
    isFormValid,
    isFormDirty,
  }
}
