import React from 'react';
import CreatePassword from './components/CreatePassword';
import { persistData } from 'localStorage';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import {
  updateUserPassword,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE
} from '../modules/auth';

const persistDataToLocalStorage = data => {
  const { user, auth_token, account } = data

  persistData(user, 'currentUser');
  persistData(auth_token, 'authToken');
  persistData(true, 'isLoggedIn')

  if(user.role === 'client') {
    const { keywords, profile } = account
    const keywordList = {all: keywords, currentKeyword: keywords[0]}

    persistData(keywordList, 'keywords')
    persistData(account, 'accounts');
    persistData(profile, 'profile');
  }
}

class CreatePasswordContainer extends RoutedComponent {
  constructor(props) {
    super(props)

    this.state = {disableButton: true}

    this.submitForm = this.submitForm.bind(this);
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

  componentWillReceiveProps(nextProps) {
    const { CreatePasswordForm } = nextProps.form
    CreatePasswordForm && CreatePasswordForm.values &&
      this.validatePassword(CreatePasswordForm.values)
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

  submitForm(formData) {
    const searchParam = this.props.location.search
    const token = searchParam.split('=').pop().trim();
    formData.reset_password_token = token
    this.props.updateUserPassword(formData)
    .then(res => {
      this.doNext(res)
    })
    .catch(error => { console.log('error user password create', error) })
  }

  doNext(res) {
    switch(res.type) {
      case USER_LOGIN_SUCCESS:
        persistDataToLocalStorage(res.data)
        this.context.router.push('/dashboard')
        break;
      case USER_LOGIN_FAILURE:
        this.setState({errorMessage: res.error.response.data.errorMessage});
        break;
      default:
        return null;
    }
  }

  render() {
    return (
      <CreatePassword
        submitForm={this.submitForm}
        errorMessage={this.state.errorMessage}
        passwordErrorMsg={this.state.passwordErrorMsg}
        disableButton={this.state.disableButton}
      />
    )
  }
}

const mapStateToProps = state => ({
  form: state.form
})

const mapActionCreators = {
  updateUserPassword
}

export default connect(mapStateToProps, mapActionCreators)(CreatePasswordContainer);

