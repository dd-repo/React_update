import React from 'react';
import clickadillyApi from 'services/clickadillyApi';
import { reset } from 'redux-form';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import AccountEdit from './components/AccountEdit';
import { getSubscription, cancelSubscription } from './modules/subscription';

const PASSWORD_UPDATE_REQUEST = '/dashboard/api/v1/users'
const SUBSCRIPTION_REQUEST = '/dashboard/api/v1/subscriptions'

class AccountEditContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {showModal: false}

    this.confirmCancel = this.confirmCancel.bind(this);
    this.cancelSubscription = this.cancelSubscription.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.submitForm = this.submitForm.bind(this);
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

  componentWillMount() {
    this.props.getSubscription()
  }

  handleSuccessfulPasswordUpdate() {
    this.resetForm()
    this.setState({alert: {message: 'Your password has been successfully updated!', style: 'success'}})
  }

  handleFailedPasswordUpdate() {
    this.resetForm()
    this.setState({alert: {message: 'OOPS!, something went wrong. Please try again', style: 'danger'}})
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
    clickadillyApi.patch(PASSWORD_UPDATE_REQUEST, { user: { password }})
    .then(
      response => this.handleSuccessfulPasswordUpdate()
    ).catch(
    error => this.handleFailedPasswordUpdate()
    )
  }

  cancelSubscription() {
    this.hideModal()
    const id = this.props.subscription.id
    this.props.cancelSubscription(id)
  }

  confirmCancel() {
    this.setState({showModal: true})
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
        cancelSubscription={this.cancelSubscription}
        subscription={this.props.subscription}
      />
    )
  }
}

const mapStateToProps = state => ({
  form: state.form,
  subscription: state.subscription
})

const mapActionCreators = {
  getSubscription,
  cancelSubscription
}

export default connect(mapStateToProps, mapActionCreators)(AccountEditContainer)
