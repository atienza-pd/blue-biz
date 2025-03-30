import { useCurrency } from '@/pipes/currency.pipe';
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
  const selectOrderId = ref('');

  const orderItemsData = computed(() => {
    const toCurrency = useCurrency();

    const fullItems = orderItems.value
      .filter((item) => item.orderId === selectOrderId.value)
      .map((item) => ({
        ...item,
        description: productsStore.selectProduct(item.productId)?.name,
        unitPrice: productsStore.selectProduct(item.productId)?.unitPrice,
        subtotal: item.quantity * (productsStore.selectProduct(item.productId)?.unitPrice ?? 0),
      }));

    const totalPrice = fullItems.reduce((acc, item) => acc + item.subtotal, 0);

    return {
      fullItems: fullItems,
      totalPrice: toCurrency(totalPrice),
    };
  });

  const add = (po: OrderItem) => {
    orderItems.value = [
      ...orderItems.value,
      { ...po, id: Math.random().toString(36).substring(2, 11) },
    ];
  };

  const edit = (id: string, updates: Partial<OrderItem>) => {
    orderItems.value = orderItems.value.map((item) =>
      item.id === id ? { ...item, ...updates } : item,
    );
  };

  const select = (id: string): OrderItem | null => {
    return orderItems.value.find((po) => po.id === id) ?? ({} as OrderItem);
  };

  return {
    orderItems: readonly(orderItems),
    orderItemsData,
    selectOrderId,
    add,
    edit,
    select,
  };
});
