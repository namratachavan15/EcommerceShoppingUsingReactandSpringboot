// // config/apiConfig.js
// import axios from 'axios';

// export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

// export const api = axios.create({
//   baseURL: API_BASE_URL,
// });

// // Interceptor: reads token from localStorage for every request
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('jwt');
//     if (token) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${token}`;
//     } else if (config.headers) {
//       delete config.headers.Authorization;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // helper (optional)
// export const setAuthToken = (token) => {
//   if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   else delete api.defaults.headers.common['Authorization'];
// };


import axios from "axios";

export const API_BASE_URL = "http://localhost:5454"; // Replace with your backend URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});