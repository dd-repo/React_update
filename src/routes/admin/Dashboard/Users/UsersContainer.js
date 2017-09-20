import React from 'react';

import { connect, RoutedComponent } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import { getAllUsers, becomeUser, deleteUser, clearNotification } from './modules/users';
import { persistData } from 'localStorage';
import { USER_LOGIN_SUCCESS } from 'routes/auth/modules/auth';
import Users from './components/Users';

const group = {
  'clients': 'frontend',
  'admin': 'backend',
  'dashboard': 'frontend'
}

class UsersContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      queryName: 'All Users'
    }

    this.getNextPage = this.getNextPage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
    this.transitionToUser = this.transitionToUser.bind(this);
  }

  getLayoutOptions() {
    return {
      contentView: CONTENT_VIEW_STATIC,
      sidebarEnabled: true,
      navbarEnabled: true,
      footerEnabled: true,
      headerEnabled: true
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillReceiveProps(nextProps) {
    nextProps.route.path !== this.props.route.path &&
      this.fetchUsers(this.getRole(nextProps.route.path), this.state.pageNum)
    if(nextProps.users) {
      nextProps.users.notification.message && window.scrollTo(0,0)
    }
  }

  componentWillMount() {
    this.fetchUsers(this.getRole(), this.state.pageNum)
  }

  getRole(path) {
    if(!path) { path = this.props.route.path }
    const role = path.split('/').pop()
    return  { q: { group_eq: group[role] }}
  }

  fetchUsers(params, pageNum=1) {
    this.props.getAllUsers(params, pageNum)
  }

  getNextPage(pageNum) {
    this.setState({ pageNum: parseInt(pageNum) })
    this.fetchUsers(this.getRole(), pageNum)
  }

  handleSearch(input) {
    const queryName = input !== '' ? input : 'All Users'
    const params = {
      q: {
        first_name_or_last_name_or_email_cont: input,
        group_eq: 'frontend'
      }}
    this.fetchUsers(params)
    this.setState({ queryName })
  }

  handleDropdownSelect(id, selector) {
    switch(selector) {
      case 'become':
        const params = { user: { id: id } }
        this.props.becomeUser(params)
        .then( res => this.doNext(res) )
        break;
      case 'delete':
        this.props.deleteUser(id)
        break;
      default:
        this.fetchUsers(this.getRole())
    }
  }

  doNext = res => {
    switch(res.type) {
      case USER_LOGIN_SUCCESS:
        this.transitionToUser(res)
        break;
    }
  }

  transitionToUser(res) {
    persistData(res.data.auth_token, 'authToken' )
    this.context.router.push('/dashboard')
  }

  clearMessage = () => {
    this.props.clearNotification()
  }

  render() {
    const { pagination, all } = this.props.users
    const results = pagination && pagination.total
    const limit = pagination && pagination.limit
    const isFrontend = all && all[0].group === 'frontend'
    const paginationItems = (
      pagination &&
        Math.ceil(pagination.total / pagination.limit)
    )

    return (
      <Users
        notification={this.props.users.notification}
        clearMessage={this.clearMessage}
        users={all}
        paginationItems={paginationItems}
        pageNum={this.state.pageNum}
        isFetching={this.props.users.isFetching}
        getNextPage={this.getNextPage}
        handleSearch={this.handleSearch}
        queryName={this.state.queryName}
        results={results}
        limit={limit}
        isFrontend={isFrontend}
        handleDropdownSelect={this.handleDropdownSelect}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapActionCreators = {
  getAllUsers,
  becomeUser,
  deleteUser,
  clearNotification
}

export default connect(mapStateToProps, mapActionCreators)(UsersContainer);
