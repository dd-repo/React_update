import React, { PropTypes } from 'react'
import infosweepApi from 'services/infosweepApi'

import {
  Panel,
  ListGroup,
  DropdownButton,
  MenuItem,
  ListGroupItem,
  Label,
  Button
} from 'components'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import { formatDate } from 'utils'

import classes from '../user.scss'

const ClientDetails = ({
  accounts,
  client,
  showModal,
  updateUserStatus,
  handlePasswordReset
}) => {
  const _handleStatusUpdate = () => {
    client.is_active
      ? showModal('UPDATE_USER_STATUS')
      : updateUserStatus(client)
  }

  const _handleAccountOptions = target => {
    switch(target) {
      case 'passwordReset':
        handlePasswordReset()
        break;
      case 'introEmail':
        const payload = { user_id: client.id }
        infosweepApi.patch('admin/api/emails/send-intro-email', payload)
        break;
    }
  }

  return (
    <Panel
      header={
        <h4 className='panel-title'>
          Subscriber Details
        </h4>
        }
      footer={
        <div>
          <DropdownButton
            bsStyle='primary'
            title='Account options'
            onSelect={target => { _handleAccountOptions(target) }}
          >
            <MenuItem
              eventKey='passwordReset'
            >
              Send Password Reset
            </MenuItem>
            <MenuItem
              eventKey='introEmail'
            >
              Send Intro Email
            </MenuItem>
          </DropdownButton>
          <span className='pull-right'>
            <Button
              onClick={() => { showModal('USER', client) }}
              bsStyle='primary'
            >
              <i className="fa fa-pencil"></i> Edit Subscriber
            </Button>
          </span>
        </div>
          }
        >
          <ListGroup className={classes.taskDetails}>
            <ListGroupItem className='flex-space-between'>
              <h5 className={classes.detailsKey}>
                User Id
              </h5>
              <div className={classes.detailsValue}>
                {client.id}
              </div>
            </ListGroupItem>
            <ListGroupItem className='flex-space-between'>
              <h5 className={classes.detailsKey}>
                Status
              </h5>
              <div className={classes.detailsValue}>
                <Toggle
                  className="v-a-m m-r-1"
                  checked={client.is_active}
                  icons={false}
                  onChange={_handleStatusUpdate}
                />
                <Label
                  outline
                  className='text-uppercase'
                  bsStyle={client.is_active ? 'success' : 'danger'}>
                  {client.is_active ? 'Active' : 'Inactive'}
                </Label>
              </div>
            </ListGroupItem>
            <ListGroupItem className='flex-space-between'>
              <h5 className={classes.detailsKey}>
                Full Name
              </h5>
              <div className={classes.detailsValue}>
                {client.fullName}
              </div>
            </ListGroupItem>
            <ListGroupItem className='flex-space-between'>
              <h5 className={classes.detailsKey}>
                Email
              </h5>
              <div className={classes.detailsValue}>
                {client.email}
              </div>
            </ListGroupItem>
            <ListGroupItem className='flex-space-between'>
              <h5 className={classes.detailsKey}>
                Number of Accounts
              </h5>
              <div className={classes.detailsValue}>
                {accounts.length}
              </div>
            </ListGroupItem>
            <ListGroupItem className='flex-space-between'>
              <h5 className={classes.detailsKey}>
                Date Assigned
              </h5>
              <div className={classes.detailsValue}>
                {client.created_at}
              </div>
            </ListGroupItem>
            <ListGroupItem className='flex-space-between'>
              <h5 className={classes.detailsKey}>
                Active until
              </h5>
              <div className={classes.detailsValue}>
                {formatDate(client.active_until)}
              </div>
            </ListGroupItem>
          </ListGroup>
        </Panel>
  )
}

ClientDetails.propsTypes = {
  client: PropTypes.object,
  accounts: PropTypes.array,
  showModal: PropTypes.func,
  handlePasswordReset: PropTypes.func,
  toggleModal: PropTypes.func
}

export default ClientDetails
