import HttpRequest from './axios'
import settings from './settings'

const baseUrl = process.env.NODE_ENV === 'development' ? settings.baseUrl.dev : settings.baseUrl.pro

// console.log(process.env.NODE_ENV)

// const baseUrl = `http://${globalRequestConfig.target}/${globalRequestConfig.javaModule}`

const axios = new HttpRequest(baseUrl)

export default axios
