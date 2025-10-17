import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { fetchProductsFromAPI, fetchOneProductFromAPI, toggleFavoriteAPI } from '../../api/productsApi';
import { createApiErrorHandler } from '../../common/apiHelpers';
import type { ProductType } from '../../types/ProductsTypes';

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['ProductsList', 'Product'],
	endpoints: (builder) => ({
		productsList: builder.query<ProductType[], void>({
			queryFn: createApiErrorHandler(
				() => fetchProductsFromAPI(),
				'Помилка завантаження товарів'
			),
			providesTags: ['ProductsList'],
		}),
		productById: builder.query<ProductType, number>({
			queryFn: (id) => createApiErrorHandler(
				() => fetchOneProductFromAPI(id),
				'Помилка завантаження товару'
			)(),
			providesTags: (_, __, id) => [{ type: 'Product', id }],
		}),
		toggleFavorite: builder.mutation<ProductType, number>({
			queryFn: (id) => createApiErrorHandler(
				() => toggleFavoriteAPI(id),
				'Помилка оновлення товару'
			)(),
			invalidatesTags: (_, __, id) => [
				'ProductsList',
				{ type: 'Product', id }
			],
		}),
	}),
});

export const {
	useProductsListQuery,
	useProductByIdQuery,
	useToggleFavoriteMutation,
} = productsApi;
