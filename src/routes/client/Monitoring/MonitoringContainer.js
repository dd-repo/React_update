import React, { PropTypes } from 'react';
import _ from 'underscore';
import { info, removeAll } from 'react-notification-system-redux';

import Privacy from './components/Privacy';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import { RoutedComponent, connect } from 'routes/routedComponent';
import {
  MONITORING_UPDATE_SUCCESS,
  MONITORING_UPDATE_FAILURE,
  fetchMonitoringRequests,
  fetchMonitoringRequestsCompleted,
  requestRemoval
} from './modules/monitoring';
import { showModal } from 'modules/modal';

const getStatusBySelector = (state, selector) => {
  return _.where(state, {status: selector})
}

const notificationOpt = {
  title: 'Privacy',
  message: 'We notice that you do not have any requested removals in progress',
  position: 'tr',
  autoDismiss: 0,
  action: {
    label: 'Click here to get started',
    callback: () => this.props.showModal('REMOVAL_INSTRUCTIONS')
  }
}


class MonitoringContainer extends RoutedComponent {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {}

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
    this.fetchMonitoringCompleted()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.inProgress) {
      nextProps.inProgress.length === 0 && !this.state.notified &&
        this.context.store.dispatch(this.createNotification())
        this.setState({notified: true})
    }
  }

  componentWillUnmount() {
    this.context.store.dispatch(removeAll())
  }

  fetchMonitoringRequests() {
    const { account_id } = this.props.currentUser
    this.props.fetchMonitoringRequests(account_id)
  }

  fetchMonitoringCompleted() {
    const { account_id } = this.props.currentUser
    const params = {
      q: {
        completed_at_not_null: '1',
        s: 'completed_at desc',
        monitoring_request_account_id_eq: account_id
      }
    }

    this.props.fetchMonitoringRequestsCompleted(params)
  }

  handleRemovalRequest = (requestId) => {
    this.props.requestRemoval(requestId)
  }

  createNotification() {
    return info({
      title: 'Privacy',
      message: 'We notice that you do not have any requested removals in progress',
      position: 'tr',
      autoDismiss: 0,
      action: {
        label: 'Click here to get started',
        callback: () => this.props.showModal('REMOVAL_INSTRUCTIONS')
      }
    })
  }

  render() {
    return (
      <Privacy
        handleRemovalRequest={this.handleRemovalRequest}
        isFetching={this.props.isFetching}
        inProgress={this.props.inProgress}
        inQueue={this.props.inQueue}
        potentialRisks={this.props.potentialRisks}
        completed={this.props.completed}
        totalCount={this.props.totalCount}
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
    potentialRisks: state.monitoring.potentialRisks,
    completed: state.monitoring.completed,
    totalCount: state.monitoring.totalCount
  }
}

const mapActionCreators = {
  fetchMonitoringRequests,
  fetchMonitoringRequestsCompleted,
  requestRemoval,
  showModal
}

export default connect(mapStateToProps, mapActionCreators)(MonitoringContainer);
