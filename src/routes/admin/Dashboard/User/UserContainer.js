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

const GET_USER_REQUEST = '/admin/api/user'
const GET_USER_ACCOUNT_REQUEST = '/admin/api/accounts'

class UserContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: true,
      user: {},
      account: {},
      userEditModal: { visible: false },
      accountEditModal: { visible: false },
      keywordsEditModal: { visible: false },
      addressesEditModal: { visible: false },
      phonesEditModal: { visible: false },
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
    const id = this.props.params.id
    this.fetchUser(GET_USER_REQUEST, this.props.params)
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.user !== this.state.user) {
      const id =  nextState.user.accounts[0].id
      this.fetchAccount(id)
    }
  }

  fetchUser(path, params) {
    BlitzApi.get(path, params)
    .then( res => this.setState({
      user: res.data,
      account: {}
    }))
    .catch( error => console.log('error', error))
  }

  fetchAccount(id) {
    BlitzApi.get(`${GET_USER_ACCOUNT_REQUEST}/${id}`)
    .then( res => this.setState({
      isFetching: false,
      account: res.data
    }))
    .catch( error => console.log('error', error))
  }

  submitForm(data) {
    console.log('data', data)
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
          isFetching={this.state.isFetching}
          account={this.state.account}
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
          initialValues={this.state.addressesEditModal.value}
          show={this.state.addressesEditModal.visible}
          submitForm={this.submitForm}
          toggleModal={this.toggleModal}
          isFetching={this.state.isFetching}
        />
        <KeywordEditModal
          initialValues={this.state.keywordsEditModal.value}
          show={this.state.keywordsEditModal.visible}
          submitForm={this.submitForm}
          toggleModal={this.toggleModal}
          isFetching={this.state.isFetching}
        />
        <PhoneEditModal
          initialValues={this.state.phonesEditModal.value}
          show={this.state.phonesEditModal.visible}
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
