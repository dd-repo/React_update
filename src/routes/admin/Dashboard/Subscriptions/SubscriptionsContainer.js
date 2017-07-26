import React from 'react';
import _ from 'underscore';
import clickadillyApi from 'services/clickadillyApi';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import Subscriptions from './components/Subscriptions';
import { showModal } from 'modules/modal';
import { fetchCards } from 'routes/admin/Dashboard/User/modules/cards';
import {
  getSubscriptions,
  updateSubscription
} from './modules/subscriptions'

class SubscriptionsContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      queryName: 'All Subscriptions'
    }

    this.getNextPage = this.getNextPage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  componentWillMount() {
    this.fetchSubscriptions()
  }

  fetchSubscriptions(params={}, pageNum=1) {
    this.props.getSubscriptions(params, pageNum)
  }

  handleClick(subscription) {
    this.props.fetchCards(subscription.id)
    .then( res => this.props.showModal('SUBSCRIPTION', subscription))
  }

  getNextPage(pageNum) {
    this.setState({ pageNum: pageNum })
    this.fetchSubscriptions({}, pageNum)
  }

  handleSearch(input) {
    const queryName = input !== '' ? input : 'All Subscriptions'
    const params = {
      q: {
        user_first_name_or_user_last_name_or_id_eq: input
      }
    }
    this.fetchSubscriptions(params)
    this.setState({ queryName })
  }

  render() {
    const { pagination } = this.props.subscriptions

    const paginationItems = (
      pagination &&
         Math.ceil(pagination.total / pagination.limit)
    )
    const resultCount = pagination && pagination.total
    const limit = pagination && pagination.limit

    return (
      <Subscriptions
        subscriptions={this.props.subscriptions.all || []}
        pagination={this.props.subscriptions.pagination}
        paginationItems={paginationItems}
        pageNum={this.state.pageNum}
        isFetching={this.props.subscriptions.isFetching}
        getNextPage={this.getNextPage}
        handleClick={this.handleClick}
        queryName={this.state.queryName}
        handleSearch={this.handleSearch}
        resultCount={resultCount}
        limit={limit}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    subscriptions: state.subscriptions
  }
}

const mapActionCreators = {
  getSubscriptions,
  updateSubscription,
  showModal,
  fetchCards
}

export default connect(mapStateToProps, mapActionCreators)(SubscriptionsContainer)
