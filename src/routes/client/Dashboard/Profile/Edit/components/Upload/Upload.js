import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import { Panel, Image } from 'components';

import classes from './Upload.scss';


export default class Upload extends Component {
  constructor(props) {
    super(props)

    this.fileToUpload = this.fileToUpload.bind(this);
  }

  fileToUpload(file) {
   this.props.onImageUpload(file, this.props.input.name)
  }

  render() {
    const {
      label,
      height,
      width,
      shape,
      input,
      onImageUpload,
      image
    } = this.props
        //maxSize={2097152}
    return (
      <Dropzone className={`text-center ${classes.uploadPanel}`}
        name={input.name}
        onDrop={this.fileToUpload}
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
                  {
                    image ?
                      <Image
                        src={image}
                        backgroundText=''
                        height={ height }
                        width={ width }
                        shape={ shape }
                        className='m-r-1'
                      />
                      :
                        <div>
                          <p>
                            <i
                              className="fa fa-3x fa-user text-gray-light m-y-2">
                            </i>
                          </p>
                          <h5>Upload Your {label}</h5>
                          <p>
                            Drag a file here or
                            <a
                              href="javascript:;"
                              onClick={this.fileToUpload}> browse </a>
                            for a file to upload.
                          </p>
                          <p className='small'>
                          </p>
                        </div>
                        }
                      </div>
                      )
        }}
      </Dropzone>
    )
  }
}
