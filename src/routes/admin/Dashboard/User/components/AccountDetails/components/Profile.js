import React from 'react';

import {
  ListGroup,
  ListGroupItem,
  Label,
  Image,
  AvatarImage
} from 'components'

import classes from '../../user.scss';

const Profile = ({profile}) => (
  <ListGroup className={ classes.taskDetails }>
    <ListGroupItem className='flex-space-between'>
      <h5 className={ classes.detailsKey }>
        Avatar
      </h5>
      <div className={ classes.detailsValue }>
        <AvatarImage
          src={ profile.avatar_url }
          size='large'
          statusPlacement='bottom'
        />
      </div>
    </ListGroupItem>
    <ListGroupItem className='flex-space-between'>
      <h5 className={ classes.detailsKey }>
        Driver License
      </h5>
      <div className={ classes.detailsValue }>
        <Image
          src={profile.driver_license_url}
          backgroundText='Driver License'
          height={ 140 }
          width={ 240 }
          shape='rounded'
          className='m-r-1'
        />
      </div>
    </ListGroupItem>
    <ListGroupItem className='flex-space-between'>
      <h5 className={ classes.detailsKey }>
        Maiden Name
      </h5>
      <div className={ classes.detailsValue }>
        { profile.maiden_name }
      </div>
    </ListGroupItem>
    <ListGroupItem className='flex-space-between'>
      <h5 className={ classes.detailsKey }>
        Middle Name
      </h5>
      <div className={ classes.detailsValue }>
        { profile.middle_name }
      </div>
    </ListGroupItem>
  </ListGroup>
)

export default Profile;
