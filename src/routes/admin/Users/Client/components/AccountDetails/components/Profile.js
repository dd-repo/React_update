import React from 'react';
import PropTypes from 'prop-types';
import {
  ListGroup,
  ListGroupItem,
  Label,
  Image,
  Button,
  AvatarImage
} from 'components'
import classes from '../../user.scss';

const Profile = ({ profile, handleDriverLicenseRequest }) => {
  return (
    <ListGroup className={ classes.taskDetails }>
      <ListGroupItem className='flex-space-between'>
        <h5 className={ classes.detailsKey }>
          Avatar
        </h5>
        <div className={ classes.detailsValue }>
          <AvatarImage
            src={ profile.avatar }
            size='large'
            statusPlacement='bottom'
          />
        </div>
      </ListGroupItem>
      <ListGroupItem className='flex-space-between'>
        <div>
          <h5 className={ classes.detailsKey }>
            Driver License
          </h5>
          <a
            onClick={handleDriverLicenseRequest}
          >
            <icon className='fa fa-share'></icon> Request Id
          </a>
        </div>
        <div className={ classes.detailsValue }>
          {
            profile.driverLicense &&
              <a href={profile.driverLicense} target='_blank'>
                view driver license
              </a>
          }
        </div>
      </ListGroupItem>
      <ListGroupItem className='flex-space-between'>
        <h5 className={ classes.detailsKey }>
          Maiden Name
        </h5>
        <div className={ classes.detailsValue }>
          { profile.maidenName }
        </div>
      </ListGroupItem>
      <ListGroupItem className='flex-space-between'>
        <h5 className={ classes.detailsKey }>
          Middle Name
        </h5>
        <div className={ classes.detailsValue }>
          { profile.middleName }
        </div>
      </ListGroupItem>
    </ListGroup>
  )
}

Profile.defaultProps = {
  profile: {},
  handleDriverLicenseRequest: () => {}
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  handleDriverLicenseRequest: PropTypes.func
}

export default Profile;
