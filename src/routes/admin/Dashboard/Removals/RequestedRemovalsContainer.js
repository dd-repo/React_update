import React from 'react';

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

  componentWillReceiveProps(nextProps) {
    nextProps.requestedRemovals.isFetching !== this.state.isFetching &&
      this.setState({
        isFetching: nextProps.requestedRemovals.isFetching,
      });
  }

  componentWillMount() {
    this.fetchRemovalsRequested()
  }

  fetchRemovalsRequested(pageNum=1) {
    this.props.getRemovalsRequested(pageNum)
  }

  getNextPage(pageNum) {
    console.log('pageNum', pageNum)
    this.setState({ pageNum: parseInt(pageNum) })
    this.fetchRemovalsRequested(pageNum)
  }

  handleClick(request_id, status) {
    const payload = { request_id, status }
    this.props.updateStatus(payload)
    .then( res => { this.doNext(res) })
    .catch( error => { console.log('error in admin removals', error) })
  }

  doNext(res) {
    switch(res.type) {
      case UPDATE_STATUS_SUCCESS:
        this.fetchRemovalsRequested(this.state.pageNum)
        break;
      case UPDATE_STATUS_FAILURE:
        this.setState({ isFetching: false });
        break;
  default:
    return null;
    }
  }

  render() {
    return (
      <RequestedRemovals
        removals={this.props.requestedRemovals.all}
        pagination={this.props.requestedRemovals.pagination}
        pageNum={this.state.pageNum}
        isFetching={this.state.isFetching}
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
