import Axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from '@/config/config';
import { useNotificationStore } from '@/stores/notificationStore';
import { logoutHelper } from '@/utils/logoutHelper';

const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers = config.headers || {};
  config.headers['Accept'] = 'application/json';
  return config;
};

export const axios = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axios.interceptors.request.use(requestInterceptor as any);

axios.interceptors.response.use(
  (response) => {
      return response;
  },
  async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
              const token = localStorage.getItem('refreshToken');
              const response = await axios.post('user-service/refresh-token', { refreshToken: token });
              localStorage.setItem('refreshToken', response.data.refreshToken);
              originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
              return axios(originalRequest);
          } catch (refreshError) {
              return Promise.reject(refreshError);
          }
      } else if (error.response?.status === 500 && originalRequest.url.includes('refresh-token')) {
          logoutHelper();
          return Promise.reject(error);
      }

      const message = error.response?.data?.message || error.message;
      useNotificationStore.getState().addNotification({
        type: 'error',
        title: 'Error',
        message,
      });

      return Promise.reject(error);
  }
);
