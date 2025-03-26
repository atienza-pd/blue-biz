import { computed, ref, watchEffect, type Ref } from 'vue';
import type { OrderItem } from './order-item.model';

export interface OrderItemDetailErrorFieldModel {
  productId: string;
  quantity: string;
}

export function useOrderItemFormValidation(orderDetail: Ref<Partial<OrderItem | null>>) {
  const original = ref({ ...orderDetail.value });

  const isFormDirty = computed(() => {
    return JSON.stringify(orderDetail.value) !== JSON.stringify(original.value);
  });

  const errors = ref<OrderItemDetailErrorFieldModel>({
    productId: '',
    quantity: '',
  });

  const validateField = (field: keyof typeof errors.value) => {
    switch (field) {
      case 'productId':
        errors.value.productId = orderDetail.value?.productId ? '' : 'Product is required';
        break;
      case 'quantity':
        errors.value.quantity = orderDetail.value?.quantity ? '' : 'Quantity is required';
        break;
    }
  };

  const isFormValid = computed(() => {
    return errors.value.productId === '' && errors.value.quantity === '';
  });

  watchEffect(() => validateField('productId'));
  watchEffect(() => validateField('quantity'));

  return {
    errors,
    isFormValid,
    isFormDirty,
  };
}
