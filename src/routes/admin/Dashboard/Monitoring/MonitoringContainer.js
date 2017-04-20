import React from 'react';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import { getRemovalsRequested } from './modules/removalRequests'
import AdminMonitoring from './components/Monitoring';

class AdminMonitoringContainer extends RoutedComponent {
  constructor(props) {
    super(props)

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

  componentWillMount() {
    this.fetchRemovalsRequested()
  }

  fetchRemovalsRequested() {
    this.props.getRemovalsRequested()
  }

  render() {
    return (
      <AdminMonitoring
        removalsRequested={this.props.requestedRemovals}
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
  getRemovalsRequested
}

export default connect(mapStateToProps, mapActionCreators)(AdminMonitoringContainer)
