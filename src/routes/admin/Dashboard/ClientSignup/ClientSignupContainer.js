import React from 'react';
import ClientSignup from './components/ClientSignup';

import { RoutedComponent, connect } from 'routes/routedComponent';
//import { postUserSignup } from 'modules/auth';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
//import { persistData } from 'localStorage';
//import { USER_SIGNUP_SUCCESS , USER_SIGNUP_FAILURE } from 'modules/auth';

class ClientSignupContainer extends RoutedComponent {
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
      sidebarEnabled: true,
      navbarEnabled: true,
      footerEnabled: true,
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
    const { accounts, access_token } = user
    // testing purposes
    user.phone_number = '808-555-5555'
    user.password = 'password12';

    persistData(user, 'currentUser');
    persistData(accounts, 'accounts');
    persistData(access_token, 'authToken');
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
      <ClientSignup
        submitForm={this.submitForm}
        errorMessage={this.state.errorMessage}
      />
    )
  }
}

//const mapStateToProps = state => ({
  //planSelection: state.planSelection,
  //currentUser: state.entity
//})

//const mapActionCreators = {
  //postUserSignup
//}

export default connect()(ClientSignupContainer);

