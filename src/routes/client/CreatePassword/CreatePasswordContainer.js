import React from 'react';
import CreatePassword from './components/CreatePassword';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import {
  postUserLogin,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE
} from 'modules/auth';

class CreatePasswordContainer extends RoutedComponent {
  constructor(props) {
    super(props)

    this.state = {disableButton: true}

    this.submitForm = this.submitForm.bind(this);
  }

  static contexttypes = {
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
          this.setState({errorMessage: 'Passwords do not match'})
            :
              this.setState({errorMessage: null})
    }
  }

  submitForm(formData) {
    const searchParam = this.props.location.search
    const token = searchParam.split('=').pop().trim();
    formData.token = token
    console.log('form data', formData)
    //this.props.postUserLogin(user)
    //.then(res => { this.doNext(res) })
    //.catch(error => { console.log('error user Login', error) })
  }

  doNext(res) {
    switch(res.type) {
      case USER_LOGIN_SUCCESS:
        this.context.router.push('/dashboard')
        this.persistDataToLocalStorage(res.data)
        break;
      case USER_LOGIN_FAILURE:
        this.setState({errorMessage: res.error.response.data.errorMessage});
        break;
      default:
        return null;
    }
  }

  persistDataToLocalStorage(data) {
    const { user, account } = data
    const { accounts, access_token, role } = user
    const { keywords, profile } = account
    const keywordList = {all: keywords, currentKeyword: keywords[0]}
    user.password = 'password12'

    persistData(keywordList, 'keywords')
    persistData(user, 'currentUser');
    persistData(accounts, 'accounts');
    persistData(profile, 'profile');
    persistData(access_token, 'authToken');
    persistData(role, 'userRole');
  }

  render() {
    return (
      <CreatePassword
        submitForm={this.submitForm}
        errorMessage={this.state.errorMessage}
        disableButton={this.state.disableButton}
      />
    )
  }
}

const mapStateToProps = state => ({
  form: state.form
})

const mapActionCreators = {
  postUserLogin
}

export default connect(mapStateToProps, mapActionCreators)(CreatePasswordContainer);

