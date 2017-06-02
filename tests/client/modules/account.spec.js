import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import BlitzApi from 'services/BlitzApi';
import BASE_URL from 'consts/baseUrl';
import {
  SUBSCRIPTION_PENDING,
  SUBSCRIPTION_SUCCESS,
  SUBSCRIPTION_FAILURE,
  SUBSCRIPTION_CANCEL_PENDING,
  SUBSCRIPTION_CANCEL_SUCCESS,
  SUBSCRIPTION_CANCEL_FAILURE,
  SUBSCRIPTION_REQUEST,
  PASSWORD_UPDATE_REQUEST,
  getSubscription,
  subscriptionSuccess,
  default as reducer,
} from 'routes/client/Dashboard/AccountEdit/modules/subscription';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe( '(subscription module) subscriptions', () => {

  it('Should export a constant.', () => {
    expect(SUBSCRIPTION_PENDING).to.equal('SUBSCRIPTION_PENDING')
    expect(SUBSCRIPTION_SUCCESS).to.equal('SUBSCRIPTION_SUCCESS')
    expect(SUBSCRIPTION_FAILURE).to.equal('SUBSCRIPTION_FAILURE')
    expect(SUBSCRIPTION_CANCEL_PENDING).to.equal('SUBSCRIPTION_CANCEL_PENDING')
    expect(SUBSCRIPTION_CANCEL_SUCCESS).to.equal('SUBSCRIPTION_CANCEL_SUCCESS')
    expect(SUBSCRIPTION_CANCEL_FAILURE).to.equal('SUBSCRIPTION_CANCEL_FAILURE')
    expect(SUBSCRIPTION_REQUEST).to.equal('SUBSCRIPTION_REQUEST')
  })
})

