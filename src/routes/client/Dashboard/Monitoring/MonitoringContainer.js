import React from 'react';
import _ from 'underscore';

import MonitoringSites from './components/MonitoringSites';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import { RoutedComponent, connect } from 'routes/routedComponent';
import {
  MONITORING_UPDATE_SUCCESS,
  MONITORING_UPDATE_FAILURE,
  getMonitoring,
  requestRemoval
} from './modules/monitoring';

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
    this.props.requestRemoval(request_id)
    .then( res => { this.doNext(res) })
    .catch( error => { console.log('error in monitoring removal', error) })
  }

  doNext(res) {
    switch(res.type) {
      case MONITORING_UPDATE_SUCCESS:
        this.fetchMonitoringRequests();
        break;
        case MONITORING_UPDATE_FAILURE:
          this.setState({ isFetching: false });
          break;
        default:
          return null;
    }
  }

  render() {
    const sortedMonitoringSites = (
     _.sortBy( this.props.monitoring.sites, 'id' )
    )

    return (
      <MonitoringSites
        monitoringSites={sortedMonitoringSites}
        siteIds={this.state.siteIds}
        handleClick={this.handleClick}
        isFetching={this.props.monitoring.isFetching}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    monitoring: state.monitoring
  }
}

const mapActionCreators = {
  getMonitoring,
  requestRemoval
}

export default connect(mapStateToProps, mapActionCreators)(MonitoringContainer);
