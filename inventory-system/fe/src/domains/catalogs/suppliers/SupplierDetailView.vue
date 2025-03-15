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
import { useSuppliersStore } from '@/stores/suppliers'
import type { Supplier } from './supplier'

const supplierStore = useSuppliersStore()
const route = useRoute()
const router = useRouter()
const errors = ref({
  name: '',
  contactPerson: '',
  phone: '',
  email: '',
})

const id = route.params.id as string

const supplier = computed(() => {
  return id === 'new'
    ? reactive({
        id: null,
        name: '',
        description: '',
        contactPerson: '',
        email: '',
        phone: '',
      } as Supplier)
    : supplierStore.select(id)
})

const originalSupplier = ref({ ...supplier.value })

const isFormValid = computed(() => {
  return supplier.value?.name && supplier.value?.contactPerson && supplier.value?.phone
})

const isFormDirty = computed(() => {
  return JSON.stringify(supplier.value) !== JSON.stringify(originalSupplier.value)
})

const validateForm = () => {
  errors.value.name = supplier.value?.name ? '' : 'Name is required'
  errors.value.contactPerson = supplier.value?.contactPerson ? '' : 'Contact Person is required'
  errors.value.phone = supplier.value?.phone ? '' : 'Phone is required'
}

const validateEmail = (email: string): boolean => {
  if (!email) {
    return true
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return emailRegex.test(email)
}

const validateField = (field: keyof typeof errors.value) => {
  switch (field) {
    case 'name':
      errors.value.name = supplier.value?.name ? '' : 'Name is required'
      break
    case 'contactPerson':
      errors.value.contactPerson = supplier.value?.contactPerson ? '' : 'Contact Person is required'
      break
    case 'phone':
      errors.value.phone = supplier.value?.phone ? '' : 'Phone is required'
      break
    case 'email':
      errors.value.email = validateEmail(supplier.value?.email ?? '') ? '' : 'Email is invalid'
      break
  }
}

watchEffect(() => validateField('name'))
watchEffect(() => validateField('contactPerson'))
watchEffect(() => validateField('phone'))
watchEffect(() => validateField('email'))

const submit = () => {
  validateForm()
  if (!isFormValid.value) return

  if (supplier.value?.id) {
    supplierStore.editSupplier(supplier.value as Supplier)
  } else {
    supplierStore.addSupplier(supplier.value as Supplier)
  }

  alert(`Supplier ${supplier.value?.name} has been saved!`)

  router.push({ name: 'suppliers' })
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <PaperView v-if="supplier" :title="`Add new Product ${supplier.name}`">
    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          v-model="supplier.name"
          type="text"
          autocomplete="off"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
        />
        <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <input
          id="description"
          v-model="supplier.description"
          type="text"
          autocomplete="off"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <label for="contactPerson" class="block text-sm font-medium text-gray-700"
          >Contact Person</label
        >
        <input
          id="contactPerson"
          v-model="supplier.contactPerson"
          type="text"
          autocomplete="off"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
        />
        <span v-if="errors.contactPerson" class="text-red-500 text-sm">{{
          errors.contactPerson
        }}</span>
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          v-model="supplier.email"
          type="email"
          autocomplete="off"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
        />
        <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
      </div>
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
        <input
          id="phone"
          v-model="supplier.phone"
          type="text"
          autocomplete="off"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
        />
        <span v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</span>
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
