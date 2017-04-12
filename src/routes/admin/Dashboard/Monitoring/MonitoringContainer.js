import React from 'react';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
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

  render() {
    return (
      <AdminMonitoring />
    )
  }
}

export default connect()(AdminMonitoringContainer)
