import axios from 'axios';



export const instance = axios.create({
    baseURL: "app/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

export const userApi = {
    getProductsList() {
		return instance.get(`products`);
	},
};
