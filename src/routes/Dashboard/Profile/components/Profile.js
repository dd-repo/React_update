import React, { PropTypes } from 'react';

import { Panel } from 'components';
import ProfileForm from './ProfileForm';

import { Colors } from 'consts';

import classes from './Profile.scss';

const Profile = ({ submitForm, avatar, driverLicense, onImageUpload }) => {
  return (
    <div>
        <Panel
            header={
                <h4 className='panel-title'>
                    Edit Profile
                </h4>
            }
        >
          <ProfileForm
            submitForm={submitForm}
            avatar={avatar}
            driverLicense={driverLicense}
            onImageUpload={onImageUpload}
          />
        </Panel>
    </div>
  )
}

export default Profile;
