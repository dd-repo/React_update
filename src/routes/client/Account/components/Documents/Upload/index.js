import React, { Component, PropTypes } from 'react';
import Loading from 'react-loading';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import { connect } from 'react-redux';
import getImageDataUrl from 'utils/imageHelper';
import { updateUserProfile } from 'routes/client/Account/modules/profile';
import classes from '../documents.scss';

class Upload extends Component {
  render() {
    const dlClasses = classNames({
      [`${classes.transparent}`]: this.props.isFetching
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
        { renderSpinner(this.props.isFetching) }
        <Dropzone className={dlClasses}
          onDrop={this.props.handleUpload}
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
                      { this.props.children() }
                      <p>
                        Drag a file here or
                        <a href="javascript:;" onClick={this.props.handleUpload}> browse </a>
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

export default Upload
