import React from 'react';
import BlitzApi from 'services/BlitzApi';
import { reset } from 'redux-form';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import AccountEdit from './components/AccountEdit';

const PASSWORD_UPDATE_REQUEST = '/dashboard/api/v1/users'

class AccountEditContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {}

    this.passwordsMatch = this.passwordsMatch.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
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

  handleSuccessfulUpdate() {
    this.resetForm()
    this.setState({alert: {message: 'Your password has been successfully updated!', style: 'success'}})
  }

  handleFailedUpdate() {
    this.resetForm()
    this.setState({alert: {message: 'OOPS!, something went wrong. Please try again', style: 'danger'}})
  }

  resetForm() {
    this.context.store.dispatch(reset('updatePasswordForm'));
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
      response => this.handleSuccessfulUpdate()
    ).catch(
    error => this.handleFailedUpdate()
    )
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
      />
    )
  }
}

const mapStateToProps = state => ({
  form: state.form
})

export default connect(mapStateToProps)(AccountEditContainer)
