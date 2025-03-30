<script setup lang="ts">
import { useCurrency } from '@/pipes/currency.pipe';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useOrderItemsStore } from './order-items.store';

const toCurrency = useCurrency();
const router = useRouter();
const route = useRoute();
const orderId = ref(route.params.id as string);
const orderItemsStore = useOrderItemsStore();

const addNewItemOrder = () => {
  router.push({ name: 'item-detail', params: { id: orderId.value, itemid: 'new' } });
};

const editItemOrder = (itemId: string) => {
  router.push({ name: 'item-detail', params: { id: orderId.value, itemid: itemId } });
};

const orderItemsData = computed(() => {
  const orderItemsData = orderItemsStore.orderItemsData;
  return {
    totalPrice: orderItemsData.totalPrice,
    fullItems: orderItemsData.fullItems,
  };
});

watch(
  () => orderId.value,
  (newId) => {
    orderItemsStore.selectOrderId = newId;
  },
  { immediate: true },
);

watch(
  () => route.params.id,
  (newId) => {
    orderId.value = newId as string;
  },
);
</script>

<template>
  <div class="flex justify-between items-center">
    <button @click="addNewItemOrder" class="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
      New Order Item
    </button>
    <h2 class="text-2xl font-semibold">Total: {{ orderItemsData.totalPrice }}</h2>
  </div>

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
        <tr v-for="(purchaseOrder, index) in orderItemsData.fullItems" :key="purchaseOrder.id ?? index"
          class="hover:bg-gray-100">
          <td class="py-2 px-4 border-b">{{ index + 1 }}</td>
          <td class="py-2 px-4 border-b">{{ purchaseOrder.description }}</td>
          <td class="py-2 px-4 border-b">{{ toCurrency(purchaseOrder.quantity) }}</td>
          <td class="py-2 px-4 border-b">{{ toCurrency(purchaseOrder.unitPrice) }}</td>
          <td class="py-2 px-4 border-b">{{ toCurrency(purchaseOrder.subtotal) }}</td>
          <td class="py-2 px-4 border-b text-center">
            <button @click="editItemOrder(purchaseOrder.id ?? '')" class="text-blue-500 hover:text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.9,2.1c-0.4-0.4-1-0.4-1.4,0L2.1,11.5c-0.1,0.1-0.2,0.3-0.2,0.4l-1,4.5c-0.1,0.4,0,0.8,0.2,1.1
                    c0.2,0.3,0.6,0.4,1,0.4c0,0,0,0,0,0l4.5-1c0.2,0,0.3-0.1,0.4-0.2l9.4-9.4c0.4-0.4,0.4-1,0-1.4L12.9,2.1z M4.3,14.7l-2.8,0.6
                    l0.6-2.8l7.9-7.9l2.1,2.1L4.3,14.7z M14.8,4.2l-1.4,1.4l-2.1-2.1l1.4-1.4c0.2-0.2,0.5-0.2,0.7,0l1.4,1.4
                    C15,3.7,15,4,14.8,4.2z" />
              </svg>
            </button>

            <button class="text-red-500 hover:text-red-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
