import React from 'react';

import {
  Panel,
  ListGroup,
  ListGroupItem,
  Button
} from 'components';

import classes from './user.scss';
import { formatDate } from 'utils/dateHelper';

const UserDetails = ({isFetching, user}) => (
  !isFetching &&
    <Panel
      header={
        <h4 className='panel-title'>
          User Details
        </h4>
        }
        footer={
          <div className='text-right'>
            <Button bsStyle='primary'>
              <i className="fa fa-pencil"></i> Edit User
            </Button>
          </div>
          }
        >
          <ListGroup className={ classes.taskDetails }>
            <ListGroupItem className='flex-space-between'>
              <h5 className={ classes.detailsKey }>
                User Id
              </h5>
              <div className={ classes.detailsValue }>
                { user.id }
              </div>
            </ListGroupItem>
            <ListGroupItem className='flex-space-between'>
              <h5 className={ classes.detailsKey }>
                First Name
              </h5>
              <div className={ classes.detailsValue }>
                { user.first_name }
              </div>
            </ListGroupItem>
            <ListGroupItem className='flex-space-between'>
              <h5 className={ classes.detailsKey }>
                Last Name
              </h5>
              <div className={ classes.detailsValue }>
                { user.last_name }
              </div>
            </ListGroupItem>
            <ListGroupItem className='flex-space-between'>
              <h5 className={ classes.detailsKey }>
                Email
              </h5>
              <div className={ classes.detailsValue }>
                { user.email }
              </div>
            </ListGroupItem>
            <ListGroupItem className='flex-space-between'>
              <h5 className={ classes.detailsKey }>
                AuthNet Id
              </h5>
              <div className={ classes.detailsValue }>
              </div>
            </ListGroupItem>
            <ListGroupItem className='flex-space-between'>
              <h5 className={ classes.detailsKey }>
                Number of Accounts
              </h5>
              <div className={ classes.detailsValue }>
                { user.accounts.length }
              </div>
            </ListGroupItem>
            <ListGroupItem className='flex-space-between'>
              <h5 className={ classes.detailsKey }>
                Date Assigned
              </h5>
              <div className={ classes.detailsValue }>
                {formatDate(user.created_at)}
              </div>
            </ListGroupItem>
          </ListGroup>
        </Panel>
);

export default UserDetails;
