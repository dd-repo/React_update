import React from 'react';
import Signup from './components/Signup';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { postUser } from 'modules/currentUser';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';

class SignupContainer extends RoutedComponent {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(user) {
    user.phone_type = "mobile"
    this.props.postUser(user, 'signup')
    .then(res => { this.doNext(res) })
    .catch(error => { console.log('error user signup', error) })
  }

  doNext(res) {
    switch(res.type) {
      case USER_SUCCESS:
        this.props.router.push('/users/payment');
        res.userData.phone_number = '123-123-1234';
        res.userData.password = 'Password12';

        persistData(res.userData, 'currentUser');
        persistData(res.userData.accounts, 'accounts');
        break;
      case FAILURE:
        this.setState({errorMessage: res.error});
        break;
      default:
        return null;
    }
  }

  render() {
    return (
      <Signup
        handleSubmit={this.handleSubmit}
        plan={this.props.planSelection}
        errorMessage={this.state.ErrorMessage}
        />
    )
  }
}

const mapStateToProps = state => ({
  planSelection: state.planSelection,
  currentUser: state.entity
})

const mapActionCreators = {
  postUser
}

export default connect(mapStateToProps, mapActionCreators)(SignupContainer);
