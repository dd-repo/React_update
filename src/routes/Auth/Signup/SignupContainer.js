import React from 'react';
import Signup from './components/Signup';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';

class SignupContainer extends RoutedComponent {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
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
}

const mapStateToProps = state => ({
  planSelection: state.planSelection,
  currentUser: state.entity
})

const mapActionCreators = {
  postUser
}

export default connect(mapStateToProps, mapAxtionCreators)(Signup);
