// src/api/auth.js
import apiClient from './client';

export const authApi = {
  // تسجيل الدخول العادي
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  // تسجيل الدخول عبر Google
  loginWithGoogle: async (credentialResponse, userType, additionalData) => {
    const response = await apiClient.post('/auth/google', { 
      credential: credentialResponse.credential,
      userType,
      ...additionalData
    });
    return response.data;
  },

  // تسجيل الدخول عبر Facebook
  loginWithFacebook: async (accessToken, userType, additionalData) => {
    const response = await apiClient.post('/auth/facebook', { 
      accessToken,
      userType,
      ...additionalData
    });
    return response.data;
  },

  // تسجيل عميل جديد
  registerCustomer: async (userData) => {
    const response = await apiClient.post('/auth/register/customer', userData);
    return response.data;
  },

  // تسجيل بائع جديد
  registerSeller: async (userData) => {
    const response = await apiClient.post('/auth/register/seller', userData);
    return response.data;
  },

  // تسجيل خروج
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  // التحقق من البريد الإلكتروني
  verifyEmail: async (token) => {
    const response = await apiClient.post('/auth/verify-email', { token });
    return response.data;
  },

  // إعادة تعيين كلمة المرور
  forgotPassword: async (email) => {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token, password) => {
    const response = await apiClient.post('/auth/reset-password', { token, password });
    return response.data;
  },

  // تحديث الملف الشخصي
  updateProfile: async (data) => {
    const response = await apiClient.put('/auth/profile', data);
    return response.data;
  },

  // تغيير كلمة المرور
  changePassword: async (currentPassword, newPassword) => {
    const response = await apiClient.put('/auth/change-password', { currentPassword, newPassword });
    return response.data;
  },
};