import React from 'react';
import Signup from './components/Signup';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { postUserSignup } from 'modules/auth';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import { persistData } from 'localStorage';
import { USER_SUCCESS, USER_FAILURE } from 'modules/auth';

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

  doNext(res) {
    switch(res.type) {
      case USER_SUCCESS:
        this.context.router.push('/payment-info');
        res.userData.phone_number = '123-123-1234';
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
