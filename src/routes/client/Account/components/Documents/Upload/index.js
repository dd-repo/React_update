import React, { Component, PropTypes } from 'react';
import Loading from 'react-loading';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import { connect } from 'react-redux';
import getImageDataUrl from 'utils/imageHelper';
import { updateUserProfile } from 'routes/client/Account/modules/profile';
import classes from '../documents.scss';

class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.setState({
      driverLicense: this.props.profile.driver_license,
      isFetching: this.props.profile.isFetching,
      disabled: true
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.profile) {
      !nextProps.profile.isFetching && setTimeout(() => (
        this.setState({isFetching: nextProps.profile.isFetching })
      ), 3000)
      nextProps.profile.isFetching && (
        this.setState({isFetching: nextProps.profile.isFetching})
      )
    }
  }

  handleUpload = file => {
    if(!file[0]) { return }
    this.setState({driverLicense: file[0].preview})

    getImageDataUrl(file[0])
    .then(dataUrl => {
      const params = { driver_license: dataUrl }
      this.props.updateUserProfile(params, this.props.profile.id)
    })
  }

  handleButtonClick = () => {
    this.setState({driverLicense: null})
  }

  render() {

    const dlClasses = classNames({
      [`${classes.transparent}`]: this.state.isFetching
    }, 'text-center', classes.uploadPanel)

    const renderSpinner = isFetching => (
      isFetching &&
        <div className={classes.overlay}>
          <div className={classes.spinner}>
            <div>
              <Loading type='spinningBubbles' color='white' />
            </div>
          </div>
        </div>
    )

    return (
      <div>
        { renderSpinner(this.state.isFetching) }
        <Dropzone className={dlClasses}
          onDrop={this.handleUpload}
          accept='image/*'
          multiple={false}
          preventDropOnDocument={true}
        >
          {({ acceptedFiles, rejectedFiles }) => {
            return (
              <div>
                {
                  rejectedFiles.length > 0 &&
                    <p
                      className='text-danger'>
                      Sorry! Your upload is not authorized. It must be an image.
                    </p>
                    }
                    <div>
                      { this.props.children(this.state) }
                      <p>
                        Drag a file here or
                        <a href="javascript:;" onClick={this.handleUpload}> browse </a>
                        for a file to upload.
                      </p>
                      <p className='small'>
                      </p>
                    </div>
                  </div>
                  )
          }}
        </Dropzone>
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

export default connect(mapStateToProps, mapActionCreators)(Upload)
