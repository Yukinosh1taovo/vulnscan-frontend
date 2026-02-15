import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import router from '@/router'

// 统一的后端基础路径，根据后端约定 /api/auth/...
const baseURL = '/api'

const service: AxiosInstance = axios.create({
  baseURL,
  timeout: 15000
})

// 请求拦截器：自动附带本地 token
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = window.localStorage.getItem('token')
    if (token) {
      if (!config.headers) {
        config.headers = {}
      }
      // 与后端约定的 Authorization 头
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器：统一错误处理（含 401 跳转登录）
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error) => {
    const status = error?.response?.status

    if (status === 401) {
      // 未授权，清理本地登录状态并跳转登录页
      window.localStorage.removeItem('token')
      router.push('/login')
    }

    return Promise.reject(error)
  }
)

export default service

