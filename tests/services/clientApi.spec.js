import axios from 'axios';
import moxios from 'moxios';

import ClientApi from 'services/ClientApi';
import {
  SIGNUP_REQUEST,
  LOGIN_REQUEST
} from 'modules/auth';

describe('ClientApi', () => {

  it('GET Should be a function', () => {
    expect(ClientApi.get).to.be.a('function')
  })

  it('PATCH Should be a function', () => {
    expect(ClientApi.patch).to.be.a('function')
  })

  it('POST Should be a function', () => {
    expect(ClientApi.post).to.be.a('function')
  })

  it('handleSuccess Should be a function', () => {
    expect(ClientApi.handleSuccess).to.be.a('function')
  })

  it('handleError Should be a function', () => {
    expect(ClientApi.handleError).to.be.a('function')
  })

  describe('POST user signup', () => {

    beforeEach(() => {
      moxios.install()
    })

    afterEach(() => {
      moxios.uninstall()
    })

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
        //ClientApi.post(SIGNUP_REQUEST, payload) .then(onFulfilled)

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
  })
})
