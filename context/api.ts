import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = "http://172.20.100.39:8080/api"; // Replace with your actual backend URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Automatically attach token to every request
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("userToken");

    if (token) {
      config.headers.Authorization = `${token}`;
    } else {
      console.warn("⚠️ No auth token found!");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
