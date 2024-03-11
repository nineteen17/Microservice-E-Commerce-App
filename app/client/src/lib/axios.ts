import Axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from '@/config/config';
import { useNotificationStore } from '@/stores/notificationStore';

const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers = config.headers || {};
  config.headers['Accept'] = 'application/json';
  return config;
};

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(requestInterceptor as any);
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    useNotificationStore.getState().addNotification({
      type: 'error',
      title: 'Error',
      message,
    });

    return Promise.reject(error);
  }
);
