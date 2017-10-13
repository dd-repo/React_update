import React from 'react';

import Upload from './Upload';
import DriverLicense from './DriverLicense';
import { FormGroup } from 'components'

const Documents = () => {
  return (
    <div className='m-t-2'>
      <Upload>
        { ( props ) => {
          return (
            <FormGroup>
              <DriverLicense
                driverLicense={props.driverLicense}
              />
            </FormGroup>
            )}}
          </Upload>
        </div>
  )
}

export default Documents;
