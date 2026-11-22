import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { getAccessToken } from '../utils/storage';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const rawContent = error.response?.data?.content;
    const rawMessage = error.response?.data?.message;
    const message =
      (typeof rawContent === 'string' &&
        rawContent.trim() !== '' &&
        rawContent.trim() !== 'Thành công!' &&
        rawContent) ||
      rawMessage ||
      error.message ||
      'Đã có lỗi xảy ra khi kết nối máy chủ.';
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
