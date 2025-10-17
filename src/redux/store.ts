import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/redux/slices/userSlice'
import searchReducer from '@/redux/slices/searchSlice'
import { productsApi } from '@/redux/rtkApi/productsApi'

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
