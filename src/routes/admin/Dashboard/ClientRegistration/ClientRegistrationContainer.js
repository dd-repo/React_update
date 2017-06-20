import React from 'react';
import ClientRegistration from './components/ClientRegistration';
import { reset } from 'redux-form';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import BlitzApi from 'services/BlitzApi';

const CLIENT_SIGNUP_REQUEST = '/admin/api/signup';

class ClientRegistrationContainer extends RoutedComponent {
  constructor(props) {
    super(props)

    this.state = {isFetching: false}

    this.submitForm = this.submitForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleFailure = this.handleFailure.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired
  }

  getLayoutOptions() {
    return {
      contentView: CONTENT_VIEW_STATIC,
      sidebarEnabled: true,
      navbarEnabled: true,
      footerEnabled: true,
      headerEnabled: false
    }
  }

  sanitizeNums(value) {
    return value.replace(/[^\d]/gi, '')
  }

  fullName(first, last) {
    return `${first} ${last}`
  }

  buildParams(user) {
    return {
      signup: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        phone_number: user.phoneNumber,
        phone_type: 'home',
        authnet_id: user.authnetId,
        plan: user.plan.toLowerCase(),
        card_holder_name: user.fullName,
        card_number: this.sanitizeNums(user.creditCardNumber),
        card_month: user.expirationDate.slice(0,2),
        card_year: user.expirationDate.slice(3),
        card_cvc: user.cvCode,
        address: user.address,
        city: user.city,
        state: user.state,
        zip: user.zipcode,
        kw_first_name: user.kwFirstName,
        kw_last_name: user.kwLastName,
        kw_address: user.kwAddress,
        kw_city: user.kwCity,
        kw_state: user.kwState,
        kw_zip: user.kwZipcode,
        kw_country: 'US',
        dob: user.dob
      }
    }
  }

  submitForm(user) {
    const payload = this.buildParams(user)
    this.setState({isFetching: true})
    BlitzApi.post(CLIENT_SIGNUP_REQUEST, payload)
    .then(res => { this.handleSuccess() })
    .catch(error => { this.handleFailure(error) })
  }

  handleSuccess() {
    this.setState({
      isFetching: false,
      notification: {
        message: 'Client was successfully created',
        status: 'success'
      }
    })
    this.resetForm();
    setTimeout(() => {
      this.setState({notification: null});
    }, 5000)
  }

  handleFailure(error) {
    this.setState({isFetching: false})
    this.setState({
      notification:
        {
          message: error.response.data.message,
          status: 'danger'
        }})
  }

  resetForm() {
    this.context.store.dispatch(reset('ClientRegistrationForm'));
  }

  render() {
    return (
      <ClientRegistration
        submitForm={this.submitForm}
        isFetching={this.state.isFetching}
        notification={this.state.notification}
      />
    )
  }
}

const mapStateToProps = state => ({
  form: state.form
})

const mapActionCreators = {
  reset
}

export default connect(mapStateToProps, mapActionCreators)(ClientRegistrationContainer);
