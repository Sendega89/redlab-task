import type { ProductType } from '../types/ProductsTypes';
import { apiDelay, fetchWithErrorHandling } from '../common/apiHelpers';

// Локальне сховище для обраного
const FAVORITES_KEY = 'shoplab_favorites';

const getFavoritesFromStorage = (): number[] => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveFavoritesToStorage = (favorites: number[]): void => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

const addFavoriteStatus = (products: ProductType[]): ProductType[] => {
  const favorites = getFavoritesFromStorage();
  return products.map(product => ({
    ...product,
    isFavorite: favorites.includes(product.id)
  }));
};

export const fetchProductsFromAPI = async (): Promise<ProductType[]> => {
  await apiDelay(300, 400);
  
  const products = await fetchWithErrorHandling<ProductType[]>(
    '/products.json',
    'Помилка завантаження товарів'
  );
  
  return addFavoriteStatus(products);
};

export const fetchOneProductFromAPI = async (id: number): Promise<ProductType> => {
  await apiDelay(300, 400);

  const products = await fetchWithErrorHandling<ProductType[]>(
    '/products.json',
    'Помилка завантаження товарів'
  );
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    throw new Error(`Товар з ID ${id} не знайдено`);
  }

  const favorites = getFavoritesFromStorage();
  return {
    ...product,
    isFavorite: favorites.includes(product.id)
  };
};

export const toggleFavoriteAPI = async (id: number): Promise<ProductType> => {
  await apiDelay(200);
  
  const favorites = getFavoritesFromStorage();
  const index = favorites.indexOf(id);
  
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(id);
  }
  
  saveFavoritesToStorage(favorites);
  
  return await fetchOneProductFromAPI(id);
};

