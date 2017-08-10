import React from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import ProfileEditForm from './ProfileForm';

import {
    Row,
    Col,
    Label,
    Media,
    AvatarImage,
    Nav,
    NavItem,
} from 'components';

import { Colors } from 'consts';

import classes from '../../profile.scss';

const urlSectionToName = section => {
    switch(section) {
        case 'profile':
            return 'Profile Edit';
        case 'account':
            return 'Account Edit';
        case 'billing':
            return 'Billing Edit';
        case 'settings':
            return 'Settings Edit';
        case 'sessions':
            return 'Sessions Edit';
    }
};

const ProfileEdit = (props) => {
  const {
    submitForm,
    isFetching,
    onImageUpload,
    profile,
    currentUser,
    avatarPreview,
    driverLicensePreview,
  } = props

  //const { section: sectionName } = this.props.routeParams;

  return (
    <div>
      <Row>
        <Col md={ 12 } className='m-b-3'>
          <Media>
            <Media.Left align='middle'>
              <AvatarImage src={ profile.avatar } />
            </Media.Left>
            <Media.Body>
              <p className='h3 m-y-0'>
                <Link to='/dashboard/user-profile'>
                  <span>{ currentUser.first_name }</span>  <span>{ currentUser.last_name }</span>
                </Link>
                <span className='text-muted m-x-1'>
                  /
                </span>
                <span className='text-white'>
                  { urlSectionToName('profile') }
                </span>
              </p>
              <p className='m-y-0'>
                <span className='v-a-m'>
                </span>
              </p>
            </Media.Body>
          </Media>
        </Col>
      </Row>
      <Row>
        <Col lg={ 2 }>
          <Nav bsStyle="pills" stacked>
          </Nav>
        </Col>
        <Col lg={ 10 }>
          <ProfileEditForm
            submitForm={submitForm}
            onImageUpload={onImageUpload}
            profile={profile}
            avatarPreview={avatarPreview}
            driverLicensePreview={driverLicensePreview}
            isFetching={isFetching}
          />
        </Col>
      </Row>

    </div>
  )
}

export default ProfileEdit;
