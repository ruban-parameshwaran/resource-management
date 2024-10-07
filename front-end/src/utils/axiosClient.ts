import { AppConst } from "@src/const/AppConst";
import axios, { AxiosError } from "axios";

const axiosClient = axios.create({
  baseURL: AppConst.BaseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
	const userObject = localStorage.getItem("persist:root") ?? "";
	const authUserObject = JSON.parse(userObject);
	const token: string = authUserObject?.token;

	if (token) {
		config.headers["Authorization"] = `Bearer ${token.replace(/^"|"$/g, "")}`;
	}
	return config;
});

axiosClient.interceptors.response.use(undefined, (error: AxiosError) => {
	if (error.response?.status === 401) {
		throw new Error('Unothorized');
	}
	return Promise.reject(error);
});

export default axiosClient;
