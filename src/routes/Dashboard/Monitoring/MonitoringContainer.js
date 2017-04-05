import React from 'react';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { getMonitoring } from 'modules/monitoring';
import Monitoring from './components/Monitoring';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';

class MonitoringContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {siteIds: [], isFetching: true }

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const { account_id, access_token } = this.props.currentUser
    this.props.getMonitoring(account_id, access_token)
}

  componentWillReceiveProps(nextProps) {
    nextProps.monitoring.isFetching !== this.state.isFetching &&
      this.setState({
        isFetching: nextProps.monitoring.isFetching,
      });
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

  handleClick(siteId) {
    this.setState(prevState => ({
      siteIds: [...prevState.siteIds, siteId],
    }));
  }

  render() {
    return (
      <Monitoring
        monitoringSites={this.props.monitoring.sites}
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
  getMonitoring
}

export default connect(mapStateToProps, mapActionCreators)(MonitoringContainer);
