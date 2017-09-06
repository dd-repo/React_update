import React from 'react';

import { RoutedComponent, connect } from 'routes/routedComponent';
import ProfileEdit from './components/ProfileEdit';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import {
  PROFILE_UPDATE_SUCCESS,
  PROFILE_SUCCESS,
  PROFILE_UPDATE_FAILURE,
  getProfile,
  updateUserProfile
} from 'routes/client/Account/modules/profile';
import getImageDataUrl from 'utils/imageHelper';


class ProfileEditContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {}

    this.submitForm = this.submitForm.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
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

  onImageUpload(image, name) {
    if(!image[0]) { return }

    this.setState({[`${name}Preview`]: image[0].preview});

    getImageDataUrl(image[0], name)
    .then(dataUrl => {
      this.setState({...this.state, [`${name}Base64`]: dataUrl})
    })
  }

  buildParams(data) {
    return {
      avatar: this.state.avatarBase64,
      driver_license: this.state.driverLicenseBase64,
      first_name: data.first_name,
      last_name: data.last_name,
      middle_name: data.middle_name,
      maiden_name: data.maiden_name
    }
  }

  submitForm(data) {
    const payload = this.buildParams(data)
    const profile_id = this.props.profile.id
    this.props.updateUserProfile(payload, profile_id)
    .then( res => { this.doNext(res, profile_id) })
    .catch(error => { console.log('error profile update', error) })
  }

  doNext(res) {
    switch(res.type) {
      case PROFILE_UPDATE_SUCCESS:
        this.context.router.push('/dashboard/account')
        break;
      default:
       return null;
    }
  }

  render() {
    return (
      <ProfileEdit
        submitForm={this.submitForm}
        onImageUpload={this.onImageUpload}
        profile={this.props.profile}
        avatarPreview={this.state.avatarPreview}
        driverLicensePreview={this.state.driverLicensePreview}
        currentUser={this.props.currentUser}
        isFetching={this.props.profile.isFetching}
      />
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  profile: state.account.profile
});

const mapActionCreators = {
  updateUserProfile,
  getProfile
}

export default connect(mapStateToProps, mapActionCreators)(ProfileEditContainer);
