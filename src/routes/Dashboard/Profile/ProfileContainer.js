import React from 'react';

import { RoutedComponent, connect } from 'routes/routedComponent';
import Profile from './components/Profile';
import { postUserProfile } from 'modules/profile';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';

class ProfileContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {}

    this.submitForm = this.submitForm.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
    this.getBase64 = this.getBase64.bind(this);
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
    if(!image[0]) {
      return
    }
    this.setState({[name]: image[0].preview});
    this.getBase64(image[0], name)
  }

  getBase64(file, name) {
    let reader = new FileReader();
    reader.readAsDataURL(file)

    reader.onload = event => {
      this.setState({...this.state, [`${name}Base64`]: event.target.result})
    }
    reader.onerror = function(event) {
      console.log(`File could not be read! code ${event.target.error}`)
    }
  }

  buildParams() {
    return {
      avatar: this.state.avatarBase64,
      driverLicense: this.state.driverLicenseBase64
    }
  }

  submitForm(data) {
    this.props.postUserProfile(this.buildParams(), 1, data.access_token)
  }

  render() {
    return (
      <Profile
        submitForm={this.submitForm}
        onImageUpload={this.onImageUpload}
        avatar={this.state.avatar}
        driverLicense={this.state.driverLicense}
      />
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

const mapActionCreators = {
  postUserProfile
}

export default connect(mapStateToProps, mapActionCreators)(ProfileContainer);
