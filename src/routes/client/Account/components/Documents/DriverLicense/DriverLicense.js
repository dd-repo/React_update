import React from 'react';

import {
  Divider,
  OverlayTrigger,
  Popover,
  Button,
  Image
} from 'components'

const DriverLicense = ({ driverLicense }) => {
  return (
    <div>
      <div className='m-a-1'>
        <Divider className='m-t-1'>
          Drivers License
        </Divider>
        <dl className='text-center'>
          <dd className='text-white'>
            <span className='pull-left m-l-0 m-r-1'>
              <OverlayTrigger
                placement='bottom'
                trigger={['hover','focus']}
                overlay={(
                  <Popover
                    id="popover-primary-bottom"
                    title='Drivers License'
                    placement='bottom'
                    bsStyle='primary'
                  >
                    <p className='text-gray-darker'>
                      We ask for a driver’s license only for your protection. Some of the sites that publish your personal information require that we keep a copy of your ID on file to prove that it’s really you who’s requesting the removal. We do not need every piece of information on your ID, however. We need to be able to clearly read your name, date of birth, address, and we need to see the photo. Everything else, including the license number can be blacked out or covered with masking tape.
                    </p>
                  </Popover>
                  )}
                >
                  <Button bsStyle='link'>
                    Why do we need this?
                  </Button>
                </OverlayTrigger>
              </span>
              <Image
                src={driverLicense}
                backgroundText='Driver License'
                height={ 140 }
                width={ 240 }
                shape='rounded'
                className='m-r-1'
              />
            </dd>
          </dl>
        </div>
      </div>
  )
}
export default DriverLicense;
