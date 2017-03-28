import React from 'react';
import Dropzone from 'react-dropzone';

import { Panel } from 'components';

import classes from './Upload.scss';


const Upload = ({ name, input, onImageUpload, avatar }) => {
  if(!avatar) {
    return (
      <Dropzone className={`text-center ${classes.uploadPanel}`}
        name={name}
        onDrop={onImageUpload}
        accept='image/*'
      >
        {({isDragRejected, acceptedFiles, rejectedFiles }) => {
          return (
            <div>
              {rejectedFiles.length > 0 && <p className='text-danger'>File must be an image</p> }
              <p>
                <i className="fa fa-3x fa-user text-gray-light m-y-2"></i>
              </p>
              <h5>Upload Your Avatar</h5>
              <p>
                Drag a file here or <a href="javascript:;" onClick={onImageUpload}> browse</a> for a file to upload.
              </p>
              <p className='small'>
                JPG and PNG. Please choose a files under 2GB to upload. File sizes are 400 x 300px.
              </p>
            </div>
            )
        }}
      </Dropzone>
    )
  } else {
    return (
      <Panel className={`text-center ${classes.uploadPanel}`}>
        <img src={avatar} style={{width:200, height:200}}/>
      </Panel>
    )
  }
}

export default Upload;
