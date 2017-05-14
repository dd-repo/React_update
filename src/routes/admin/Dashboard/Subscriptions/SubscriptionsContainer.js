import React from 'react';
import _ from 'underscore';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import {
  getSubscriptions,
  updateSubscription
} from './modules/subscriptions'
import Subscriptions from './components/Subscriptions';

class SubscriptionsContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      showModal: false,
      subscriptionInProcess: {}
    }

    this.getNextPage = this.getNextPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.confirmCancelation = this.confirmCancelation.bind(this);
    this.hideModal = this.hideModal.bind(this);
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

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    this.fetchSubscriptions()
  }

  fetchSubscriptions() {
    this.props.getSubscriptions(this.state.pageNum)
  }

  handleClick(id, isActive) {
    this.props.updateSubscription(id, isActive)
    .then( (res) => this.fetchSubscriptions())
    .catch( (error) => console.log('error in updating subscription', error))
  }

  getNextPage(pageNum) {
    console.log('pageNum', pageNum)
    this.fetchSubscriptions(pageNum)
  }

  confirmCancelation(subscription) {
    this.setState({showModal: true, subscriptionInProcess: subscription})
  }

  hideModal() {
    this.setState({showModal: false, subscriptionInProcess: {}})
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
