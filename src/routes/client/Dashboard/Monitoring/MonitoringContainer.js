import React from 'react';
import _ from 'underscore';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { MONITORING_UPDATE_SUCCESS, MONITORING_UPDATE_FAILURE } from 'modules/monitoring';
import { getMonitoring, requestRemoval } from 'modules/monitoring';
import Monitoring from './components/Monitoring';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';

class MonitoringContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = { isFetching: true }

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
    const { account_id, access_token } = this.props.currentUser
    this.props.getMonitoring(account_id, access_token)
  }

  componentWillReceiveProps(nextProps) {
    nextProps.monitoring.isFetching !== this.state.isFetching &&
      this.setState({
        isFetching: nextProps.monitoring.isFetching,
      });
  }

  handleClick(siteId) {
    const { access_token } = this.props.currentUser
    this.setState({ isFetching: true })
    this.props.requestRemoval(siteId, access_token)
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

  orderMonitoringSites() {
    return _.sortBy( this.props.monitoring.sites, 'id' )
  }

  render() {
    return (
      <Monitoring
        monitoringSites={this.orderMonitoringSites()}
        siteIds={this.state.siteIds}
        handleClick={this.handleClick}
        isFetching={this.state.isFetching}
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
