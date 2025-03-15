import axios from 'axios'
import type { Supplier } from './supplier'

/**
 * Fetches the list of products from a local JSON file.
 *
 * @returns {Promise<Product[]>} A promise that resolves to an array of products.
 * If an error occurs during the fetch, an empty array is returned.
 */
export const fetchSuppliers = async (): Promise<Supplier[]> => {
  try {
    const response = await axios.get('/src/data/fake-suppliers.json')
    return response.data
  } catch (error) {
    return []
  }
}
