import React from 'react';
import _ from 'underscore';

import RequestedRemovals from './components/RequestedRemovals';
import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import {
  getRemovalsRequested,
  updateStatus,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAILURE
} from './modules/removalRequests'

const removalStatus = {
  'requested': 'requested',
  'in-progress': 'inprogress',
  'completed': 'completed',
  'dashboard': 'requested'
}

class RequestedRemovalsContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      removalInProcess: {},
      pageNum: 1
    }

    this.handleClick = this.handleClick.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
    this.updateRemovalStatus = this.updateRemovalStatus.bind(this);
    this.hideModal = this.hideModal.bind(this)
    this.showModal = this.showModal.bind(this)
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

  componentWillReceiveProps(nextProps) {
    nextProps.route.path !== this.props.route.path &&
      this.fetchRemovalsRequested(this.state.pageNum, this.getStatus(nextProps.route.path))
  }

  componentWillMount() {
    this.fetchRemovalsRequested(this.state.pageNum, this.getStatus())
  }

  getStatus(path) {
    if(!path) { path = this.props.route.path }
    const status = path.split('/').pop()
    return { q: { request_status_is_type_eq: removalStatus[status] } }
  }

  fetchRemovalsRequested(pageNum, params) {
    this.props.getRemovalsRequested(pageNum, params)
  }

  getNextPage(pageNum) {
    this.setState({ pageNum: parseInt(pageNum) })
    this.fetchRemovalsRequested(pageNum, this.getStatus())
  }

  hideModal() {
    this.setState({showModal: !this.state.showModal, removal: {}})
  }

  showModal(removal) {
    this.setState({showModal: true, removalInProcess: removal})
  }

  updateRemovalStatus(removal, removed_url) {
    const { id, nextStatus } = removal
    const payload = { request_id: id, status: nextStatus, removed_url }
    this.props.updateStatus(payload)
    //.then( (res) => this.fetchRemovalsRequested(this.state.pageNum, this.getStatus()))
    //.catch( error => { console.log('error in admin removals', error) })
  }

  handleClick(removal) {
    removal.nextStatus === 'protected'
      ?
        this.updateRemovalStatus(removal)
        :
          this.showModal(removal)
  }

  render() {
    const { requestedRemovals } = this.props
    const { pagination } = requestedRemovals

    const sortedRemovals = (
     _.sortBy(requestedRemovals.all, 'id' )
    )

    const paginationItems = (
      pagination &&
        Math.ceil( pagination.total / pagination.limit )
    )

    return (
      <RequestedRemovals
        removals={sortedRemovals}
        pageNum={this.state.pageNum}
        isFetching={this.props.requestedRemovals.isFetching}
        handleClick={this.handleClick}
        getNextPage={this.getNextPage}
        paginationItems={paginationItems}
        showModal={this.state.showModal}
        hideModal={this.hideModal}
        removalInProcess={this.state.removalInProcess}
        updateRemovalStatus={this.updateRemovalStatus}
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
  updateStatus,
}

export default connect(mapStateToProps, mapActionCreators)(RequestedRemovalsContainer)
