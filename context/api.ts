import axios from "axios";
import * as SecureStore from "expo-secure-store"

const API_BASE_URL = "http://172.20.100.19:8000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("userToken");

    config.headers.Authorization = `${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
