import React from 'react';
import Signup from './components/Signup';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import { persistData } from 'localStorage';
import {
  postUserSignup,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE
} from 'modules/auth';

const persistDataToLocalStorage = user => {
  const { accounts, access_token } = user
  // testing purposes
  user.phone_number = '808-555-5555'
  user.password = 'password12';

  persistData(user, 'currentUser');
  persistData(accounts, 'accounts');
  persistData(access_token, 'authToken');
}

class SignupContainer extends RoutedComponent {
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
      navbarEnabled: true,
      footerEnabled: false,
      headerEnabled: true,
      headerStyle: 'breadcrumbs',
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
      />
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

const mapActionCreators = {
  postUserSignup
}

export default connect(mapStateToProps, mapActionCreators)(SignupContainer);
