import React from 'react'
import infosweepApi from 'services/infosweepApi'
import { reset } from 'redux-form'

import { RoutedComponent, connect } from 'routes/routedComponent'
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout'
import {
  getSubscription,
  SUBSCRIPTION_CANCEL_SUCCESS,
  cancelSubscription
} from './modules/subscription'
import { fetchAddresses } from './modules/addresses'
import { fetchPhones } from './modules/phones'
import { fetchTransactions } from './modules/transactions'
import { updateKeyword } from './modules/keywords'
import { showModal, hideModal } from 'modules/modal'
import { updatePassword } from 'routes/auth/modules/auth'
import { clearFlashMessage } from './modules/flashMessage'
import Keywords from './components/Keywords'
import BillingInfo from './components/BillingInfo'
import ProfileDetails from './components/ProfileDetails'
import PasswordUpdateForm from './components/PasswordUpdate'
import Transactions from './components/Transactions'
import RootModal from 'components/Modals'
import { Row, Col, FlashMessage } from 'components'

class AccountContainer extends RoutedComponent {
  constructor (props) {
    super(props)
    this.state = { isFetching: true, showModal: false }

    this.cancelSubscription = this.cancelSubscription.bind(this)
  }

  getLayoutOptions () {
    return {
      contentView: CONTENT_VIEW_STATIC,
      sidebarEnabled: true,
      navbarEnabled: true,
      footerEnabled: true,
      headerEnabled: true
    }
  }

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  componentWillMount () {
    this.clearMessage()
    this.fetchAccountData()
    .then(res => this.handleSuccess(res))
  }

  componentWillReceiveProps (nextProps) {
    nextProps.flashMessage.message && window.scrollTo(0, 0)
  }

  handleSuccess (res) {
    this.setState({ isFetching: false })
  }

  resetForm () {
    this.context.store.dispatch(reset('updatePasswordForm'))
  }

  fetchAccountData = () => {
    const accountId = this.props.user.account_id
    const subscriberId = this.props.user.id
    return Promise.all([
      this.props.fetchAddresses(accountId),
      this.props.getSubscription(),
      this.props.fetchPhones(accountId),
      this.props.fetchTransactions(subscriberId)
    ])
  }

  passwordsMatch () {
    const {
      password,
      passwordConfirmation
    } = this.props.form.updatePasswordForm.values
    return password === passwordConfirmation
  }

  handlePasswordUpdate = (formData) => {
    if (this.passwordsMatch()) {
      this.resetForm()
      this.setState({passwordErrorMsg: null})
      this.props.updatePassword(formData.password)
    } else {
      this.setState({passwordErrorMsg: 'Passwords do not match'})
    }
  }

  cancelSubscription () {
    this.props.hideModal()
    const id = this.props.subscription.id
    this.props.cancelSubscription(id)
    .then(res => this.doNext(res))
  }

  handleCancelSubscription = () => {
    this.props.showModal('CANCEL_SUBSCRIPTION', {}, this.cancelSubscription)
  }

  handleKeywordEdit = keyword => {
    this.props.updateKeyword(keyword, this.props.user.account_id)
    this.props.hideModal()
  }

  clearMessage = () => {
    this.props.clearFlashMessage()
  }

  doNext = res => {
    switch (res.type) {
    case SUBSCRIPTION_CANCEL_SUCCESS:
      this.props.showModal('CANCELED_SUBSCRIPTION', res.subscription)
      break
    default:
      return
    }
  }

  render () {
    return (
      <Row>
        <FlashMessage
          flashMessage={this.props.flashMessage}
          clearMessage={this.clearMessage}
        />
        <Col lg={4}>
          <ProfileDetails
            profile={this.props.profile}
            account={this.props.account}
            address={this.props.addresses[0]}
            phone={this.props.phones[0]}
          />
          <PasswordUpdateForm
            disableButton={this.props.disableButton}
            onSubmit={this.handlePasswordUpdate}
            passwordErrorMsg={this.state.passwordErrorMsg}
          />
        </Col>
        <Col lg={8}>
          <Keywords
            keywords={this.props.keywords.all}
            showModal={this.props.showModal}
            handleKeywordEdit={this.handleKeywordEdit}
          />
          <BillingInfo
            subscription={this.props.subscription}
            handleCancelSubscription={this.handleCancelSubscription}

          />
          <Transactions
            subscription={this.props.subscription}
            transactions={this.props.transactions}
          />
        </Col>
        <RootModal />
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  form: state.form,
  subscription: state.account.subscription,
  user: state.currentUser,
  account: state.accounts.find(account => (account.id === state.currentUser.account_id)),
  keywords: state.account.keywords,
  phones: state.account.phones,
  addresses: state.account.addresses,
  profile: state.account.profile,
  transactions: state.account.transactions,
  flashMessage: state.account.flashMessage,
  accounts: state.accounts
})

const mapActionCreators = {
  getSubscription,
  cancelSubscription,
  fetchPhones,
  fetchTransactions,
  fetchAddresses,
  updateKeyword,
  updatePassword,
  clearFlashMessage,
  showModal,
  hideModal
}

export default connect(mapStateToProps, mapActionCreators)(AccountContainer)
