import React from 'react';
import _ from 'underscore';

import BlitzApi from 'services/BlitzApi';
import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_FLUID } from 'layouts/DefaultLayout/modules/layout';
import User from './components/User';
//import EditUserModal from './components/EditUserModal';

const GET_USER_REQUEST = '/admin/api/user'
const GET_USER_ACCOUNT_REQUEST = '/admin/api/account'

class UserContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: true,
      user: {},
      account: {},
      showEditUserModal: false
    }

    this.handleAccountSelect = this.handleAccountSelect.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  getLayoutOptions() {
    return {
      contentView: CONTENT_VIEW_FLUID,
      sidebarEnabled: true,
      navbarEnabled: true,
      footerEnabled: true,
      headerEnabled: false
    }
  }

  componentWillMount() {
    this.fetchUser(GET_USER_REQUEST, this.props.params)
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.user !== this.state.user) {
      const id =  nextState.user.accounts[0].id
      this.fetchAccount(GET_USER_ACCOUNT_REQUEST, {id})
    }
  }

  fetchUser(path, params) {
    BlitzApi.get(path, params)
    .then( res => this.setState({
      user: res.data,
      account: {}
    }))
    .catch( error => console.log('error', error))
  }

  fetchAccount(path, params) {
    BlitzApi.get(path, params)
    .then( res => this.setState({
      isFetching: false,
      account: res.data
    }))
    .catch( error => console.log('error', error))
  }

  handleAccountSelect(id) {
    this.fetchAccount(GET_USER_ACCOUNT_REQUEST, {id})
  }

  handleEdit() {
  }


  hideModal(modalName) {
    this.setState({
      [`show${modalName}`]: false
    });
  }

  render() {
    return (
      <User
        user={this.state.user}
        isFetching={this.state.isFetching}
        account={this.state.account}
        handleAccountSelect={this.handleAccountSelect}
      />
    )
  }
}

const mapStateToProps = state => ({
   users: state.users
})

export default connect(mapStateToProps)(UserContainer);
