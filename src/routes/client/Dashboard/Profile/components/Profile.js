import React, { PropTypes } from 'react';

import {
    Row,
    Col,
    Panel,
    Button,
    Media,
    Tabs,
    Tab,
    Nav,
    NavItem,
    Badge,
    AvatarImage,
    FavoriteStar,
    Divider,
    Label
} from 'components';
import ProfileForm from './ProfileForm';
import ProfileDetails from './ProfileDetails';

import { Colors } from 'consts';

import classes from './Profile.scss';

const Profile = ({
  submitForm,
  avatarPreview,
  driverLicensePreview,
  profile,
  onImageUpload
}) => {
  return (
    <div>
        <Row>
          <Col lg={ 8 }>
            <Tab.Container id="profile-tabs" defaultActiveKey="profile-details">
              <div>
                <Nav bsStyle='tabs'>
                  <NavItem eventKey='profile-details'>
                    Profile Details
                  </NavItem>
                </Nav>
                <Tab.Content animation>
                  <Tab.Pane eventKey='profile-details'>
                    <ProfileDetails
                      profile={profile}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Tab.Container>
          </Col>
        </Row>
      </div>
  )
}

export default Profile;
