import axios , { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { getToken } from "@/utils/methods";
const baseURL: any = import.meta.env.VITE_BASE_URL

const service: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000
})

// 请求前的统一处理
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // JWT鉴权处理
    const token = getToken();
    if (token) {
      config.headers['TGC'] = token;
    }
    return config
  },
  (error: AxiosError) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log(`%c response`, 'color:#4278ff;', response.responseType)
    const res = response.data
    if (res.code === 200 || res.success || response.config.responseType === "blob") {
      return res
    } else {
      showError(res)
      return Promise.reject(res)
    }
  },
  (error: AxiosError)=> {
    console.log(`%c response-error`, 'color:#4278ff;', error?.response?.data)
    const res = error?.response?.data || {}
    showError(res)
    return Promise.reject(error)
  }
)

// 错误处理
function showError(res: any) {
  // token过期，清除本地数据，并跳转至登录页面
  // console.log(`%c showError`, 'color:#4278ff;', res)
  if ([401, 403].includes(res.errorCode)) {
    // to re-login
    store.dispatch('user/loginOut')
  } else {
    ElMessage({
      message: res.errorMessage || '服务异常',
      type: 'error',
      duration: 3 * 1000
    })
  }
  
}

export default service