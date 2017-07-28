import axios from 'axios';
import moxios from 'moxios';
import httpAdapter from 'axios/lib/adapters/http'

import clickadillyApi from 'services/clickadillyApi';
import BASE_URL from 'consts/baseUrl';
import {
  SIGNUP_REQUEST,
  LOGIN_REQUEST
} from 'routes/auth/modules/auth';

describe('clickadillyApi', () => {

  it('GET Should be a function', () => {
    expect(clickadillyApi.get).to.be.a('function')
  })

  it('PATCH Should be a function', () => {
    expect(clickadillyApi.patch).to.be.a('function')
  })

  it('POST Should be a function', () => {
    expect(clickadillyApi.post).to.be.a('function')
  })

  it('handleSuccess Should be a function', () => {
    expect(clickadillyApi.handleSuccess).to.be.a('function')
  })

  it('handleError Should be a function', () => {
    expect(clickadillyApi.handleError).to.be.a('function')
  })
})
