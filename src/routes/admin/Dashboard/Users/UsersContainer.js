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
    this.state = { pageNum: 1, queryName: 'All Users' }

    this.getNextPage = this.getNextPage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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

  componentWillReceiveProps(nextProps) {
    nextProps.route.path !== this.props.route.path &&
      this.fetchUsers(this.getRole(nextProps.route.path), this.state.pageNum)
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

  handleSearch(e, input) {
    const params = {
      q: {
        first_name_or_last_name_or_email_cont: input,
        group_eq: 'frontend'
      }}
    this.fetchUsers(params)
    this.setState({ queryName: input })
  }

  render() {
    const { pagination, all } = this.props.users
    const results = pagination && pagination.total
    const limit = pagination && pagination.limit
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
        handleSearch={this.handleSearch}
        queryName={this.state.queryName}
        results={results}
        limit={limit}
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
