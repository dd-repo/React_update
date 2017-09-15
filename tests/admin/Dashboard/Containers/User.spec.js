import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import clickadillyApi from 'services/clickadillyApi';

import UserContainer from 'routes/admin/Dashboard/Users/Client/UserContainer'
import User from 'routes/admin/Dashboard/Users/Client/components/Client';
import Payment from 'routes/signup/Payment';
import UserDetails from 'routes/admin/Dashboard/Users/Client/components/ClientDetails';

const response = {
  id:1,
  first_name: 'first',
  last_name: 'last',
  email: 'test@email.com',
  authnet_id: '12312312123123',
  created_at: '2017-07-06T07:46:00.553-07:00',
  accounts: [
    {
      created_at: "2017-07-06T07:46:00.622-07:00",
      email: "billyjoel@email.com",
      first_name: "Billy",
      id: 6,
      is_active: false,
      last_name: "Joel",
      updated_at: "2017-07-06T07:46:00.622-07:00",
      user_id: 6
    }
  ],
  subscriptions: [
    {
      cancel_date: null,
      client_name: "Billy Joel",
      created_at: "2017-07-06T07:46:34.454-07:00",
      end_date: "2027-07-06",
      id: 3,
      is_active: true,
      plan_description: "individual plan",
      plan_id: 2,
      sales_rep_name: " ",
      start_date: "2017-07-06",
      user_id: 6
    }
  ],
  transactions: [
    {
      amount: 39,
      card_card_holder_name: "billy joel",
      card_card_month: "2",
      card_card_year: "2020",
      card_last_4: "4242",
      card_source: "authnet",
      card_third_party_id: "1807004483",
      client_name: "Billy Joel",
      created_at: "2017-07-06T07:46:34.488-07:00",
      id: 3,
      processed_at: "2017-07-06",
      response: null,
      round: 1,
      sales_rep_email: null,
      sales_rep_name: " ",
      state: "completed",
      status: "completed",
      subscription_id: 3,
      third_party_id: "60026203574",
      type_of_deal: "new_deal",
      user_email: "billyjoel@email.com",
      user_first_name: "Billy",
      user_last_name: "Joel"
    }
  ],
  cards: [
    {
      card_holder_name: "billy joel",
      card_month: "2",
      card_year: "2020",
      created_at: "2017-07-06T07:46:34.403-07:00",
      id: 3,
      last_4: "4242",
      source: "authnet",
      third_party_id: "1807004483",
      updated_at: "2017-07-06T07:46:34.403-07:00"
    }
  ]
}

const user = {
    id:1,
    first_name: 'first',
    last_name: 'last',
    email: 'test@email.com',
    authnet_id: '12312312123123',
    created_at: '2017-07-06T07:46:00.553-07:00'
}

const accounts = [
  {
    created_at: "2017-07-06T07:46:00.622-07:00",
    email: "billyjoel@email.com",
    first_name: "Billy",
    id: 6,
    is_active: false,
    last_name: "Joel",
    updated_at: "2017-07-06T07:46:00.622-07:00",
    user_id: 6
  }
]

const subscriptions = [
  {
    cancel_date: null,
    client_name: "Billy Joel",
    created_at: "2017-07-06T07:46:34.454-07:00",
    end_date: "2027-07-06",
    id: 3,
    is_active: true,
    plan_description: "individual plan",
    plan_id: 2,
    sales_rep_name: " ",
    start_date: "2017-07-06",
    user_id: 6
  }
]

const transactions = [
  {
    amount: 39,
    card_card_holder_name: "billy joel",
    card_card_month: "2",
    card_card_year: "2020",
    card_last_4: "4242",
    card_source: "authnet",
    card_third_party_id: "1807004483",
    client_name: "Billy Joel",
    created_at: "2017-07-06T07:46:34.488-07:00",
    id: 3,
    processed_at: "2017-07-06",
    response: null,
    round: 1,
    sales_rep_email: null,
    sales_rep_name: " ",
    state: "completed",
    status: "completed",
    subscription_id: 3,
    third_party_id: "60026203574",
    type_of_deal: "new_deal",
    user_email: "billyjoel@email.com",
    user_first_name: "Billy",
    user_last_name: "Joel"
  }
]

const cards = [
  {
    card_holder_name: "billy joel",
    card_month: "2",
    card_year: "2020",
    created_at: "2017-07-06T07:46:34.403-07:00",
    id: 3,
    last_4: "4242",
    source: "authnet",
    third_party_id: "1807004483",
    updated_at: "2017-07-06T07:46:34.403-07:00"
  }
]

//describe('<UserContainer/>', () => {
  //const initialState = {}
  //const mockStore = configureMockStore()
  //let store, container, Api
  //const resolvedUser = new Promise((r) => r({ data: response}));

  //beforeEach(() => {
    //Api = sinon.stub(BlitzApi, 'get')
    //Api.returns(resolvedUser)
    //store = mockStore(initialState)
    //container = mount(
      //<Provider store={store}>
        //<UserContainer location={{}}/>
      //</Provider>
        //)
  //})

  //afterEach(() => {
    //Api.restore()
  //})

  //it('renders <Loader/> by default', () => {
    //const userDetails = container.find('UserDetails')
    //const loader = container.find('Loader')

    //expect(container.length).to.eq(1)
    //expect(loader.length).to.eq(1)
    //expect(userDetails.length).to.eq(0)
    ////console.log('user', container.find('User').node.props)
  //})

  //it('renders the <UserDetails /> when loaded', () => {
    //const loader = container.find('Loader')
    //const userDetails = container.find('UserDetails')

    ////console.log('container', container)

    //expect(loader.length).to.eq(1)
    //expect(userDetails.length).to.eq(0)
  //})
//})
