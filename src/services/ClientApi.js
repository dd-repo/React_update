import axios from 'axios';

import { getAuthToken } from 'localStorage';
import { BASE_URL } from 'consts/apis';

class ClientApi {
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
    //switch ( error.response.status) {
      //case 401:
        //this.redirectTo(document, '/login')
        //break;
      //case 404:
        //this.redirectTo(document, '/404')
        //break;
      //default:
        //return error
        //break;
    //}
    return Promise.reject(error)
  }

  redirectTo = (document, path) => {
    document.location = path
  }

  get(path) {
    const authToken = getAuthToken();
    this.client.defaults.headers.common['Authorization'] = authToken
    return this.client.get(path)
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
    //const authToken = getAuthToken();
    //this.client.defaults.headers.common['Authorization'] = authToken
    return this.client.request({
      method: 'POST',
      url: path,
      data: JSON.stringify(payload)
    })
  }
}

export default new ClientApi
