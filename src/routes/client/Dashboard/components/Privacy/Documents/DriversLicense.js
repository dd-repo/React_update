import React from 'react';
import Dropzone from 'react-dropzone';
import { reduxForm, Field } from 'redux-form';

import DriverLicense from 'routes/client/Account/components/DriverLicense';
import Upload from 'routes/client/Profile/Edit/components/Upload';
import {
  FormGroup,
  Image
} from 'components'
import classes from './upload.scss'

const Documents = () => {

  const fileToUpload = (file) => {
   //this.props.onImageUpload(file, this.props.input.name)
  }

  const renderUpload = () => (
    <Dropzone className={`text-center ${classes.uploadPanel}`}
      name='driver_license'
      onDrop={fileToUpload}
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
                  <DriverLicense
                    driverLicense={' '}
                  />
                  <p>
                    Drag a file here or
                    <a
                      href="javascript:;"
                      onClick={fileToUpload}> browse </a>
                    for a file to upload.
                  </p>
                  <p className='small'>
                  </p>
                </div>
              </div>
              )
      }}
    </Dropzone>
  )

  return (
    <div className='m-t-2'>
      <FormGroup>
        <Field
          name='driverLicense'
          label='Driver license'
          height={ 140 }
          width={ 240 }
          shape='rounded'
          component={renderUpload}
          onImageUpload={() => {}}
        />
      </FormGroup>
    </div>
  )
}

export default reduxForm({
  form: 'driverLicenseForm'
})(Documents);
