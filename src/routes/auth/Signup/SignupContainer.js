import React from 'react';
import Signup from './components/Signup';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import { persistData } from 'localStorage';
import { postPayment, PAYMENT_SUCCESS, deletePaymentErrorMessage } from 'routes/signup/Payment/modules/payment';
import { showModal, hideModal } from 'modules/modal';
import {
  postUserSignup,
  removeErrorMessage,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE
} from '../modules/auth';
import RootModal from 'components/Modals';

const persistDataToLocalStorage = data => {
  const { auth_token } = data

  persistData(auth_token, 'authToken');
}

class SignupContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {disableButton: true}

    this.submitForm = this.submitForm.bind(this);
    this.submitPaymentForm = this.submitPaymentForm.bind(this);
    this.showPaymentModal = this.showPaymentModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.doNext = this.doNext.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  getLayoutOptions() {
    return {
      contentView: CONTENT_VIEW_STATIC,
      sidebarEnabled: false,
      navbarEnabled: true,
      footerEnabled: true,
      headerEnabled: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { signupForm } = nextProps.form
    if(signupForm && signupForm.values) {
      this.validatePassword(signupForm.values)
    }
    if(nextProps.currentUser.role === 'prospect') {
      this.showPaymentModal()
    }
  }

  componentWillUnmount() {
    this.props.hideModal()
  }

  validatePassword({ password, passwordConfirmation }) {
    if(password && passwordConfirmation) {
      password === passwordConfirmation &&
        this.setState({disableButton: false, passwordMatchSuccess: 'Passwords Match!'})

      let letter = passwordConfirmation.charAt(passwordConfirmation.length-1)
      let index = passwordConfirmation.indexOf(letter)

      letter !== password.charAt(index)
        ?
          this.setState({disableButton: true, passwordErrorMsg: 'Passwords Do Not Match'})
            :
              this.setState({passwordErrorMsg: null})
    }
  }

  showPaymentModal() {
    this.props.showModal('PAYMENT')
  }

  buildParams(user) {
    return {
      user: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        phone_number: user.phoneNumber,
        password: user.password,
        phone_type: 'mobile',
        plan: 'individual',
      }
    }
  }

  buildPaymentParams(values) {
    return {
      user: this.props.currentUser.id,
      card_holder_name: values.fullName,
      card_number: this.sanitizeNums(values.creditCardNumber),
      card_month: values.expirationMonth.value,
      card_year: values.expirationYear.value,
      card_cvc: values.cvCode,
      address: values.address,
      city: values.city,
      state: values.state.value,
      zip: values.zipcode,
      plan: 'individual'
    }
  }

  sanitizeNums(value) {
    return value.replace(/[^\d]/gi, '')
  }

  toLowerCase(name) {
    return name.toLowerCase()
  }

  submitForm(user) {
    const payload = this.buildParams(user)
    this.props.postUserSignup(payload)
    .then(res => { this.doNext(res) })
    .catch(error => { console.log('error user signup', error) })
  }



  submitPaymentForm(formProps) {
    this.props.deletePaymentErrorMessage()
    let params = this.buildPaymentParams(formProps)
    this.props.postPayment(params)
  }

  handleClick() {
    this.context.router.push('/keywords')
  }

  doNext(res) {
    switch(res.type) {
      case USER_SIGNUP_SUCCESS:
        persistDataToLocalStorage(res.data)
        this.props.removeErrorMessage()
        break;
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        <Signup
          submitForm={this.submitForm}
          errorMessage={this.props.currentUser.errorMessage}
          passwordErrorMsg={this.state.passwordErrorMsg}
          disableButton={this.state.disableButton}
        />
        <RootModal
          enforceFocus={true}
          submitForm={this.submitPaymentForm}
          errorMessage={this.props.payment.errorMessage}
          paymentSuccess={this.props.payment.success}
          isFetching={this.props.payment.isFetching}
          planType='Individual'
          planPrice='39'
          handleClick={this.handleClick}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  payment: state.payment,
  form: state.form
})

const mapActionCreators = {
  postUserSignup,
  removeErrorMessage,
  postPayment,
  deletePaymentErrorMessage,
  showModal,
  hideModal
}

export default connect(mapStateToProps, mapActionCreators)(SignupContainer);
