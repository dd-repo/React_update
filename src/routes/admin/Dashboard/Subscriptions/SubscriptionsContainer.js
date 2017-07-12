import React from 'react';
import _ from 'underscore';
import BlitzApi from 'services/BlitzApi';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import {
  getSubscriptions,
  updateSubscription
} from './modules/subscriptions'
import Subscriptions from './components/Subscriptions';
import { CARDS_REQUEST } from 'consts/apis';

class SubscriptionsContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      showModal: false,
      subscriptionToEdit: {},
      queryName: 'All Subscriptions'
    }

    this.getNextPage = this.getNextPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.editSubscription = this.editSubscription.bind(this);
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

  componentWillUpdate(nextProps, nextState) {
    if(nextState.subscriptionToEdit !== this.state.subscriptionToEdit) {
      this.fetchCards(nextState.subscriptionToEdit.user_id)
    }
  }

  fetchSubscriptions(params={}, pageNum=1) {
    this.props.getSubscriptions(params, pageNum)
  }

  fetchCards(id) {
    const params = { q: { user_id_eq: id }}

    BlitzApi.get(CARDS_REQUEST, params)
    .then( res => this.setState({ cards: res.data.cards }))
    .catch( error => console.log('fetching cards', error.data))
  }

  handleClick(data) {
    const params = { subscription: data }
    this.props.updateSubscription(data.id, params)
    .then( (res) => this.fetchSubscriptions({}, this.state.pageNum))
    .catch( (error) => console.log('error in updating subscription', error.response.data.errorMessage))
  }

  getNextPage(pageNum) {
    this.setState({ pageNum: pageNum })
    this.fetchSubscriptions({}, pageNum)
  }

  editSubscription(subscription) {
    this.setState({showModal: true, subscriptionToEdit: subscription})
  }

  hideModal() {
    this.setState({showModal: false})
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
        editSubscription={this.editSubscription}
        showModal={this.state.showModal}
        hideModal={this.hideModal}
        subscriptionToEdit={this.state.subscriptionToEdit}
        queryName={this.state.queryName}
        handleSearch={this.handleSearch}
        resultCount={resultCount}
        limit={limit}
        cards={this.state.cards || []}
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
