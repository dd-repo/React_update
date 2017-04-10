import React from 'react';

import Payment from './components/Payment';
import PaymentComplete from './components/paymentComplete';
import { RoutedComponent, connect } from 'routes/routedComponent';
import { postPayment } from 'modules/payment';
import { persistData } from 'localStorage';
import { PAYMENT_SUCCESS, PAYMENT_FAILURE } from 'modules/payment';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';

class PaymentContainer extends RoutedComponent {
  constructor() {
    super()
    this.state = {}

    this.submitForm = this.submitForm.bind(this);
    this.buildParams = this.buildParams.bind(this);
    this.doNext = this.doNext.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  getLayoutOptions() {
    return {
      contentView: CONTENT_VIEW_STATIC,
      sidebarEnabled: false,
      navbarEnabled: false,
      footerEnabled: false,
      headerEnabled: false
    }
  }

  sanitizeNums(value) {
    return value.replace(/[^\d]/gi, '')
  }

  fullName(first, last) {
    return `${first} ${last}`
  }

  toLowerCase(name) {
    return name.toLowerCase()
  }

  buildParams(values) {
    return {
      user: this.props.currentUser.id,
      card_holder_name: this.fullName(values.first_name, values.last_name),
      card_number: this.sanitizeNums(values.creditCardNumber),
      card_month: values.expirationDate.slice(0,2),
      card_year: values.expirationDate.slice(3),
      card_cvc: values.cvCode,
      plan: this.toLowerCase(this.props.planSelection.type),
    }
  }

  submitForm(formProps) {
    let authToken = this.props.currentUser.access_token
    let params = this.buildParams(formProps)

    persistData(formProps, 'paymentStatus');
    this.setState({isFetching: true})

    this.props.postPayment(params, authToken)
    .then(res => { this.doNext(res) })
    .catch(error => { console.log('error in payment submit', error) })
  }

  doNext(res) {
    switch(res.type) {
      case PAYMENT_SUCCESS:
        this.setState({ paymentSuccess: true, isFetching: false });
        persistData(res.user, 'currentUser');
        break;
      case PAYMENT_FAILURE:
        this.setState({ errorMessage: res.error.data.errorMessage, isFetching: false });
        break;
      default:
        return null
    }
  }

  render() {
    if(!this.state.paymentSuccess && this.props.currentUser.id) {
      return <Payment
        submitForm={this.submitForm}
        planType={this.props.planSelection.type}
        price={this.props.planSelection.price}
        errorMessage={this.state.errorMessage}
        isFetching={this.state.isFetching}
        />
    } else {
      return  <PaymentComplete
        router={this.context.router}
      />
    }
  }
}

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    errorMessage: state.errorMessage,
    planSelection: state.planSelection,
    payment: state.payment
})

const mapActionCreators = {
  postPayment
}

export default connect(mapStateToProps, mapActionCreators)(PaymentContainer);
