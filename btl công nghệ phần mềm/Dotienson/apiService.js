// Dùng axios để gọi API backend
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api'; // Backend URL

// Config axios với token nếu cần
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor để xử lý lỗi
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Lấy danh sách sản phẩm
export const getProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy sản phẩm:', error);
    throw error;
  }
};

// Tạo đơn hàng
export const createOrder = async (orderData) => {
  try {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Lỗi tạo đơn hàng:', error);
    throw error;
  }
};

// Lấy thông tin khách hàng
export const getCustomer = async (customerId) => {
  try {
    const response = await apiClient.get(`/customers/${customerId}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy khách hàng:', error);
    throw error;
  }
};