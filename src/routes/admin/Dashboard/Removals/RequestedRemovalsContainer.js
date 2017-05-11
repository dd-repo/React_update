import React from 'react';
import _ from 'underscore';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import {
  getRemovalsRequested,
  updateStatus,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAILURE
} from './modules/removalRequests'
import RequestedRemovals from './components/RequestedRemovals';

class RequestedRemovalsContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = { isFetching: true, pageNum: 1 }

    this.handleClick = this.handleClick.bind(this);
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

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    this.fetchRemovalsRequested()
  }

  fetchRemovalsRequested() {
    this.props.getRemovalsRequested(this.state.pageNum)
  }

  getNextPage(pageNum) {
    this.setState({ pageNum: parseInt(pageNum) })
    this.fetchRemovalsRequested(pageNum)
  }

  handleClick(request_id, status) {
    const payload = { request_id, status }
    this.props.updateStatus(payload)
    .then( (res) =>  this.fetchRemovalsRequested())
    .catch( error => { console.log('error in admin removals', error) })
  }

  render() {
    const sortedRemovals = (
     _.sortBy(this.props.requestedRemovals.all, 'id' )
    )

    return (
      <RequestedRemovals
        removals={sortedRemovals}
        pagination={this.props.requestedRemovals.pagination}
        pageNum={this.state.pageNum}
        isFetching={this.props.requestedRemovals.isFetching}
        handleClick={this.handleClick}
        getNextPage={this.getNextPage}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    requestedRemovals: state.requestedRemovals
  }
}

const mapActionCreators = {
  getRemovalsRequested,
  updateStatus
}

export default connect(mapStateToProps, mapActionCreators)(RequestedRemovalsContainer)
