import { computed, ref, watchEffect, type Ref } from 'vue';
import { type OrderDetailErrorFieldModel, type OrderModel } from './purchase-order';

export function useOrderFormValidation(orderDetail: Ref<Partial<OrderModel | null>>) {
  const original = ref({ ...orderDetail.value });

  const isFormDirty = computed(() => {
    return JSON.stringify(orderDetail.value) !== JSON.stringify(original.value);
  });

  const errors = ref<OrderDetailErrorFieldModel>({
    poNumber: '',
    orderDate: '',
    deliveryDate: '',
    supplierId: '',
    status: '',
  });

  const validateField = (field: keyof typeof errors.value) => {
    switch (field) {
      case 'poNumber':
        errors.value.poNumber = orderDetail.value?.poNumber ? '' : 'PO Number is required';
        break;
      case 'orderDate':
        errors.value.orderDate = orderDetail.value?.orderDate ? '' : 'Order Date is required';
        break;
      case 'deliveryDate':
        errors.value.deliveryDate = orderDetail.value?.deliveryDate
          ? ''
          : 'Delivery Date is required';
        break;
      case 'supplierId':
        errors.value.supplierId = orderDetail.value?.supplierId ? '' : 'Supplier is required';
        break;
      case 'status':
        errors.value.status = orderDetail.value?.status ? '' : 'Status is required';
        break;
    }
  };

  const isFormValid = computed(() => {
    return (
      errors.value.deliveryDate === '' &&
      errors.value.orderDate === '' &&
      errors.value.poNumber === '' &&
      errors.value.supplierId === '' &&
      errors.value.status === ''
    );
  });

  watchEffect(() => validateField('poNumber'));
  watchEffect(() => validateField('orderDate'));
  watchEffect(() => validateField('deliveryDate'));
  watchEffect(() => validateField('supplierId'));
  watchEffect(() => validateField('status'));

  return {
    errors,
    isFormValid,
    isFormDirty,
  };
}
