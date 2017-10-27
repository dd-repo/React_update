import React from 'react';

import {
  ListGroup,
  ListGroupItem,
  Label,
} from 'components'

import classes from '../../user.scss';

const Account = ({account}) => (
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
    Signin Count
      </h5>
      <div className={ classes.detailsValue }>
        { account.sign_in_count }
      </div>
    </ListGroupItem>
    <ListGroupItem className='flex-space-between'>
      <h5 className={ classes.detailsKey }>
    Last Time Sign In
      </h5>
      <div className={ classes.detailsValue }>
        { account.last_time_sign_in }
      </div>
    </ListGroupItem>
  </ListGroup>
)

export default Account;
