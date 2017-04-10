import React from 'react';
import ForgotPassword from './components/ForgotPassword';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';

class ForgotPasswordContainer extends RoutedComponent {
  constructor(props) {
    super(props)

    this.submitForm = this.submitForm.bind(this);
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

  submitForm(email) {
    console.log('email', email)
  }

  doNext(res) {
    //switch(res.type) {
      //case USER_SUCCESS:
        //this.context.router.push('/payment-info');
        //res.userData.phone_number = '123-123-1234';
        //res.userData.password = 'Password12';

        //persistData(res.userData, 'currentUser');
        //persistData(res.userData.accounts, 'accounts');
        //break;
      //case USER_FAILURE:
        //this.setState({errorMessage: res.error});
        //break;
      //default:
        //return null;
    //}
  }

  render() {
    return (
      <ForgotPassword
        submitForm={this.submitForm}
      />
    )
  }
}

export default connect()(ForgotPasswordContainer);
