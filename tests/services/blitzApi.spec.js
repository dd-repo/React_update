import axios from 'axios';
import moxios from 'moxios';
import httpAdapter from 'axios/lib/adapters/http'

import BlitzApi from 'services/BlitzApi';
import BASE_URL from 'consts/baseUrl';
import {
  SIGNUP_REQUEST,
  LOGIN_REQUEST
} from 'routes/auth/modules/auth';

describe('BlitzApi', () => {

  it('GET Should be a function', () => {
    expect(BlitzApi.get).to.be.a('function')
  })

  it('PATCH Should be a function', () => {
    expect(BlitzApi.patch).to.be.a('function')
  })

  it('POST Should be a function', () => {
    expect(BlitzApi.post).to.be.a('function')
  })

  it('handleSuccess Should be a function', () => {
    expect(BlitzApi.handleSuccess).to.be.a('function')
  })

  it('handleError Should be a function', () => {
    expect(BlitzApi.handleError).to.be.a('function')
  })

  //describe('POST user signup', () => {

    //beforeEach(() => {
      //moxios.install()
    //})

    //afterEach(() => {
      //moxios.uninstall()
    //})

    //it('Should return successful response', (done) => {

      //const payload = {
        //user:
          //{
            //first_name: 'Fred',
            //last_name: 'Flintstone',
            //email: 'fred@email.com',
            //password: 'password'
          //}
      //}
      //moxios.withMock(() => {
        //let onFulfilled = sinon.spy()
        //BlitzApi.post(SIGNUP_REQUEST, payload).then(onFulfilled).catch(error => console.log('errror', error))

        //moxios.wait(() => {
          //let request = moxios.requests.mostRecent();
          //request.respondWith({
            //status: 200,
            //response: { id: 1, first_name: 'Fred', lastName: 'Flintstone' },
          //}).then(() => {
            //expect(onFulfilled.called).to.be.true
            //done();
          //});
        //});
      //})
    //})
  //})
})
