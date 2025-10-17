
import {AxiosError} from 'axios';
import type {BaseQueryFn} from "@reduxjs/toolkit/query";

type AxiosRequestArgs = {
	func: (...args: any[]) => Promise<any>;
	args: any[];
};

type CustomErrorType = {
	status: number;
	data: any;
};

export const customAxiosBaseQuery: BaseQueryFn<
	AxiosRequestArgs,
	unknown,
	CustomErrorType
> = async ({func, args}) => {
	try {
		const result = await func(...args);
		return {data: result.data};
	} catch (error) {
		const axiosError = error as AxiosError;

		return {
			error: {
				status: axiosError.response?.status || 500,
				data: axiosError.response?.data || axiosError.message,
			},
		};
	}
};
