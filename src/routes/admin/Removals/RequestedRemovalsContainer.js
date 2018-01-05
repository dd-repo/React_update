import React from 'react'
import _ from 'underscore'

import RequestedRemovals from './components/RequestedRemovals'
import CompletedRemovals from './components/CompletedRemovals'
import { RoutedComponent, connect } from 'routes/routedComponent'
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout'
import {
  getRemovals,
  updateStatus,
  clearNotification
} from './modules/removalRequests'

const removalStatus = {
  'requested': 'requested',
  'in-progress': 'inprogress',
  'completed': 'completed'
}

class RequestedRemovalsContainer extends RoutedComponent {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      removalInProcess: {},
      pageNum: 1,
      queryName: this.getStatus()
    }

    this.handleClick = this.handleClick.bind(this)
    this.getNextPage = this.getNextPage.bind(this)
    this.updateRemovalStatus = this.updateRemovalStatus.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.showModal = this.showModal.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  getLayoutOptions () {
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

  componentWillMount () {
    this.fetchRemovals(this.state.pageNum, this.getParams())
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.route.path !== this.props.route.path) {
      this.fetchRemovals(1, this.getParams(nextProps.route.path))
      this.setState({
        queryName: this.getStatus(nextProps.route.path),
        pageNum: 1
      })
    }
  }

  fetchRemovals (pageNum, params) {
    this.props.getRemovals(pageNum, params)
  }

  getParams (path = this.props.route.path) {
    const status = this.getStatus(path)
    return status !== 'completed'
      ? { q: { request_status_is_type_eq: status } }
      : { q: { completed_at_not_null: '1', s: 'completed_at desc' } }
  }

  getStatus (path = this.props.route.path) {
    const status = path.split('/').pop()
    return removalStatus[status]
  }

  getNextPage (pageNum) {
    this.setState({ pageNum: parseInt(pageNum) })
    this.fetchRemovals(pageNum, this.getParams())
  }

  hideModal () {
    this.setState({showModal: false, removal: {}})
  }

  showModal (removal) {
    this.setState({showModal: true, removalInProcess: removal})
  }

  updateRemovalStatus (removal, removed_url) {
    const { id, nextStatus } = removal
    const payload = { request_id: id, status: nextStatus, removed_url }
    this.hideModal()
    this.props.updateStatus(payload)
  }

  handleSearch (input) {
    const queryName = input !== '' ? input : this.getStatus()
    const status = this.getStatus()
    const params = {
      q: {
        id_eq: input,
        request_status_is_type_eq: status
      }
    }

    this.fetchRemovals(this.state.pageNum, params)
    this.setState({queryName})
  }

  handleClick (removal) {
    (removal.nextStatus === 'protected' || removal.nextStatus === 'skip')
      ? this.updateRemovalStatus(removal)
      : this.showModal(removal)
  }

  clearNotification = () => {
    this.props.clearNotification()
  }

  render () {
    const { requestedRemovals } = this.props
    const { pagination } = requestedRemovals
    const resultCount = pagination && pagination.total
    const paginationItems = (
      pagination &&
        Math.ceil(pagination.total / pagination.limit)
    )
    const isCompleted = this.state.queryName === 'completed'

    if (isCompleted) {
      return <CompletedRemovals
        removals={requestedRemovals.completed}
        pageNum={this.state.pageNum}
        isFetching={this.props.requestedRemovals.isFetching}
        getNextPage={this.getNextPage}
        paginationItems={paginationItems}
        handleSearch={this.handleSearch}
        queryName={this.state.queryName}
        resultCount={resultCount}
      />
    } else {
      return <RequestedRemovals
        removals={requestedRemovals.all}
        notification={requestedRemovals.notification}
        clearMessage={this.clearNotification}
        pageNum={this.state.pageNum}
        isFetching={this.props.requestedRemovals.isFetching}
        handleClick={this.handleClick}
        getNextPage={this.getNextPage}
        paginationItems={paginationItems}
        showModal={this.state.showModal}
        hideModal={this.hideModal}
        removalInProcess={this.state.removalInProcess}
        updateRemovalStatus={this.updateRemovalStatus}
        handleSearch={this.handleSearch}
        queryName={this.state.queryName}
        resultCount={resultCount}
      />
    }
  }
}

const mapStateToProps = state => ({
  requestedRemovals: state.requestedRemovals
})

const mapActionCreators = {
  getRemovals,
  updateStatus,
  clearNotification
}

export default connect(mapStateToProps, mapActionCreators)(RequestedRemovalsContainer)
