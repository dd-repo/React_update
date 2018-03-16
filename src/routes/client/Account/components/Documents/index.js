import React, { Component } from 'react';
import { connect } from 'react-redux';

import getImageDataUrl from 'utils/imageHelper';
import { updateUserProfile } from 'routes/client/Account/modules/profile';
import Upload from './Upload';
import DriverLicense from './DriverLicense';
import { FormGroup, Button } from 'components'

class Documents extends Component { 
  constructor (props) {
    super (props)
    this.state = {}
  }

  componentDidMount() {
    this.setState({
      driverLicense: this.props.profile.driver_license,
      isFetching: this.props.profile.isFetching,
      disabled: true
    })
  }

  handleUpload = file => {
    if(!file[0]) { return }
    this.setState({image: file[0], driverLicense: file[0].preview})
  }

  handleButtonClear = () => {
    this.setState({image: null, driverLicense: null})
  }

  handleButtonSave = () => {
    getImageDataUrl(this.state.image)
    .then(dataUrl => {
      const params = { driver_license: dataUrl }
      this.props.updateUserProfile(params, this.props.profile.id)
    })
  }

  render () {
    return (
      <div className='m-t-2'>
        <Upload
          handleUpload={this.handleUpload}
          isFetching={this.props.profile.isFetching}
        >
          { ( ) => {
            return (
              <FormGroup>
                <DriverLicense
                  driverLicense={this.state.driverLicense}
                />
              </FormGroup>
            )}}
          </Upload>
          <div>
            <Button 
              className='pull-right m-t-2 m-l-1'
              onClick={this.handleButtonClear}
            >
              clear
            </Button>
            <Button 
              className='pull-right m-t-2'
              disabled={!this.state.image}
              onClick={this.handleButtonSave}
            >
              Save
            </Button>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.account.profile
})

const mapActionCreators = {
  updateUserProfile
}

export default connect(mapStateToProps, mapActionCreators)(Documents);
