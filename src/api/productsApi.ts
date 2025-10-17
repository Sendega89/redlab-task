import type {ProductType} from '../types/ProductsTypes';


export const fetchProductsFromAPI = async (): Promise<ProductType[]> => {
  const delay = Math.floor(Math.random() * 100) + 300; // 200-300 мс
  
  await new Promise(resolve => setTimeout(resolve, delay));
  
  const response = await fetch('/products.json');
  
  if (!response.ok) {
    throw new Error('Помилка завантаження товарів');
  }

  return await response.json();
};

