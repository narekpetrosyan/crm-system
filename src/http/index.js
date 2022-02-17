import axios from 'axios';

const headers = {
  Accept: 'application/json',
};

export const $host = axios.create({
  //   baseURL: 'https://test5.365traveling.com',
  baseURL: '/api',
  headers,
});

/**
 * auth host
 */

export const $authHost = axios.create({
  //   baseURL: 'https://test5.365traveling.com',
  baseURL: '/api',
  headers,
});

$authHost.interceptors.request.use((config) => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
});

$authHost.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem('isAuth');
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    throw error;
  },
);
