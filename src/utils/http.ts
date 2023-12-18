import axios, { type AxiosInstance } from 'axios'
import { readCookie } from './cookie'
import { ENV } from './constants'
class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = readCookie('tokenDHJO')
    this.instance = axios.create({
      baseURL: ENV,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = `Bearer ${this.accessToken}`
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
