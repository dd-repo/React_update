import React from 'react';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import {
  getRemovalsRequested,
  updateStatus
} from './modules/removalRequests'
import RequestedRemovals from './components/RequestedRemovals';

class RequestedRemovalsContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: true
    }

    this.handleClick =  this.handleClick.bind(this);
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

  fetchRemovalsRequested() {
    this.props.getRemovalsRequested()
  }

  handleClick(request_id, status) {
    const payload = { request_id, status }
    this.props.updateStatus(payload)
    this.fetchRemovalsRequested()
  }

  render() {
    return (
      <RequestedRemovals
        removals={this.props.requestedRemovals.all}
        isFetching={this.state.isFetching}
        handleClick={this.handleClick}
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
