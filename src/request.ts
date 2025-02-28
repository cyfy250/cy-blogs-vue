import axios from 'axios'
import { message } from 'ant-design-vue'
import { getToken } from '@/utils/auth'
// 创建 Axios 实例
const myAxios = axios.create({
  // baseURL: 'http://localhost:8080', // 后端请求URL
  timeout: 5 * 60 * 1000, // 超时时间
  withCredentials: true, // 发送请求时携带cookie信息
})

// 全局配置拦截器
myAxios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 获取token
    const token = getToken()
    if (token) {
      // 将token添加到请求头中
      config.headers['X-Token'] = token
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 全局响应拦截器
myAxios.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const { data } = response
    // 40100: 未登录
    if (data.code === 40100) {
      // 不是获取用户信息的请求，并且用户目前不是已经在用户登录页面，则跳转到登录界面
      if (
        !response.request.responseURL.includes('user/get/login') &&
        !window.location.pathname.includes('/user/login')
      ) {
        message.warning('请先登录')
        // 重定向到登录页面
        window.location.href = `/user/login?redirect=${window.location.href}`
      }
    }
    return response
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      message.error(`${error.response.status} ${error.response.data}`)
    }
  },
)

export default myAxios
