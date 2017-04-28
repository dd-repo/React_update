import React from 'react';
import Login from './components/Login';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import { persistData } from 'localStorage';
import {
  postUserLogin,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE
} from 'modules/auth';

const persistDataToLocalStorage = data => {
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

  transitionBasedOnUserRole({ user }) {
    user.role === 'admin'
      ?
        this.context.router.push('admin/dashboard')
          :
            this.context.router.push('/dashboard')
  }

  doNext(res) {
    switch(res.type) {
      case USER_LOGIN_SUCCESS:
        persistDataToLocalStorage(res.data)
        this.transitionBasedOnUserRole(res.data)
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
      <Login
        submitForm={this.submitForm}
        errorMessage={this.state.errorMessage}
      />
    )
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.loggedInUser
})

const mapActionCreators = {
  postUserLogin
}

export default connect(mapStateToProps, mapActionCreators)(LoginContainer);

