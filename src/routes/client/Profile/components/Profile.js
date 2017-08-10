import React, { PropTypes } from 'react';

import {
    Row,
    Col,
    Panel,
} from 'components';
import ProfileDetails from './ProfileDetails';

import { Colors } from 'consts';

import classes from './profile.scss';

const Profile = ({ profile }) => {
  return (
    <div>
      <Row>
        <Col lg={ 8 }>
          <ProfileDetails
            profile={profile}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Profile;
