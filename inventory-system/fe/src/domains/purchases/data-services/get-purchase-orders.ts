import axios from 'axios'
import type { OrdersModel } from '../orders/purchase-order'

export async function getPurchaseOrders(): Promise<OrdersModel[]> {
  const response = await axios.get('/src/data/purchase-orders.json')
  return response.data.purchaseOrders
}
