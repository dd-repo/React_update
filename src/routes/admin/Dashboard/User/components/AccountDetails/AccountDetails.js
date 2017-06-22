import React from 'react';

import {
  Panel,
  DropdownButton,
  MenuItem,
  Button,
  ListGroup,
  ListGroupItem,
  Label,
  Tab,
  Nav,
  NavItem,
} from 'components'

import Account from './components/Account';
import Keywords from './components/Keywords';
import Addresses from './components/Addresses';
import Phones from './components/Phones';
import Profile from './components/Profile';
import { formatDate } from 'utils/dateHelper';
import classes from '../user.scss';

const AccountDetails = ({isFetching, user, account, handleAccountSelect}) => (
  !isFetching &&
    <Panel
      header={
        <h4 className='panel-title'>
          Account Details
        </h4>
        }
        footer={
          <div>
            <DropdownButton
              bsStyle='primary'
              onSelect={(e) => handleAccountSelect(e)}
              title={
                <span>
                  <span className='m-x-1'>
                    Accounts
                  </span>
                </span>
                }
                id='dropdown-accounts-select'
              >
                {
                  user.accounts.map(account => (
                    <MenuItem eventKey={account.id} key={account.id}>
                      { `${account.first_name} ${account.last_name}` }
                    </MenuItem>
                    ))
                }
              </DropdownButton>
              <span className='pull-right'>
                <Button bsStyle='primary'>
                  <i className="fa fa-pencil"></i> Edit Account
                </Button>
              </span>
            </div>
            }
          >
            <Tab.Container id="profile-tabs" defaultActiveKey="overview">
              <div>
                <Nav bsStyle='tabs'>
                  <NavItem eventKey='overview'>
                    Account
                  </NavItem>
                  <NavItem eventKey='keywords'>
                    Keywords
                  </NavItem>
                  <NavItem eventKey='addresses'>
                    Addresses
                  </NavItem>
                  <NavItem eventKey='phones'>
                    Phones
                  </NavItem>
                  <NavItem eventKey='profile'>
                    Profile
                  </NavItem>
                </Nav>
                <Tab.Content animation>
                  <Tab.Pane eventKey='overview'>
                    <Account account={account} />
                  </Tab.Pane>
                <Tab.Pane eventKey='keywords'>
                  <Keywords keywords={account.keywords} />
                </Tab.Pane>
                  <Tab.Pane eventKey='phones'>
                    <Phones phones={account.phones} />
                </Tab.Pane>
                  <Tab.Pane eventKey='addresses'>
                    <Addresses addresses={account.addresses} />
                </Tab.Pane>
                <Tab.Pane eventKey='profile'>
                  <Profile profile={account.profile} />
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </Panel>
);

export default AccountDetails;
