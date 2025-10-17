import type {PayloadAction} from '@reduxjs/toolkit';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchProductsFromAPI} from '../../api/productsApi';
import type {ProductType} from '../../types/ProductsTypes';

interface ProductsState {
  products: ProductType[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

// Async thunk для завантаження товарів
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
      return await fetchProductsFromAPI();
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const product = state.products.find(p => p.id === action.payload);
      if (product) {
        product.isFavorite = !product.isFavorite;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Помилка завантаження товарів';
      });
  },
});

export const { toggleFavorite } = productsSlice.actions;
export default productsSlice.reducer;

