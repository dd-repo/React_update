import React, { PropTypes } from 'react';

import {
  Panel,
  ListGroup,
  ListGroupItem,
  Label,
  Button
} from 'components';

import classes from '../user.scss';

const UserDetails = props => {
  const { accounts , user, showModal, handlePasswordReset } = props
  return (
    <Panel
      header={
        <h4 className='panel-title'>
          Subscriber Details
        </h4>
        }
        footer={
          <div className='text-right'>
            <Button
              onClick={() => { showModal('USER', user)}}
              bsStyle='primary'
            >
              <i className="fa fa-pencil"></i> Edit Subscriber
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
                Status
              </h5>
              <div className={ classes.detailsValue }>
                <Label
                  outline
                  className='text-uppercase'
                  bsStyle={user.is_active ? 'success' : 'danger'}>
                  {user.is_active ? 'Active' : 'Inactive'}
                </Label>
              </div>
            </ListGroupItem>
            <ListGroupItem className='flex-space-between'>
              <h5 className={ classes.detailsKey }>
                Full Name
              </h5>
              <div className={ classes.detailsValue }>
                { user.fullName }
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
                Password
              </h5>
              <Button
                className='userDetailEditButton'
                onClick={handlePasswordReset}
                bsStyle='link'
              >
                <icon className='fa fa-share'></icon> Send Password Reset
              </Button>
            </ListGroupItem>
            <ListGroupItem className='flex-space-between'>
              <h5 className={ classes.detailsKey }>
                Number of Accounts
              </h5>
              <div className={ classes.detailsValue }>
                { accounts.length }
              </div>
            </ListGroupItem>
            <ListGroupItem className='flex-space-between'>
              <h5 className={ classes.detailsKey }>
                Date Assigned
              </h5>
              <div className={ classes.detailsValue }>
                {user.created_at}
              </div>
            </ListGroupItem>
          </ListGroup>
        </Panel>
  )
}

UserDetails.propsTypes = {
  user: PropTypes.object,
  accounts: PropTypes.array,
  showModal: PropTypes.func,
  handlePasswordReset: PropTypes.func,
  toggleModal: PropTypes.func
}

export default UserDetails;
