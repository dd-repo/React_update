import React, { PropTypes } from 'react';
import _ from 'underscore';
import { LinkContainer } from 'react-router-bootstrap';

import getFullName from 'utils/fullName';
import { normalizePhone } from 'utils/formHelpers'
import {
    Panel,
    Media,
    Button,
    Tabs,
    Tab,
    Nav,
    Grid,
    AvatarImage,
    Divider,
    Label,
    ScrollBarContainer,
    OverlayTrigger,
    Popover,
    Image,
    FavoriteStar
} from 'components';


import { Colors } from 'consts';

import classes from './profileDetails.scss';

const UserDetails = ({ profile, account, address, phone }) => (
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
                    <dt>Phone</dt>
                    <dd className='text-white'>
                      { normalizePhone(phone.phone_number) }
                    </dd>
                    <dt>Email</dt>
                    <dd>
                        <a href='javascript:void(0)'>
                            { account.email }
                        </a>
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
                            <p className='text-gray-darker'>We ask for a driver’s license only for your protection. Some of the sites that publish your personal information require that we keep a copy of your ID on file to prove that it’s really you who’s requesting the removal. We do not need every piece of information on your ID, however. We need to be able to clearly read your name, date of birth, address, and we need to see the photo. Everything else, including the license number can be blacked out or covered with masking tape.</p>
                          </Popover>
                          )}
                        >
                          <Button bsStyle='link'>
                            Why do we need this?
                          </Button>
                        </OverlayTrigger>
                      </span>
                      <Image
                        src={profile.driverLicense}
                        backgroundText='Driver License'
                        height={ 140 }
                        width={ 240 }
                        shape='rounded'
                        className='m-r-1'
                      />
                    </dd>
                  </dl>
                </Nav>
              </Tab>
        </Tabs>
    </div>
  </Panel>
);

UserDetails.propTypes = {
}

export default UserDetails;
