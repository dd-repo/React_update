import React from 'react';
import _ from 'underscore';
import { connect, RoutedComponent } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';

import UserEdit from './components/UserEdit';

const UPDATE_USER_REQUEST = '/admin/api/'

class UserEditContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {isFetching: false}

    this.submitForm = this.submitForm.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
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
        authnet_id: user.authnet_id,
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
    const payload = this.buildParms(uer)
    this.setState({isFetching: true})
    BlitzApi.patch(UPDATE_USER_REQUEST, payload)
    .then(res => { this.handleSuccess(res) })
    .catch(error => { this.handleFailure(error) })
  }

  handleSuccess() {
    this.setState({
      isFetching: false,
      notification: {
        message: 'Client was successfully updated',
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
    const userId = parseInt(this.props.params.id)
    const user = _.find(this.props.users.all, {id: userId})

    return (
      <UserEdit
        user={user}
        submitForm={this.submitForm}
        isFetching={this.state.isFetching}
        notification={this.state.notification}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(UserEditContainer)
