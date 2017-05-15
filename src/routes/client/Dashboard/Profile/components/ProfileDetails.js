import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import { Divider, Image, AvatarImage, Button } from 'components';


const ProfileDetails = ({ profile }) => {
  return (
    <div>
        <Divider className='m-t-1'>
            Avatar
        </Divider>
        <dl className='dl-horizontal'>
          <dd className='text-white'>
            <AvatarImage
              src='https://firebasestorage.googleapis.com/v0/b/tereza-photo-website.appspot.com/o/untitled-3756.jpg?alt=media&token=fabd4632-a33f-4d3e-b8da-3687b9f91a92'
              size='ex-large'
              statusPlacement='bottom'
            />
          </dd>
        </dl>

        <Divider className='m-t-1'>
            Drivers License
        </Divider>
        <dl className='dl-horizontal'>
          <dd className='text-white'>
            <Image
              src={profile.drivers_license}
              backgroundText='Driver License'
              height={ 140 }
              width={ 240 }
              shape='rounded'
              className='m-r-1'
            />
          </dd>
        </dl>

        <Divider className='m-t-1'>
            Details
        </Divider>
        <dl className='dl-horizontal'>
            <dt>Maiden Name: </dt>
            <dd className='text-white'>
              {profile.maiden_name}
            </dd>
            <dt>Middle Name: </dt>
            <dd className='text-white'>
              {profile.middle_name}
            </dd>
          </dl>
          <LinkContainer to='/dashboard/user-profile/edit'>
            <Button className='pull-right' href='javascript:;' bsStyle='primary'>
              <i className='fa fa-pencil'></i>
            </Button>
          </LinkContainer>
        </div>
)
}

export default ProfileDetails;
