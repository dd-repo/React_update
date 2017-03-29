import React from 'react';
import Login from './components/Login';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { postUserLogin } from 'modules/auth';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import { persistData } from 'localStorage';
import { USER_SUCCESS, USER_FAILURE } from 'modules/auth';

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
      case USER_SUCCESS:
        this.context.router.push('/dashboard');
        // this code is just for testing purposes
        res.userData.password = 'Password12';

        persistData(res.userData, 'currentUser');
        persistData(res.userData.accounts, 'accounts');
        break;
      case USER_FAILURE:
        this.setState({errorMessage: res.error});
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

