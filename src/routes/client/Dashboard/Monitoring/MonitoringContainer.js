import React from 'react';
import _ from 'underscore';

import MonitoringSites from './components/MonitoringSites';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import { RoutedComponent, connect } from 'routes/routedComponent';
import {
  MONITORING_UPDATE_SUCCESS,
  MONITORING_UPDATE_FAILURE,
  getMonitoring,
  monitoringRequestRemoval
} from './modules/monitoring';

const getStatusBySelector = (state, selector) => {
    return _.where(state, {status: selector})
  }


class MonitoringContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {}

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

  componentWillMount() {
    this.fetchMonitoringRequests()
}

  fetchMonitoringRequests() {
    const { account_id } = this.props.currentUser
    this.props.getMonitoring(account_id)
  }

  handleClick(request_id) {
    this.props.monitoringRequestRemoval(request_id)
  }

  render() {

    return (
      <MonitoringSites
        handleClick={this.handleClick}
        isFetching={this.props.isFetching}
        inProgress={this.props.inProgress}
        inQueue={this.props.inQueue}
        potentialRisks={this.props.potentialRisks}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    isFetching: state.monitoring.isFetching,
    inProgress: state.monitoring.inProgress,
    inQueue: state.monitoring.inQueue,
    potentialRisks: state.monitoring.potentialRisks
  }
}

const mapActionCreators = {
  getMonitoring,
  monitoringRequestRemoval
}

export default connect(mapStateToProps, mapActionCreators)(MonitoringContainer);
