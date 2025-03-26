import { useProductsStore } from '@/stores/products';
import { defineStore } from 'pinia';
import { computed, readonly, ref } from 'vue';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice?: number;
  subtotal?: number;
}

export const useOrderItemsStore = defineStore('purchaseOrderItems', () => {
  const orderItems = ref([] as OrderItem[]);
  const productsStore = useProductsStore();
  const orderItemsList = computed(() =>
    orderItems.value.map((item) => ({
      ...item,
      description: productsStore.selectProduct(item.productId)?.name,
      unitPrice: productsStore.selectProduct(item.productId)?.unitPrice,
      subtotal: item.quantity * (productsStore.selectProduct(item.productId)?.unitPrice ?? 0),
    })),
  );

  const add = (po: OrderItem) => {
    orderItems.value = [
      ...orderItems.value,
      { ...po, id: Math.random().toString(36).substring(2, 11) },
    ];
  };

  return {
    orderItems,
    orderItemsList: readonly(orderItemsList),
    add,
  };
});
