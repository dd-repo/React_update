import React from 'react';
import clickadillyApi from 'services/clickadillyApi';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_FLUID } from 'layouts/DefaultLayout/modules/layout';
import { showModal, hideModal } from 'modules/modal';
import User from './components/User';
import { fetchUser } from './modules/user';
import { fetchAccount } from './modules/account';
import { fetchCards } from './modules/cards';
import { resetUserPassword } from 'routes/auth/modules/auth';
import { formatDate } from 'utils';
import { normalizePhone } from 'utils/formHelpers';
import { clearNotification } from './modules/notifications';
import { USERS_REQUEST } from 'routes/admin/Dashboard/Users/modules/users';
import { submitKeyword } from 'routes/admin/Dashboard/User/modules/keywords';

class UserContainer extends RoutedComponent {
  constructor(props) {
    super(props)

    this.fetchAccount = this.fetchAccount.bind(this);
    this.handlePasswordReset = this.handlePasswordReset.bind(this);
    this.handleNewSubscription = this.handleNewSubscription.bind(this);
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

  handlePasswordReset() {
    const payload = { email: this.props.user.details.email }
    this.props.resetUserPassword(payload)
  }

  handleNewSubscription() {
    this.fetchAdmin()
    .then(
          res => {
            this.props.showModal(
              'CREATE_SUBSCRIPTION',
              res.data
            )}
    )
  }

  handleKeywordSubmit = keyword => {
    this.props.hideModal()
    this.props.submitKeyword(keyword, this.props.user.account.id)
  }

  fetchAdmin() {
    const params = {
      q: { group_eq: 'backend' }
    }
    return clickadillyApi.get(USERS_REQUEST, params)
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
          handleNewSubscription={this.handleNewSubscription}
          handleKeywordSubmit={this.handleKeywordSubmit}
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
  submitKeyword,
  clearNotification
}
export default connect(mapStateToProps, mapActionCreators)(UserContainer);
