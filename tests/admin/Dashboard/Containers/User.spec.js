import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import UserContainer from 'routes/admin/Dashboard/User/UserContainer'
import User from 'routes/admin/Dashboard/User/components/User';
import Payment from 'routes/client/Payment';
import UserDetails from 'routes/admin/Dashboard/User/components/UserDetails';
import {
  EditUserModal,
  EditAccountModal,
  EditAddressModal,
  EditKeywordModal,
  EditPhoneModal,
  EditProfileModal,
  NewKeywordModal,
  NewCardModal
} from 'routes/admin/Dashboard/User/components/Modals';


describe.only('<UserContainer/>', () => {
  const initialState = {}
  const mockStore = configureMockStore()
  let store, container

  beforeEach(() => {
    store = mockStore(initialState)
    container = mount(
      <Provider store={store}>
        <UserContainer location={{}}/>
      </Provider>
        )
  })

  it('renders UserContainer', () => {
    console.log('container', container.find(UserDetails).node)
  })
})
