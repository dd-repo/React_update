import React from 'react';
import BlitzApi from 'services/BlitzApi';
import { reset } from 'redux-form';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import AccountEdit from './components/AccountEdit';

const PASSWORD_UPDATE_REQUEST = '/dashboard/api/v1/users'
const CANCEL_SUBSCRIPTION_REQUEST = '/dashboard/api/v1/'

class AccountEditContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {showModal: false}

    this.confirmCancel = this.confirmCancel.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleCancelSubscription = this.handleCancelSubscription.bind(this);
  }

  getLayoutOptions() {
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

  handleSuccessfulPasswordUpdate() {
    this.resetForm()
    this.setState({alert: {message: 'Your password has been successfully updated!', style: 'success'}})
  }

  handleFailedPasswordUpdate() {
    this.resetForm()
    this.setState({alert: {message: 'OOPS!, something went wrong. Please try again', style: 'danger'}})
  }

  handleSuccessfulSubscriptionCancel() {
  }

  resetForm() {
    this.context.store.dispatch(reset('updatePasswordForm'));
  }

  hideModal() {
    this.setState({showModal: !this.state.showModal})
  }

  passwordsMatch() {
    const {
      password,
      passwordConfirmation
    } = this.props.form.updatePasswordForm.values
  return password === passwordConfirmation
  }

  updatePassword(password) {
    BlitzApi.patch(PASSWORD_UPDATE_REQUEST, { user: { password }})
    .then(
      response => this.handleSuccessfulPasswordUpdate()
    ).catch(
    error => this.handleFailedPasswordUpdate()
    )
  }

  cancelSubscription() {
    BlitzApi.patch(CANCEL_SUBSCRIPTION_REQUEST)
    .then(
      response => this.handleSuccessfulSubscriptionCancel()
    ).catch(
    error => console.log('error', error)
    )
  }

  confirmCancel() {
    this.setState({showModal: true})
  }

  handleCancelSubscription() {
    this.cancelSubscription()
  }

  submitForm(formData) {
    if(this.passwordsMatch()) {
      this.setState({passwordErrorMsg: null})
      this.updatePassword(formData.password)
    }else{
      this.setState({passwordErrorMsg: 'Passwords do not match'})
    }
  }

  render() {
    return (
      <AccountEdit
        disableButton={this.state.disableButton}
        submitForm={this.submitForm}
        passwordErrorMsg={this.state.passwordErrorMsg}
        alert={this.state.alert}
        showModal={this.state.showModal}
        hideModal={this.hideModal}
        confirmCancel={this.confirmCancel}
        handleCancelSubscription={this.handleCancelSubscription}
      />
    )
  }
}

const mapStateToProps = state => ({
  form: state.form
})

export default connect(mapStateToProps)(AccountEditContainer)
