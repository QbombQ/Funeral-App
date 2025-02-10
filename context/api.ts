import axios from "axios";
import * as SecureStore from "expo-secure-store"
import config from "@/config.json"
const API_BASE_URL = `${config.server_base_url}:${config.server_port}/api`;

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
