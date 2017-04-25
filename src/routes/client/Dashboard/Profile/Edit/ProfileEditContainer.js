import React from 'react';

import { RoutedComponent, connect } from 'routes/routedComponent';
import ProfileForm from '../components/ProfileForm';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import {
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,
  PROFILE_SUCCESS,
  getProfile,
  postUserProfile
} from '../modules/profile';
import { persistData } from 'localStorage';

class ProfileEditContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {}

    this.submitForm = this.submitForm.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
    this.getBase64 = this.getBase64.bind(this);
    this.fetchProfile = this.fetchProfile.bind(this);
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

  componentWillMount() {
    this.fetchProfile()
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
    this.props.postUserProfile(payload, profile_id)
    .then( res => { this.doNext(res, profile_id) })
    .catch(error => { console.log('error profile update', error) })
  }

  fetchProfile() {
    this.props.getProfile(this.props.profile.id)
    .then( res => { this.doNext(res) })
    .catch( error => { console.log('error profile fetch', error) })
  }

  doNext(res) {
    switch(res.type) {
      case PROFILE_UPDATE_SUCCESS:
        this.fetchProfile()
        this.setState({isFetching: false})
        break;
      case PROFILE_UPDATE_FAILURE:
        this.setState({
          errorMessage: res.error.data.errorMessage
        })
      case PROFILE_SUCCESS:
        this.setState({isFetching: false})
        persistData(res.profile, 'profile')
        break;
      default:
       return null;
    }
  }

  render() {
    return (
      <ProfileForm
        submitForm={this.submitForm}
        onImageUpload={this.onImageUpload}
        profile={this.props.profile}
        avatarPreview={this.state.avatar}
        driverLicensePreview={this.state.driverLicense}
      />
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  profile: state.profile
});

const mapActionCreators = {
  postUserProfile,
  getProfile
}

export default connect(mapStateToProps, mapActionCreators)(ProfileEditContainer);

