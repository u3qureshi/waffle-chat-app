import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api": "/api", // Base URL for the API
    withCredentials: true, // Enable sending cookies with requests
});