import React from 'react';
import Login from './components/Login';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import { persistData } from 'localStorage';
import {
  postUserLogin,
  removeErrorMessage,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  ADMIN_LOGIN_SUCCESS
} from '../modules/auth';

const persistDataToLocalStorage = data => {
  const { auth_token } = data

  persistData(auth_token, 'authToken');
  persistData(true, 'isLoggedIn')
}

class LoginContainer extends RoutedComponent {
  constructor(props) {
    super(props)

    this.submitForm = this.submitForm.bind(this);
    this.state = {}
    this.doNext = this.doNext.bind(this);
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

  submitForm(user) {
    this.props.postUserLogin(user)
    .then(res => { this.doNext(res) })
    .catch(error => { console.log('error user Login', error) })
  }

  doNext(res) {
    switch(res.type) {
      case USER_LOGIN_SUCCESS:
        persistDataToLocalStorage(res.data)
        this.props.removeErrorMessage();
        this.context.router.push('/dashboard')
        break;
      case ADMIN_LOGIN_SUCCESS:
        persistDataToLocalStorage(res.data)
        this.context.router.push('admin/dashboard')
        break;
      default:
        return null;
    }
  }

  render() {
    return (
      <Login
        submitForm={this.submitForm}
        errorMessage={this.props.currentUser.errorMessage}
      />
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

const mapActionCreators = {
  postUserLogin,
  removeErrorMessage,
}

export default connect(mapStateToProps, mapActionCreators)(LoginContainer);

