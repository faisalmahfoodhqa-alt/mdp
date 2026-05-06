// src/api/client.js
import axios from 'axios';
import { resolveApiBaseUrl } from '../config/backend';

const API_URL = resolveApiBaseUrl();

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// إضافة token للطلبات
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// معالجة الأخطاء
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const path = window.location.pathname || '';
      const publicAuth = /^\/(login|register)(\/|$)/.test(path);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (!publicAuth) window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;