import axios from 'axios';
import type { Product } from './product';

/**
 * Fetches the list of products from a local JSON file.
 *
 * @returns {Promise<Product[]>} A promise that resolves to an array of products.
 * If an error occurs during the fetch, an empty array is returned.
 */
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get('http://localhost:3001/products');
    return response.data;
  } catch (error) {
    return [];
  }
};
