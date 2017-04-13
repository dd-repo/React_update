import React from 'react';
import Signup from './components/Signup';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { postUserSignup } from 'modules/auth';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import { persistData } from 'localStorage';
import { USER_SIGNUP_SUCCESS , USER_SIGNUP_FAILURE } from 'modules/auth';

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
      navbarEnabled: false,
      footerEnabled: false,
      headerEnabled: false
    }
  }

  submitForm(user) {
    user.phone_type = "mobile"
    this.props.postUserSignup(user)
    .then(res => { this.doNext(res) })
    .catch(error => { console.log('error user signup', error) })
  }

  persistDataToLocalStorage(user) {
    // testing purposes
    user.phone_number = '808-555-5555'
    user.password = 'password12';

    persistData(user, 'currentUser');
    persistData(user.accounts, 'accounts');
  }

  doNext(res) {
    switch(res.type) {
      case USER_SIGNUP_SUCCESS:
        this.context.router.push('/payment-info');
        this.persistDataToLocalStorage(res.data)
        break;
      case USER_SIGNUP_FAILURE:
        this.setState({errorMessage: res.error.response.data.errorMessage});
        break;
      default:
        return null;
    }
  }

  render() {
    return (
      <Signup
        submitForm={this.submitForm}
        plan={this.props.planSelection}
        errorMessage={this.state.errorMessage}
      />
    )
  }
}

const mapStateToProps = state => ({
  planSelection: state.planSelection,
  currentUser: state.entity
})

const mapActionCreators = {
  postUserSignup
}

export default connect(mapStateToProps, mapActionCreators)(SignupContainer);
