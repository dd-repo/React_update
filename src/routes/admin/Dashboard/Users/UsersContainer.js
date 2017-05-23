import React from 'react';

import { connect, RoutedComponent } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import { getAllUsers } from './modules/users';
import Users from './components/Users';

const group = {
  'clients': 'frontend',
  'admin': 'backend'
}

class UsersContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = { pageNum: 1 }

    this.getNextPage = this.getNextPage.bind(this);
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

  componentWillReceiveProps(nextProps) {
    nextProps.route.path !== this.props.route.path &&
      this.fetchUsers(this.state.pageNum, this.getRole(nextProps.route.path))
  }

  componentWillMount() {
    this.fetchUsers(this.state.pageNum, this.getRole())
  }

  getRole(path) {
    if(!path) { path = this.props.route.path }
    const role = path.split('/').pop()
    return  { q: { group_eq: group[role] }}
  }

  fetchUsers(pageNum, params) {
    this.props.getAllUsers(pageNum, params)
  }

  getNextPage(pageNum) {
    this.setState({ pageNum: parseInt(pageNum) })
    this.fetchUsers(pageNum, this.getRole())
  }

  render() {
    const { pagination, all } = this.props.users
    const paginationItems = (
      pagination &&
        Math.ceil(pagination.total / pagination.limit)
    )

    return (
      <Users
        users={all}
        paginationItems={paginationItems}
        pageNum={this.state.pageNum}
        isFetching={this.props.users.isFetching}
        getNextPage={this.getNextPage}
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
  getAllUsers
}

export default connect(mapStateToProps, mapActionCreators)(UsersContainer);
