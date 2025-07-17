import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.EXTERNAL_BACKEND_URL ?? "/api",
  headers: {
    "Content-Type": "application/json",
    "api-key": process.env.API_KEY,
  },

  withCredentials: true,
});

export default api;
