import React from 'react';
import Dropzone from 'react-dropzone';

import { Panel, Image } from 'components';

import classes from './Upload.scss';


const Upload = ({ label, height, width, shape, input, onImageUpload, image }) => {
    return (
      <Dropzone className={`text-center ${classes.uploadPanel}`}
        name={input.name}
        onDrop={(file) => onImageUpload(file, input.name)}
        accept='image/*'
        multiple={false}
        preventDropOnDocument={true}
        maxSize={2097152}
      >
        {({ acceptedFiles, rejectedFiles }) => {
          return (
            <div>
              {
                rejectedFiles.length > 0 &&
                  <p
                    className='text-danger'>
                    Oh snap! Your image is either too large or not authorized
                  </p>
                  }
                  {
                    image ?
                      <Image
                        src={image}
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
                              onClick={onImageUpload}> browse </a>
                            for a file to upload.
                          </p>
                          <p className='small'>
                            JPG and PNG. Please choose a files under 2GB to upload. File sizes are 400 x 300px.
                          </p>
                        </div>
                        }
                      </div>
                      )
        }}
      </Dropzone>
    )
}

export default Upload;
