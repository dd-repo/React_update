import React from 'react';
import _ from 'underscore';

import BlitzApi from 'services/BlitzApi';
import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_FLUID } from 'layouts/DefaultLayout/modules/layout';
import User from './components/User';

const GET_USER_REQUEST = '/admin/api/user'

class UserContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: true,
      user: {},
      account: {}
    }

    this.handleAccountSelect = this.handleAccountSelect.bind(this);
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
    BlitzApi.get(GET_USER_REQUEST, this.props.params)
    .then( res => this.setState({
      isFetching: false,
      user: res.data,
      account: res.data.accounts[0]
    }))
    .catch( error => console.log('error', error))
  }

  handleAccountSelect(id) {
    const account = _.findWhere(this.state.user.accounts, { id })
    const testAccount = { id: 2, first_name: 'mike', last_name: 'D', email: 'miked@email.com', created_at: "2017-05-17T13:16:17.329-07:00" }
    this.setState({account: testAccount})
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
