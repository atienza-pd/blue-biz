<script setup lang="ts">
import PaperView from '@/components/PaperView.vue';
import Alert from '@/components/Alert/TheAlert.vue';
import { useUpperCase } from '@/pipes/uppercase.pipe';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { useEventBus } from '@/eventBus';

const showAlert = ref(false);
const toUpperCase = useUpperCase();
const router = useRouter();
const route = useRoute();
const id = route.params.id;

const { emit } = useEventBus();

const addNewItemOrder = () => {
  if (!id || id === 'new') {
    emit('alert', { type: 'error', message: 'Please save the purchase order first before adding items' });
    return;
  }

  router.push({ name: 'item-detail', params: { orderId: id, id: 'new' } });
};

const editItemOrder = (id: string) => {};

const onConfirm = () => {};
</script>

<template>
  <Alert
      type="success"
      message="Please save the purchase order first before adding items"
      :show="showAlert"
      @close="showAlert = false"
    />
  <div class="space-y-1">
    <PaperView title="Purchase Order Detail" :collapsed="true" collapsed-state="collapsed">
      <form class="space-y-6">
        <div>
          <label for="poNumber" class="block text-sm font-medium text-gray-700">PO Number</label>
          <div class="mt-1">
            <input
              type="text"
              id="poNumber"
              class="block p-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label for="orderDate" class="block text-sm font-medium text-gray-700">Order Date</label>
          <div class="mt-1">
            <input
              type="date"
              id="orderDate"
              class="block p-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label for="deliveryDate" class="block text-sm font-medium text-gray-700"
            >Delivery Date</label
          >
          <div class="mt-1">
            <input
              type="date"
              id="deliveryDate"
              class="block p-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label for="supplier" class="block text-sm font-medium text-gray-700">Supplier</label>
          <div class="mt-1">
            <select
              id="supplier"
              class="block w-full p-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm focus:outline-none"
            >
              <option value="">Select a supplier</option>
              <option value="supplier1">Supplier 1</option>
              <option value="supplier2">Supplier 2</option>
              <option value="supplier3">Supplier 3</option>
            </select>
          </div>
        </div>

        <div>
          <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
          <div class="mt-1">
            <select
              id="status"
              class="block w-full p-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end space-x-3">
          <button
            type="button"
            class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </form>
    </PaperView>
    <PaperView title="Order Details" :collapsed="true">
      <button
        @click="addNewItemOrder"
        class="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        New Order Item
      </button>

      <div class="overflow-auto">
        <table class="min-w-full bg-white border">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b text-left">#</th>
              <th class="py-2 px-4 border-b text-left">Description</th>
              <th class="py-2 px-4 border-b text-left">Quantity</th>
              <th class="py-2 px-4 border-b text-left">Unit Price</th>
              <th class="py-2 px-4 border-b text-left">Total</th>
              <th class="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(purchaseOrder, index) in [] as any"
              :key="purchaseOrder.id ?? index"
              class="hover:bg-gray-100"
            >
              <td class="py-2 px-4 border-b">{{ index + 1 }}</td>
              <td class="py-2 px-4 border-b">{{ purchaseOrder.orderDate }}</td>
              <td class="py-2 px-4 border-b">{{ purchaseOrder.deliveryDate }}</td>
              <td class="py-2 px-4 border-b">{{ purchaseOrder.poNumber }}</td>
              <td class="py-2 px-4 border-b">{{ purchaseOrder.supplierName }}</td>
              <td class="py-2 px-4 border-b">{{ toUpperCase(purchaseOrder.status) }}</td>
              <td class="py-2 px-4 border-b text-center">
                <button
                  @click="editItemOrder(purchaseOrder.id ?? '')"
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
  </div>
</template>
