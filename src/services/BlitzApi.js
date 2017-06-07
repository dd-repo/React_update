import axios from 'axios';

import { getAuthToken } from 'localStorage';
import BASE_URL from 'consts/baseUrl';

class BlitzApi {
  constructor() {

    let client = axios.create({
      baseURL: BASE_URL,
      timeout: 15000,
      headers: { 'Content-Type': 'application/json' },
    })

    client.interceptors.response.use(this.handleSuccess, this.handleError);
    this.client = client
  }

  handleSuccess(response) {
    return response
  }

  handleError = (error) => {
    const expiredToken = error.response.status === 408
    const unauthorized = error.response.status === 401
    if(expiredToken) {
      window.location.pathname.startsWith('/dashboard')
        ||
          window.location.pathname.startsWith('/admin')
          &&
            this.redirectTo(document, '/login')
    }
    return Promise.reject(error)
  }

  redirectTo = (document, path) => {
    document.location = path
  }

  get(path, params) {
    const authToken = getAuthToken();
    this.client.defaults.headers.common['Authorization'] = authToken
    return this.client.get(path, { params })
  }

  patch(path, payload) {
    const authToken = getAuthToken();
    this.client.defaults.headers.common['Authorization'] = authToken
    return this.client.request({
      method: 'PATCH',
      url: path,
      data: JSON.stringify(payload)

    })
  }

  post(path, payload) {
    const authToken = getAuthToken();
    this.client.defaults.headers.common['Authorization'] = authToken
    return this.client.request({
      method: 'POST',
      url: path,
      data: JSON.stringify(payload)
    })
  }
}

export default new BlitzApi
