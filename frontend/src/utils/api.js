// src/utils/api.js
// Instancia de Axios configurada para consumir el backend

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor de respuesta — manejo centralizado de errores
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Error de conexión con el servidor';
    return Promise.reject(new Error(message));
  }
);

export default api;
