import React from 'react'
import infosweepApi from 'services/infosweepApi'

import { RoutedComponent, connect } from 'routes/routedComponent'
import { CONTENT_VIEW_FLUID } from 'layouts/DefaultLayout/modules/layout'
import { showModal, hideModal } from 'modules/modal'
import Client from './components/Client'
import { fetchUser, updateUserStatus } from './modules/details'
import { fetchAccount } from './modules/account'
import { fetchCards } from './modules/cards'
import { resetUserPassword } from 'routes/auth/modules/auth'
import { clearNotification } from './modules/notifications'
import { submitKeyword } from 'routes/admin/Users/Client/modules/keywords'
import { USERS_REQUEST } from 'routes/admin/Users/modules/users'

class UserContainer extends RoutedComponent {
  constructor (props) {
    super(props)

    this.fetchAccount = this.fetchAccount.bind(this)
    this.handlePasswordReset = this.handlePasswordReset.bind(this)
    this.handleNewSubscription = this.handleNewSubscription.bind(this)
  }

  getLayoutOptions () {
    return {
      contentView: CONTENT_VIEW_FLUID,
      sidebarEnabled: true,
      navbarEnabled: true,
      footerEnabled: true,
      headerEnabled: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.client.notifications !== this.props.client.notifications) {
      window.scrollTo(0, 0)
    }
  }

  componentWillMount () {
    this.props.fetchUser(this.props.params)
    .then(res => this.fetchUserDetails(res.data))
  }

  componentWillUnmount () {
    this.props.clearNotification()
  }

  fetchUserDetails (client) {
    this.fetchAccount(client.accounts[0].id)
    this.props.fetchCards(client.id)
  }

  fetchAccount (id) {
    this.props.fetchAccount(id)
  }

  handlePasswordReset () {
    const payload = { email: this.props.client.details.email }
    this.props.resetUserPassword(payload)
  }

  handleNewSubscription () {
    this.props.showModal('CREATE_SUBSCRIPTION')
  }

  handleKeywordSubmit = keyword => {
    this.props.hideModal()
    this.props.submitKeyword(keyword, this.props.client.account.id)
  }

  render () {
    return (
      <Client
        client={this.props.client}
        isFetching={this.props.isFetching}
        fetchAccount={this.fetchAccount}
        showModal={this.props.showModal}
        handlePasswordReset={this.handlePasswordReset}
        clearMessage={this.props.clearNotification}
        notification={this.props.client.notifications}
        handleNewSubscription={this.handleNewSubscription}
        handleKeywordSubmit={this.handleKeywordSubmit}
        updateUserStatus={this.props.updateUserStatus}
      />
    )
  }
}

const mapStateToProps = state => ({
  client: state.client,
  isFetching: state.client.details.isFetching
})

const mapActionCreators = {
  resetUserPassword,
  fetchUser,
  fetchAccount,
  fetchCards,
  showModal,
  hideModal,
  submitKeyword,
  clearNotification,
  updateUserStatus
}
export default connect(mapStateToProps, mapActionCreators)(UserContainer)
