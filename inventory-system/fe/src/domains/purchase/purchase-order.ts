export interface PurchaseOrderList {
  id: string
  poNumber: string
  supplierId: string
  orderDate: string
  status: 'draft' | 'submitted' | 'approved' | 'received'
  items: PurchaseOrderItem[]
  total: number
  supplierName: string
  deliveryDate: string
}

export interface PurchaseOrderItem {
  productId: string
  quantity: number
  unitPrice: number
  subtotal: number
}
