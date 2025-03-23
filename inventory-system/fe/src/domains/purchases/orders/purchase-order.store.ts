import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { getPurchaseOrders } from '../data-services/get-purchase-orders';
import type { OrderModel, OrdersModel } from './purchase-order';

export const useOrdersStore = defineStore('orders', () => {
  const ordersData = ref([] as OrderModel[]);
  const orderlist = computed(() => {
    return ordersData.value.map((order) => {
      return {
        ...order,
        supplierName: 'Supplier Name',
        total: 100,
      } as OrdersModel;
    });
  });
  const addPurchaseOrder = (po: OrderModel) => {
    ordersData.value = [
      ...ordersData.value,
      { ...po, id: Math.random().toString(36).substring(2, 11) },
    ];
  };

  const editPurchaseOrder = (po: OrdersModel) => {
    const index = ordersData.value.findIndex((p) => p.id === po.id);
    if (index !== -1) {
      ordersData.value.splice(index, 1, po);
    }
  };

  const deletePurchaseOrder = (id: string) => {
    ordersData.value = ordersData.value.filter((po) => po.id !== id);
  };

  const selectPurchaseOrder = (id: string): OrderModel | null => {
    return ordersData.value.find((po) => po.id === id) ?? ({} as OrderModel);
  };

  onMounted(async () => {
    ordersData.value = await getPurchaseOrders();
  });

  return {
    purchaseOrders: ordersData,
    orderlist,
    addPurchaseOrder,
    editPurchaseOrder,
    deletePurchaseOrder,
    selectPurchaseOrder,
  };
});
