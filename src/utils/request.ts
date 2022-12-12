// 封装axios
import axios from 'axios'
import {ElMessage} from 'element-plus'
// 引入vant组件
import { getToken, removeToken } from './cookie'
const baseURL = 'http://meta.rick.icu'
// 创建axios实例
const service = axios.create({
  // 请求路由
  baseURL: baseURL,
  // 请求超时时间
  timeout: 20000,
})
// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    const token = getToken()
    if (token)
      config.headers.Authorization = 'Bearer ' + token
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
)
// 响应拦截器
service.interceptors.response.use(
  (response: any) => {
    const res = response.data
    return res
  },
  (error: any) => {
    if (error.response && error.response.status === 401) {
      ElMessage.error('当前操作没有权限')
      removeToken()
      location.reload()
    }
    return Promise.reject(error)
    .catch((error) => {
      console.warn(error)
    })
  },
)

export default service
