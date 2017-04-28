import React from 'react';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import AccountEdit from './components/AccountEdit';

class AccountEditContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {disableButton: false}


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

  componentWillReceiveProps(nextProps) {
    const { UpdatePasswordForm } = nextProps.form
    UpdatePasswordForm && UpdatePasswordForm.values &&
      this.validatePassword(UpdatePasswordForm.values)
  }

  validatePassword({ password, passwordConfirmation }) {
    if(password && passwordConfirmation) {
      password === passwordConfirmation && this.setState({disableButton: false})

      let letter = passwordConfirmation.charAt(passwordConfirmation.length-1)
      let index = passwordConfirmation.indexOf(letter)

      letter !== password.charAt(index)
        ?
          this.setState({passwordErrorMsg: 'Passwords do not match'})
            :
              this.setState({passwordErrorMsg: null})
    }
  }

  submitForm(formData) {
    console.log('formData', formData)
  }

  render() {
    return (
      <AccountEdit
        disableButton={this.state.disableButton}
        submitForm={this.submitForm}
        passwordErrorMsg={this.state.passwordErrorMsg}
        errorMessage={this.state.errorMessage}
      />
    )
  }
}

const mapStateToProps = state => ({
  form: state.form
})

const mapActionCreators = {
}

export default connect(mapStateToProps)(AccountEditContainer)
