import React, { PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Documents from '../Documents';
import getFullName from 'utils/fullName';
import { normalizePhone } from 'utils/formHelpers'
import {
    Panel,
    Media,
    Button,
    Tabs,
    Tab,
    Nav,
    AvatarImage,
    Divider,
} from 'components';
import classes from './profileDetails.scss';

const ProfileDetails = ({ profile, account, address, phone }) => {
  return (
    <Panel>
      <div className={ classes.userDetails }>
        <Media>
          <Media.Left align='middle'>
            <AvatarImage
              size='large'
              src={ profile.avatar }
            />
          </Media.Left>
          <Media.Body>
            <div className={ classes.userPanelName }>
              <h4>
                { getFullName(account) }
              </h4>
            </div>
            <p>
            </p>
            <div>
              <LinkContainer to='/dashboard/user-profile/edit'>
                <Button
                  href='javascript:;'
                  bsStyle='primary'
                >
                  <i className='fa fa-pencil'></i> Edit Profile
                </Button>
              </LinkContainer>
              { ' ' }
            </div>
          </Media.Body>
        </Media>

        <Tabs defaultActiveKey='tab-1' className='m-t-3' id='user-panel-info'>
          <Tab eventKey='tab-1' title='Profile Details' className={ classes.detailsTab }>
            <Divider className='m-t-1'>
              Contact
            </Divider>
            <dl className={classes.horizontal}>
              <dt>First Name</dt>
              <dd className='text-white'>
                { account.first_name }
              </dd>
              <dt>Last Name</dt>
              <dd className='text-white'>
                { account.last_name }
              </dd>
              <dt>Email</dt>
              <dd>
                <a href='javascript:void(0)'>
                  { account.email }
                </a>
              </dd>
              <dt>Phone</dt>
              <dd className='text-white'>
                { normalizePhone(phone.phone_number) }
              </dd>
            </dl>

            <Divider className='m-t-1'>
              Address
            </Divider>
            <dl className={classes.horizontal}>
              <dt>Street</dt>
              <dd className='text-white'>
                { address.address1 }
              </dd>
              <dt>City</dt>
              <dd className='text-white'>
                { address.city }
              </dd>
              <dt>State</dt>
              <dd className='text-white'>
                { address.state }
              </dd>
              <dt>Zip</dt>
              <dd className='text-white'>
                { address.zip }
              </dd>
            </dl>
          </Tab>

          <Tab eventKey='tab-2' title='Documents'>
            <Nav className='p-t-1'>
              <Documents />
            </Nav>
          </Tab>
        </Tabs>
      </div>
    </Panel>
  );
}

ProfileDetails.defaultProps = {
  profile: {},
  account: {},
  address: {},
  phone: {}
}

ProfileDetails.propTypes = {
  profile: PropTypes.object,
  account: PropTypes.object,
  address: PropTypes.object,
  phone: PropTypes.object
}

export default ProfileDetails;
