// utils/request.ts
import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from 'axios'
import type { AxiosRequestConfig } from 'axios' // 使用 import type 单独导入类型
import { getToken } from './token'

// 创建 axios 实例
const request = axios.create({
  baseURL: '127.0.0.1:8080/api',
  timeout: 18000,
})

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.url) {
      const token = getToken()
      if (token) {
        config.headers = config.headers || new AxiosHeaders()
        config.headers.set('satoken', `${token}`)
      }
    }

    // 设置默认 Content-Type
    config.headers = config.headers || new AxiosHeaders()
    config.headers.set('Content-Type', 'application/json;charset=utf-8')
    config.headers.set('Accept', 'application/json;charset=utf-8')
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message, data } = response.data
    console.log('响应数据:', response.data)
    if (code === 1) {
      return data // 直接返回 data 字段
    } else {
      return Promise.reject(new Error(message || '请求失败'))
    }
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        console.error('请求超时，请稍后重试')
      } else if (error.response) {
        console.error(`请求失败，状态码: ${error.response.status}`)
      } else {
        console.error('网络错误，请检查网络连接')
      }
    } else {
      console.error('发生未知错误:', error)
    }
    return Promise.reject(error)
  }
)

export default request