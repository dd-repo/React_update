import React from 'react';

import {
  Panel,
  DropdownButton,
  MenuItem,
  Button,
  ListGroup,
  ListGroupItem
} from 'components'

import { formatDate } from 'utils/dateHelper';
import classes from './user.scss';

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
            <ListGroup className={ classes.taskDetails }>
              <ListGroupItem className='flex-space-between'>
                <h5 className={ classes.detailsKey }>
                  Account Id
                </h5>
                <div className={ classes.detailsValue }>
                  { account.id }
                </div>
              </ListGroupItem>
              <ListGroupItem className='flex-space-between'>
                <h5 className={ classes.detailsKey }>
                  First Name
                </h5>
                <div className={ classes.detailsValue }>
                  { account.first_name }
                </div>
              </ListGroupItem>
              <ListGroupItem className='flex-space-between'>
                <h5 className={ classes.detailsKey }>
                  Last Name
                </h5>
                <div className={ classes.detailsValue }>
                  { account.last_name }
                </div>
              </ListGroupItem>
              <ListGroupItem className='flex-space-between'>
                <h5 className={ classes.detailsKey }>
                  Email
                </h5>
                <div className={ classes.detailsValue }>
                  { account.email }
                </div>
              </ListGroupItem>
              <ListGroupItem className='flex-space-between'>
                <h5 className={ classes.detailsKey }>
                  Account Created
                </h5>
                <div className={ classes.detailsValue }>
                  {formatDate(account.created_at)}
                </div>
              </ListGroupItem>
            </ListGroup>
          </Panel>
);

export default AccountDetails;
