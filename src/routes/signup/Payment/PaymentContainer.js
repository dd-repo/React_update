import PropTypes from 'prop-types';
import React from 'react'
import ReactGA from 'react-ga'
import { RoutedComponent, connect } from 'routes/routedComponent'

import Payment from './components/Payment'
import {
  postPayment,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
  deletePaymentErrorMessage
} from './modules/payment'
import { showModal, hideModal } from 'modules/modal'
import { buildCreditCardParams } from 'utils/paramsHelper'
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout'
import RootModal from 'components/Modals'

class PaymentContainer extends RoutedComponent {
  constructor () {
    super()
    this.state = {}

    this.submitForm = this.submitForm.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  getLayoutOptions () {
    return {
      contentView: CONTENT_VIEW_STATIC,
      sidebarEnabled: false,
      navbarEnabled: true,
      footerEnabled: true,
      headerEnabled: false
    }
  }

  componentWillMount () {
    this.props.currentUser.role !== 'prospect' &&
      this.context.router.push('/signup')
  }

  submitForm (formProps) {
    this.props.deletePaymentErrorMessage()
    let params = buildCreditCardParams(formProps, this.props.currentUser.id)
    this.props.postPayment(params)
    .then(res => { this.doNext(res) })
    .catch(error => { console.log('error payment', error) })
  }

  doNext (res) {
    switch (res.type) {
      case PAYMENT_SUCCESS:
        ReactGA.ga('send', 'event', 'Form Interaction', 'Subscribe', 'Individual 39', 39)
        this.props.showModal('PAYMENT_SUCCESS')
        break
      case PAYMENT_FAILURE:
        this.scrollTop()
        break
      default:
        return null
    }
  }

  handleClick () {
    this.props.hideModal()
    this.props.keywords.all > 0
      ? this.context.router.push('/dashboard')
      : this.context.router.push('/keywords')
  }

  scrollTop () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div>
        <Payment
          submitForm={this.submitForm}
          errorMessage={this.props.payment.errorMessage}
          showModal={this.props.showModal}
          isFetching={this.props.payment.isFetching}
          planPrice='19'
        />
        <RootModal
          handleClick={this.handleClick}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  errorMessage: state.errorMessage,
  planSelection: state.planSelection,
  keywords: state.account.keywords,
  payment: state.payment
})

const mapActionCreators = {
  showModal,
  hideModal,
  deletePaymentErrorMessage,
  postPayment
}

export default connect(mapStateToProps, mapActionCreators)(PaymentContainer)
