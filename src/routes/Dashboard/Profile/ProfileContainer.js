import React from 'react';

import { RoutedComponent, connect } from 'routes/routedComponent';
import Profile from './components/Profile';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';

class ProfileContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {}

    this.submitForm = this.submitForm.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
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
    this.setState({avatar: image[0]});
  }

  submitForm(formData) {
    console.log('formData', formData)
    console.log('image', this.state.avatar)
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
});

const mapActionCreators = {
  }

export default connect()(ProfileContainer);
