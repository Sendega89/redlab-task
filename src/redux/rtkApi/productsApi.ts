import {createApi} from '@reduxjs/toolkit/query/react';
import {userApi} from '../../api/api.ts';
import {customAxiosBaseQuery} from '../../api/customAxiosBaseQuery.ts';
import type {ProductType} from "../../types/ProductsTypes.ts";



export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: customAxiosBaseQuery,
	tagTypes: [
		'productsList',
	],
	endpoints: (builder) => ({
		productsList: builder.query<ProductType[], void>({
			query: () => ({
				func: userApi.getProductsList,
				args: [],
			}),
			providesTags: ['productsList'],
		}),
	}),
});

export const {useProductsListQuery

} = productsApi;
