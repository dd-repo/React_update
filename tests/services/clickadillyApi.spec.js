import axios from 'axios';
import moxios from 'moxios';
import httpAdapter from 'axios/lib/adapters/http'

import infosweepApi from 'services/infosweepApi';
import BASE_URL from 'consts/baseUrl';
import {
  SIGNUP_REQUEST,
  LOGIN_REQUEST
} from 'routes/auth/modules/auth';

describe('infosweepApi', () => {

  it('GET Should be a function', () => {
    expect(infosweepApi.get).to.be.a('function')
  })

  it('PATCH Should be a function', () => {
    expect(infosweepApi.patch).to.be.a('function')
  })

  it('POST Should be a function', () => {
    expect(infosweepApi.post).to.be.a('function')
  })

  it('handleSuccess Should be a function', () => {
    expect(infosweepApi.handleSuccess).to.be.a('function')
  })

  it('handleError Should be a function', () => {
    expect(infosweepApi.handleError).to.be.a('function')
  })
})
