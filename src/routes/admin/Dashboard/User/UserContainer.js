import React from 'react';

import BlitzApi from 'services/BlitzApi';
import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_FLUID } from 'layouts/DefaultLayout/modules/layout';
import User from './components/User';
import {
  UserEditModal,
  AccountEditModal,
  AddressEditModal,
  KeywordEditModal,
  PhoneEditModal,
  ProfileEditModal
} from './components/EditModals';

const base_url = '/admin/api'

class UserContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: true,
      user: {},
      account: {},
      userEditModal: { visible: false },
      accountEditModal: { visible: false },
      keywordEditModal: { visible: false },
      addressEditModal: { visible: false },
      phoneEditModal: { visible: false },
      profileEditModal: { visible: false }
    }

    this.fetchUser = this.fetchUser.bind(this);
    this.fetchAccount = this.fetchAccount.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  getLayoutOptions() {
    return {
      contentView: CONTENT_VIEW_FLUID,
      sidebarEnabled: true,
      navbarEnabled: true,
      footerEnabled: true,
      headerEnabled: false
    }
  }

  componentWillMount() {
    this.fetchUser()
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.user !== this.state.user) {
      const id = this.state.currentAccountId ? this.state.currentAccountId : nextState.accounts[0].id
      this.fetchAccount(id)
    }
  }

  fetchUser() {
    BlitzApi.get(`${base_url}/user`, this.props.params)
    .then( res => this.setState({
      user: this.setUser(res.data),
      transactions: res.data.transactions,
      subscriptions: res.data.subscriptions,
      accounts: res.data.accounts,
      account: {}
    }))
    .catch( error => console.log('error', error))
  }

  setUser(user) {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      created_at: user.created_at,
      authNet_id: user.authnet_id
    }
  }

  fetchAccount(id) {
    BlitzApi.get(`${base_url}/accounts/${id}`)
    .then( res => this.setState({
      isFetching: false,
      account: res.data,
      currentAccountId: res.data.id
    }))
    .catch( error => console.log('error', error))
  }

  submitForm(data, selector) {
    const payload = { [selector] : data }
    const resource = selector !== 'address' ? `${selector}s` : `${selector}es`

    BlitzApi.patch(`${base_url}/${resource}/${data.id}`, payload)
    .then( res =>
          this.fetchUser(),
          this.toggleModal(selector, false)
         )
  }

  toggleModal(modalName, visible, value={}) {
    this.setState({
      [`${modalName}EditModal`]: { visible, value }
    });
  }

  getUserValues() {
    const { first_name, last_name, email, id } = this.state.user
    return {first_name, last_name, email, id }
  }

  getAccountValues() {
    const { first_name, last_name, email, id } = this.state.account
    return {first_name, last_name, email, id }
  }

  render() {
    return (
      <div>
        <User
          user={this.state.user}
          accounts={this.state.accounts}
          account={this.state.account}
          transactions={this.state.transactions}
          subscriptions={this.state.subscriptions}
          isFetching={this.state.isFetching}
          fetchAccount={this.fetchAccount}
          toggleModal={this.toggleModal}
        />
        <UserEditModal
          initialValues={this.getUserValues()}
          show={this.state.userEditModal.visible}
          submitForm={this.submitForm}
          toggleModal={this.toggleModal}
          isFetching={this.state.isFetching}
        />
        <AccountEditModal
          initialValues={this.getAccountValues()}
          show={this.state.accountEditModal.visible}
          submitForm={this.submitForm}
          toggleModal={this.toggleModal}
          isFetching={this.state.isFetching}
        />
        <AddressEditModal
          initialValues={this.state.addressEditModal.value}
          show={this.state.addressEditModal.visible}
          submitForm={this.submitForm}
          toggleModal={this.toggleModal}
          isFetching={this.state.isFetching}
        />
        <KeywordEditModal
          initialValues={this.state.keywordEditModal.value}
          show={this.state.keywordEditModal.visible}
          submitForm={this.submitForm}
          toggleModal={this.toggleModal}
          isFetching={this.state.isFetching}
        />
        <PhoneEditModal
          initialValues={this.state.phoneEditModal.value}
          show={this.state.phoneEditModal.visible}
          submitForm={this.submitForm}
          toggleModal={this.toggleModal}
          isFetching={this.state.isFetching}
        />
        <ProfileEditModal
          initialValues={this.state.profileEditModal.value}
          show={this.state.profileEditModal.visible}
          submitForm={this.submitForm}
          toggleModal={this.toggleModal}
          isFetching={this.state.isFetching}
        />
    </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users,
  form: state.form
})

export default connect(mapStateToProps)(UserContainer);
