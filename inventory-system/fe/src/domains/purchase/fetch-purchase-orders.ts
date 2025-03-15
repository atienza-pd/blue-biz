import type { PurchaseOrderList } from './purchase-order'
import axios from 'axios'

export async function fetchPurchaseOrders(): Promise<PurchaseOrderList[]> {
  const response = await axios.get('/src/data/purchase-orders.json')
  return response.data.purchaseOrders
}
