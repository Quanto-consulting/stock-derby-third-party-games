import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://stock-derby-third-party-games.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
    "api-key": process.env.API_KEY,
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6InVzZXIiLCJjb21wYW55SWQiOjQsImlhdCI6MTc1NzUwMzQwMCwiZXhwIjoxNzYwMDk1NDAwfQ.qSvl0dfuVHiBBqpVjYio7IdFkqIsNkn_Zge8zPSniJA",
  },
  withCredentials: true,
});

export default api;
