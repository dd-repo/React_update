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

  onImageUpload(image) {
    this.setState({avatar: image[0].preview});
    this.getBase64(image[0])
  }

  getBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file)

    reader.onload = event => {
      this.setState({...this.state, avatarBase64: event.target.result})
    }
    reader.onerror = function(event) {
      console.log(`File could not be read! code ${event.target.error}`)
    }
  }

  buildParams() {
    return {
      profile: {
        avatar: 'base64string'
      }
    }
  }

  submitForm(data) {
    this.props.postUserProfile(this.buildParams(), 3, data.access_token)
  }

  render() {
    return (
      <Profile
        submitForm={this.submitForm}
        onImageUpload={this.onImageUpload}
        avatar={this.state.avatar}
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
