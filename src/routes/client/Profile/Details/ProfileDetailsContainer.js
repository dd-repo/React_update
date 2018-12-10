import PropTypes from 'prop-types';
import React from 'react';

import { RoutedComponent, connect } from 'routes/routedComponent';
import Profile from './components/Profile';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import {
  PROFILE_SUCCESS,
  getProfile
} from 'routes/client/Account/modules/profile';

class ProfileContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {}

    this.fetchProfile = this.fetchProfile.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
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
    this.fetchProfile()
  }

  fetchProfile() {
    this.props.getProfile(this.props.profile.id)
  }

  render() {
    return (
      <Profile
        profile={this.props.profile}
        currentUser={this.props.currentUser}
      />
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  profile: state.account.profile
});

const mapActionCreators = {
  getProfile
}

export default connect(mapStateToProps, mapActionCreators)(ProfileContainer);
