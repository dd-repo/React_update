import React from 'react';
import _ from 'underscore';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import {
  getSubscriptions,
  updateSubscription
} from './modules/subscriptions'
import Subscriptions from './components/Subscriptions';

const defaultSearchParams = { q: {}}

class SubscriptionsContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      showModal: false,
      subscriptionInProcess: {},
      queryName: 'All Subscriptions'
    }

    this.getNextPage = this.getNextPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.confirmCancelation = this.confirmCancelation.bind(this);
    this.hideModal = this.hideModal.bind(this);
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

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    this.fetchSubscriptions()
  }

  fetchSubscriptions(params={}, pageNum=1) {
    this.props.getSubscriptions(params, pageNum)
  }

  handleClick(id, isActive) {
    const params = { subscription: { is_active: isActive }}
    this.props.updateSubscription(id, params)
    .then( (res) => this.fetchSubscriptions({}, this.state.pageNum))
    .catch( (error) => console.log('error in updating subscription', error))
  }

  getNextPage(pageNum) {
    this.setState({ pageNum: pageNum })
    this.fetchSubscriptions({}, pageNum)
  }

  confirmCancelation(subscription) {
    this.setState({showModal: true, subscriptionInProcess: subscription})
  }

  hideModal() {
    this.setState({showModal: false, subscriptionInProcess: {}})
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

    const sortedSubscriptions = (
      _.sortBy(this.props.subscriptions.all, 'id')
    )

    const paginationItems = (
      pagination &&
         Math.ceil(pagination.total / pagination.limit)
    )
    const resultCount = pagination && pagination.total
    const limit = pagination && pagination.limit

    return (
      <Subscriptions
        subscriptions={sortedSubscriptions}
        pagination={this.props.subscriptions.pagination}
        paginationItems={paginationItems}
        pageNum={this.state.pageNum}
        isFetching={this.props.subscriptions.isFetching}
        getNextPage={this.getNextPage}
        handleClick={this.handleClick}
        confirmCancelation={this.confirmCancelation}
        showModal={this.state.showModal}
        hideModal={this.hideModal}
        subscriptionInProcess={this.state.subscriptionInProcess}
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
}

export default connect(mapStateToProps, mapActionCreators)(SubscriptionsContainer)
