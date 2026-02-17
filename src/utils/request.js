import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router';

const service = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// 请求拦截器：添加 Authorization 头
service.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (res) => {
    // 统一处理后端返回格式
    if (res.data.code === 200 || res.data.code === 1 || res.data.code === 'success') {
      return res.data;
    } else if (res.data.code === 401 || res.data.msg === '用户未登录或登录已过期') {
      // Token 失效，清除存储并跳转到登录页
      ElMessage.error('登录已过期，请重新登录');
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('tokenType');
      window.localStorage.removeItem('userInfo');
      router.push('/login');
      return Promise.reject(res.data);
    } else {
      ElMessage.error(res.data.msg || res.data.message || '请求失败');
      return Promise.reject(res.data);
    }
  },
  (error) => {
    // 处理 HTTP 错误状态码
    if (error.response && error.response.status === 401) {
      ElMessage.error('登录已过期，请重新登录');
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('tokenType');
      window.localStorage.removeItem('userInfo');
      router.push('/login');
    } else {
      ElMessage.error(error.message || '网络错误');
    }
    return Promise.reject(error);
  }
);

export default service;
