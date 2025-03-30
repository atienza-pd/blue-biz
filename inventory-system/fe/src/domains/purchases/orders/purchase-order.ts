export interface OrderModel {
  id: string | null;
  poNumber: string;
  supplierId: number | null;
  orderDate: string;
  deliveryDate: string;
  status: OrderStatus;
}

export interface OrdersModel extends OrderModel {
  total: number;
  supplierName: string;
}

export interface OrderDetailErrorFieldModel {
  poNumber: string;
  orderDate: string;
  deliveryDate: string;
  supplierId: string;
  status: string;
}

export type OrderStatus = 'draft' | 'submitted' | 'approved' | 'received';
