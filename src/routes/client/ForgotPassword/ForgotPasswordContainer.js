import React from 'react';
import ForgotPassword from './components/ForgotPassword';
import ForgotPasswordComplete from './components/ForgotPasswordComplete';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import { resetUserPassword } from 'modules/auth';

class ForgotPasswordContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {validEmail: true}
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

  submitForm(email) {
    console.log('email', email)
    this.props.resetUserPassword(email)
    .then( (res) => this.doNext(res))
    .catch( (error) => console.log('error in forgot password', error))
  }

  doNext(res) {
    switch(res.type) {
      case FORGOT_USER_PASSWORD_SUCCESS:
        this.setState({validEmail: true})
        break;
      case FORGOT_USER_PASSWORD_FAILURE:
        this.setState({errorMessage: res.error});
        break;
      default:
        return null;
    }
  }

  render() {
    if(!this.state.validEmail) {
    return (
      <ForgotPassword
        submitForm={this.submitForm}
        errorMessage={this.state.errorMessage}
      />
    )
    } else {
      return <ForgotPasswordComplete
        userEmail={this.props.currentUser.email}
      />
    }
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
})

const mapActionCreators = {
  resetUserPassword
}

export default connect(mapStateToProps, mapActionCreators)(ForgotPasswordContainer);
