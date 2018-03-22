import React, { Component } from 'react'
import PropTypes from 'prop-types'
import infosweepApi from 'services/infosweepApi'

import {
  Panel,
  ListGroup,
  DropdownButton,
  MenuItem,
  ListGroupItem,
  Modal,
  Label,
  Button
} from 'components'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import { formatDate } from 'utils'

import classes from '../user.scss'

const passwordReset = 'passwordReset'
const introEmail = 'introEmail'
const createSOLead = 'createSOLead'
const ACCOUNT_OPTIONS_CONFIG = {
  passwordReset: 'send password reset email to client',
  introEmail: 'send intro email to client',
  createSOLead: 'create a Sales Optima lead'
}

class ClientDetails extends Component {
  constructor() {
    super() 
    this.state = {showModal: false}

    this.hideModal = this.hideModal.bind(this)
    this._handleStatusUpdate = this._handleStatusUpdate.bind(this)
    this._handleAccountOptions = this._handleAccountOptions.bind(this)
  }
  
  showAccountOptionsModal (target) {
    this.setState({ showModal: true, target })
  }

  hideModal () {
    this.setState({ showModal: false })
  }

  _handleStatusUpdate () {
    this.props.client.is_active
      ? this.props.showModal('UPDATE_USER_STATUS')
      : this.props.updateUserStatus(client)
  }

  _handleAccountOptions () {
    this.hideModal()
    let payload;
    switch(this.state.target) {
      case passwordReset:
        this.props.handlePasswordReset()
        break;
      case introEmail:
        payload = { user_id: this.props.client.id }
        infosweepApi.patch('admin/api/emails/send-intro-email', payload)
        break;
      case createSOLead:
        payload = { user_id: this.props.client.id }
        infosweepApi.patch('/admin/api/create-lead', payload)
        break;
    }
  }

  render () {
    const {
      accounts,
      client,
      showModal
    } = this.props

    const renderConfirmationModal = (
      <Modal show={this.state.showModal}>
        <Modal.Header>
          <Modal.Title>
            Please Confirm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`Are you sure you want to ${ACCOUNT_OPTIONS_CONFIG[this.state.target]}?`}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this._handleAccountOptions }>
            Yes
          </Button>
          <Button onClick={this.hideModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    )

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
              onSelect={target => this.showAccountOptionsModal(target)}
              id='accountOptions'
            >
              <MenuItem
                eventKey={passwordReset}
              >
                Send Password Reset
              </MenuItem>
              <MenuItem
                eventKey={introEmail}
              >
                Send Intro Email
              </MenuItem>
              <MenuItem
                eventKey={createSOLead}
              >
              Create SO Lead
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
        { renderConfirmationModal }
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
                onChange={this._handleStatusUpdate}
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
}

ClientDetails.propsTypes = {
  client: PropTypes.object,
  accounts: PropTypes.array,
  showModal: PropTypes.func,
  handlePasswordReset: PropTypes.func,
  toggleModal: PropTypes.func
}

export default ClientDetails
