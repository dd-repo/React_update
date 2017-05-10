import React from 'react';
import Signup from './components/Signup';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import { persistData } from 'localStorage';
import {
  postUserSignup,
  removeErrorMessage,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE
} from 'modules/auth';

const persistDataToLocalStorage = data => {
  const { user, auth_token } = data
  const { accounts } = user
  // testing purposes
  user.phone_number = '808-555-5555'
  user.password = 'password12';

  persistData(user, 'currentUser');
  persistData(accounts, 'accounts');
  persistData(auth_token, 'authToken');
}

class SignupContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {disableButton: true}

    this.submitForm = this.submitForm.bind(this);
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
    signupForm && signupForm.values &&
      this.validatePassword(signupForm.values)
  }

  validatePassword({ password, passwordConfirmation }) {
    if(password && passwordConfirmation) {
      password === passwordConfirmation && this.setState({disableButton: false})

      let letter = passwordConfirmation.charAt(passwordConfirmation.length-1)
      let index = passwordConfirmation.indexOf(letter)

      letter !== password.charAt(index)
        ?
          this.setState({disableButton: true, passwordErrorMsg: 'Passwords do not match'})
            :
              this.setState({passwordErrorMsg: null})
    }
  }

  submitForm(user) {
    user.phone_type = "mobile"
    this.props.postUserSignup(user)
    .then(res => { this.doNext(res) })
    .catch(error => { console.log('error user signup', error) })
  }

  doNext(res) {
    switch(res.type) {
      case USER_SIGNUP_SUCCESS:
        persistDataToLocalStorage(res.data)
        this.context.router.push('/payment-info');
        break;
      case USER_SIGNUP_FAILURE:
        setTimeout(this.props.removeErrorMessage, 5000)
        break;
      default:
        return null;
    }
  }

  render() {
    return (
      <Signup
        submitForm={this.submitForm}
        errorMessage={this.props.currentUser.errorMessage}
        passwordErrorMsg={this.state.passwordErrorMsg}
        disableButton={this.state.disableButton}
      />
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  form: state.form
})

const mapActionCreators = {
  postUserSignup,
  removeErrorMessage
}

export default connect(mapStateToProps, mapActionCreators)(SignupContainer);
