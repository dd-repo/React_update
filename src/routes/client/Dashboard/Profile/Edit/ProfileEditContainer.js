import React from 'react';

import { RoutedComponent, connect } from 'routes/routedComponent';
import ProfileEdit from './components/ProfileEdit';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';
import {
  PROFILE_UPDATE_SUCCESS,
  PROFILE_SUCCESS,
  PROFILE_UPDATE_FAILURE,
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

    if(!image[0].type.match(/image.*/)) {
      this.setState({imgErrorMsg: 'the file is not an image'})
    }

    this.setState({[name]: image[0].preview});
    this.getBase64(image[0], name)
  }

  getBase64(file, name) {
    let img = document.createElement('img')
    let reader = new FileReader();
    reader.readAsDataURL(file)

    reader.onload = e => {
      img.src = e.target.result

      img.onload = () => {
        const MAX_WIDTH = 256;
        const MAX_HEIGHT = 256;
        let w = img.width;
        let h = img.height;

        if(w > h) {
          if(w > MAX_WIDTH) {
            h *= MAX_WIDTH / w
            w = MAX_WIDTH
          }
        } else {
          if(h > MAX_HEIGHT) {
            w *= MAX_HEIGHT / h
            h = MAX_HEIGHT
          }
        }

        let canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h

        let ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, w, h)
        const base64 = canvas.toDataURL('image/png')
        this.setState({...this.state, [`${name}Base64`]: base64, [name]: base64})
      }
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
        break;
      case PROFILE_SUCCESS:
        persistData(res.profile, 'profile')
        break;
        this.context.router.push('/dashboard/user-profile')
        break;
      default:
       return null;
    }
  }

  checkImgOrientation() {
    //if(this.state.avatarPreview) {
      //const img = document.createElement('img');
      //img.src = this.state.avatarPreview
      //img.onload = () => {
        ////debugger
        ////if(this.isPortrait(img)) {
        ////this.setState({style: {width: 236, height: 353}})
        ////this.setState({className: 'img-portrait'})
      //}
    //}
    return this.state.avatarPreview
  }

  render() {
    return (
      <ProfileEdit
        submitForm={this.submitForm}
        onImageUpload={this.onImageUpload}
        profile={this.props.profile}
        avatarPreview={this.checkImgOrientation()}
        driverLicensePreview={this.state.driverLicensePreview}
        currentUser={this.props.currentUser}
        isFetching={this.props.profile.isFetching}
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

