import React from 'react';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_FLUID } from 'layouts/DefaultLayout/modules/layout';
import {
  showModal,
  hideModal
} from 'modules/modal';
import User from './components/User';
import { fetchUser } from './modules/user';
import { fetchAccount } from './modules/account';
import { fetchCards } from './modules/cards';
import { resetUserPassword } from 'routes/auth/modules/auth';
import { formatDate } from 'utils/dateHelper';
import { normalizePhone } from 'utils/formHelpers';
import { clearNotification } from './modules/notifications';


class UserContainer extends RoutedComponent {
  constructor(props) {
    super(props)

    this.fetchAccount = this.fetchAccount.bind(this);
    this.handlePasswordReset = this.handlePasswordReset.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
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

  componentWillReceiveProps(nextProps) {
    if(nextProps.user.notifications !== this.props.user.notifications) {
      window.scrollTo(0,0)
    }
  }

  componentWillMount() {
    this.props.fetchUser(this.props.params)
    .then( res => this.fetchAccountAndCards(res.data))
  }

  fetchAccountAndCards(user) {
    this.props.fetchAccount(user.accounts[0].id)
    this.props.fetchCards(user.id)
  }

  fetchAccount(id) {
    this.props.fetchAccount(id)
  }

  handleHideModal() {
    this.props.hideModal()
  }

  handlePasswordReset() {
    const payload = { email: this.state.user.email }
    this.props.resetUserPassword(payload)
    this.setSuccessMessage('Email Sent')
  }

  render() {

    const formatPhone = value => {
      if(value) {
        value.phone_number = normalizePhone(value.phone_number)
      }
      return value
    }

    return (
        <User
          user={this.props.user}
          isFetching={this.props.isFetching}
          fetchAccount={this.fetchAccount}
          showModal={this.props.showModal}
          handlePasswordReset={this.handlePasswordReset}
          clearMessage={this.props.clearNotification}
          notification={this.props.user.notifications}
          hideModal={this.handleHideModal}
        />
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isFetching: state.user.details.isFetching
})

const mapActionCreators = {
  resetUserPassword,
  fetchUser,
  fetchAccount,
  fetchCards,
  showModal,
  hideModal,
  clearNotification
}
export default connect(mapStateToProps, mapActionCreators)(UserContainer);
