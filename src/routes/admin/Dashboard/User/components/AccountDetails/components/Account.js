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
        Status
      </h5>
      <div className={ classes.detailsValue }>
        <Label
          outline
          className='text-uppercase'
          bsStyle={account.is_active ? 'primary' : 'danger'}>
          { account.is_active ? 'Active' : 'Inactive' }
        </Label>
      </div>
    </ListGroupItem>
  </ListGroup>
)

export default Account;
