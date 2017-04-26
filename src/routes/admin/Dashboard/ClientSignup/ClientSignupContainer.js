import React from 'react';
import ClientSignup from './components/ClientSignup';
import { reset } from 'redux-form';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import BlitzApi from 'services/BlitzApi';

const CLIENT_SIGNUP_REQUEST = '/admin/api/signup';

class ClientSignupContainer extends RoutedComponent {
  constructor(props) {
    super(props)

    this.state = {
      //notification:
        //{
          //message: 'Client was successfully created',
          //status: 'success'
        //}
    }

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
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        phone_type: 'home',
        plan: user.plan.toLowerCase(),
        card_holder_name: this.fullName(user.cc_first_name, user.cc_last_name),
        card_number: this.sanitizeNums(user.creditCardNumber),
        card_month: user.expirationDate.slice(0,2),
        card_year: user.expirationDate.slice(3),
        card_cvc: user.cvCode,
        address: user.address,
        city: user.city,
        state: user.state,
        zip: user.zipcode,
        country: 'US',
        dob: user.dob
      }
    }
  }

  submitForm(user) {
    const payload = this.buildParams(user)
    this.setState({isFetching: true})
    BlitzApi.post(CLIENT_SIGNUP_REQUEST, payload)
    .then(res => { this.handleSuccess(res) })
    .catch(error => { this.handleFailure(error) })
  }

  handleSuccess() {
    this.setState({isFetching: false})
    this.setState({
      notification:
        {
          message: 'Client was successfully created',
          status: 'success'
        }})
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
    this.context.store.dispatch(reset('ClientSignupForm'));
  }

  render() {
    return (
      <ClientSignup
        submitForm={this.submitForm}
        resetForm={this.resetForm}
        isFetching={this.state.isFetching || false}
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

export default connect(mapStateToProps, mapActionCreators)(ClientSignupContainer);

