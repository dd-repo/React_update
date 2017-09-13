import React from 'react';
import CreateUser from './components/CreateUser';
import { reset } from 'redux-form';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import clickadillyApi from 'services/clickadillyApi';

const CREATE_USER_REQUEST = '/admin/api/create_user';

class CreateUserContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {notification: {}}

    this.submitForm = this.submitForm.bind(this)
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired
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
    const payload = this.buildParams(user)
    this.setState({isFetching: true})
    clickadillyApi.post(CREATE_USER_REQUEST, payload)
    .then(res => { this.handleSuccess(res) })
    .catch(error => { this.handleFailure(error) })
  }

  handleSuccess() {
    this.setState({
      isFetching: false,
      notification: {
        message: 'Client was successfully created',
        status: 'success'
      }
    })
    this.resetForm();
    setTimeout(() => {
      this.setState({notification: null});
    }, 5000)
  }

  handleFailure(error) {
    this.setState({isFetching: false})
    this.setState({
      notification:
        {
          message: error.response.data.errorMessage,
          status: 'danger'
        }})
  }

  clearMessage = () => {
    this.setState({
      notification: {}
    })
  }

  resetForm() {
    this.context.store.dispatch(reset('createUserForm'));
  }

  buildParams(user) {
    return {
      user: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        phone_number: user.phoneNumber,
        phone_type: 'mobile',
        group: user.group,
        role: user.role,
        password: 'password1'
      }
    }
  }

  render() {
    return (
      <CreateUser
        submitForm={this.submitForm}
        isFetching={this.state.isFetching || false}
        notification={this.state.notification}
        clearMessage={this.clearMessage}
      />
    )
  }
}

export default connect()(CreateUserContainer);
