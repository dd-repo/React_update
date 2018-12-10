import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';

class HomeContainer extends RoutedComponent {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  getLayoutOptions() {
    return {
      contentView: CONTENT_VIEW_STATIC,
      sidebarEnabled: false,
      navbarEnabled: false,
      footerEnabled: false,
      headerEnabled: false
    }
  }

  componentWillMount() {
    this.context.router.push('/login');
  }

  render() {
    return <span></span>;
  }
}

export default connect()(HomeContainer);
