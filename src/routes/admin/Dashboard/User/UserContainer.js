import React from 'react';

import BlitzApi from 'services/BlitzApi';
import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_FLUID } from 'layouts/DefaultLayout/modules/layout';
import { resetUserPassword } from 'routes/auth/modules/auth';
import User from './components/User';
import {
  EditUserModal,
  EditAccountModal,
  EditAddressModal,
  EditKeywordModal,
  EditPhoneModal,
  EditProfileModal,
  NewKeywordModal,
  NewCardModal
} from './components/Modals';
import capitalize from 'utils/capitalize';
import { normalizePhone } from 'utils/formHelpers';

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
      profileEditModal: { visible: false },
      newKeywordModal: { visible: false },
      newCardModal: { visible: false }
    }

    this.fetchUser = this.fetchUser.bind(this);
    this.fetchAccount = this.fetchAccount.bind(this);
    this.fetchCards = this.fetchCards.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
    this.submitNew = this.submitNew.bind(this);
    this.handlePasswordReset = this.handlePasswordReset.bind(this);
    this.clearErrorMessage = this.clearErrorMessage.bind(this);
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
      const userId = nextState.user.id
      const accountId = this.state.currentAccountId ? this.state.currentAccountId : nextState.accounts[0].id
      this.fetchCards(userId)
      this.fetchAccount(accountId)
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
    .catch( error => console.log('fetching user', error))
  }

  fetchAccount(id) {
    BlitzApi.get(`${base_url}/accounts/${id}`)
    .then( res => this.setState({
      isFetching: false,
      account: res.data,
      currentAccountId: res.data.id
    }))
    .catch( error => console.log('fetching account', error))
  }

  fetchCards(id) {
    const params = { q: { user_id_eq: id }}

    BlitzApi.get(`${base_url}/cards/search`, params)
    .then( res => this.setState({ cards: res.data.cards }))
    .catch( error => console.log('fetching cards', error.data))
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

  submitForm(data, selector, verb) {
    const resource = selector !== 'address' ? `${selector}s` : `${selector}es`

    verb === 'patch' ?
      this.submitUpdate(data, resource, selector)
           :
             this.submitNew(data, resource, selector)

  }

  submitUpdate(data, resource, selector) {
    const payload = { [selector] : data }

    BlitzApi.patch(`${base_url}/${resource}/${data.id}`, payload)
    .then(
          res =>
          this.fetchUser(),
          this.toggleModal(`${selector}EditModal`, false)
         )
         .catch( error => this.setState({errorMessage: error.response.data.errorMessage}),
                console.log('submitUpdate error', error.response.data.errorMessage))
  }

  sanitizeNums(value) {
    return value.replace(/[^\d]/gi, '')
  }

  buildParams(data) {
    return {
      user_id: this.state.user.id,
      card_holder_name: data.fullName,
      card_number: this.sanitizeNums(data.creditCardNumber),
      card_month: data.expirationDate.slice(0,2),
      card_year: data.expirationDate.slice(3),
      card_cvc: data.cvCode,
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zipcode,
    }
  }

  submitNew(data, resource, selector) {
    let payload;
    if(selector === 'card') {
      payload = this.buildParams(data)
    } else {
      payload = data['account_id'] = this.state.account.id
    }
    BlitzApi.post(`${base_url}/${resource}`, payload)
    .then( res =>
          this.fetchUser(),
          this.toggleModal(`new${capitalize(selector)}Modal`, false)
         )
         .catch( error => this.setState({errorMessage: error.response.data.errorMessage}))
  }

  toggleModal(selector, visible, value={}) {
    this.setState({
      [selector]: { visible, value }
    });
  }

  handlePasswordReset() {
    const payload = { email: this.state.user.email }
    this.props.resetUserPassword(payload)
  }

  getUserValues() {
    const { first_name, last_name, email, id } = this.state.user
    return {first_name, last_name, email, id }
  }

  getAccountValues() {
    const { first_name, last_name, email, id } = this.state.account
    return {first_name, last_name, email, id }
  }

  clearErrorMessage() {
    this.setState({errorMessage: null})
  }

  render() {
    const formatPhone = value => {
      if(value) {
        value.phone_number = normalizePhone(value.phone_number)
      }
      return value
    }
    return (
      <div>
        <User
          user={this.state.user}
          accounts={this.state.accounts}
          account={this.state.account}
          transactions={this.state.transactions}
          subscriptions={this.state.subscriptions}
          cards={this.state.cards}
          isFetching={this.state.isFetching}
          fetchAccount={this.fetchAccount}
          toggleModal={this.toggleModal}
          handlePasswordReset={this.handlePasswordReset}
          errorMessage={this.state.errorMessage}
          clearErrorMessage={this.clearErrorMessage}
        />
        <EditUserModal
          initialValues={this.getUserValues()}
          show={this.state.userEditModal.visible}
          submitForm={this.submitForm}
          toggleModal={this.toggleModal}
          isFetching={this.state.isFetching}
        />
        <EditAccountModal
          initialValues={this.getAccountValues()}
          show={this.state.accountEditModal.visible}
          submitForm={this.submitForm}
          toggleModal={this.toggleModal}
          isFetching={this.state.isFetching}
        />
        <EditAddressModal
          initialValues={this.state.addressEditModal.value}
          show={this.state.addressEditModal.visible}
          submitForm={this.submitForm}
          toggleModal={this.toggleModal}
          isFetching={this.state.isFetching}
        />
        <EditKeywordModal
          initialValues={this.state.keywordEditModal.value}
          show={this.state.keywordEditModal.visible}
          submitForm={this.submitForm}
          toggleModal={this.toggleModal}
          isFetching={this.state.isFetching}
        />
        <EditPhoneModal
          initialValues={formatPhone(this.state.phoneEditModal.value)}
          show={this.state.phoneEditModal.visible}
          submitForm={this.submitForm}
          toggleModal={this.toggleModal}
          isFetching={this.state.isFetching}
        />
        <EditProfileModal
          initialValues={this.state.profileEditModal.value}
          show={this.state.profileEditModal.visible}
          submitForm={this.submitForm}
          toggleModal={this.toggleModal}
          isFetching={this.state.isFetching}
        />
        <NewKeywordModal
          show={this.state.newKeywordModal.visible}
          toggleModal={this.toggleModal}
          submitForm={this.submitForm}
        />
        <NewCardModal
          show={this.state.newCardModal.visible}
          toggleModal={this.toggleModal}
          submitForm={this.submitForm}
        />
    </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapActionCreators = {
  resetUserPassword
}
export default connect(mapStateToProps, mapActionCreators)(UserContainer);
