<script setup lang="ts">
import PaperView from '@/components/PaperView.vue'
import { useSuppliersStore } from '@/stores/suppliers'
import { useRouter } from 'vue-router'
const router = useRouter()
const suppliersStore = useSuppliersStore()

const addNewSupplier = () => {
  router.push({ name: 'supplier-detail', params: { id: 'new' } })
}

const editSupplier = (id: string) => {
  router.push({ name: 'supplier-detail', params: { id } })
}
</script>

<template>
  <PaperView title="Suppliers">
    <button
      @click="addNewSupplier"
      class="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
      Add New Supplier
    </button>
    <div class="overflow-auto">
      <table class="min-w-full bg-white border">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b text-left">#</th>
            <th class="py-2 px-4 border-b text-left">Name</th>
            <th class="py-2 px-4 border-b text-left">Description</th>
            <th class="py-2 px-4 border-b text-left">Contact Person</th>
            <th class="py-2 px-4 border-b text-left">Email</th>
            <th class="py-2 px-4 border-b text-left">Phone</th>
            <th class="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(supplier, index) in suppliersStore.suppliers"
            :key="supplier.id ?? index"
            class="hover:bg-gray-100"
          >
            <td class="py-2 px-4 border-b">{{ index + 1 }}</td>
            <td class="py-2 px-4 border-b">{{ supplier.name }}</td>
            <td class="py-2 px-4 border-b">{{ supplier.description }}</td>
            <td class="py-2 px-4 border-b">{{ supplier.contactPerson }}</td>
            <td class="py-2 px-4 border-b">{{ supplier.email }}</td>
            <td class="py-2 px-4 border-b">{{ supplier.phone }}</td>
            <td class="py-2 px-4 border-b text-center">
              <button
                @click="editSupplier(supplier.id ?? '')"
                class="text-blue-500 hover:text-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12.9,2.1c-0.4-0.4-1-0.4-1.4,0L2.1,11.5c-0.1,0.1-0.2,0.3-0.2,0.4l-1,4.5c-0.1,0.4,0,0.8,0.2,1.1
                    c0.2,0.3,0.6,0.4,1,0.4c0,0,0,0,0,0l4.5-1c0.2,0,0.3-0.1,0.4-0.2l9.4-9.4c0.4-0.4,0.4-1,0-1.4L12.9,2.1z M4.3,14.7l-2.8,0.6
                    l0.6-2.8l7.9-7.9l2.1,2.1L4.3,14.7z M14.8,4.2l-1.4,1.4l-2.1-2.1l1.4-1.4c0.2-0.2,0.5-0.2,0.7,0l1.4,1.4
                    C15,3.7,15,4,14.8,4.2z"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </PaperView>
</template>
