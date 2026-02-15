import request from '@/utils/request'

// 与后端 DTO 对应的类型
export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  password: string
  email: string
}

export interface LoginResponse {
  accessToken: string
  tokenType: string
  expiresIn: number
  userInfo: UserInfo
}

export interface UserInfo {
  id: number | string
  username: string
  email?: string
  role?: string
  lastLoginTime?: string
}

export interface ApiResponse<T = unknown> {
  code: number
  msg: string
  data: T
}

// 登录
export function login(data: LoginRequest) {
  return request.post<ApiResponse<LoginResponse>>('/auth/login', data)
}

// 注册
export function register(data: RegisterRequest) {
  return request.post<ApiResponse<UserInfo>>('/auth/register', data)
}

