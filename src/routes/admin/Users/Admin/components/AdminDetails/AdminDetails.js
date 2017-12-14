import React, { PropTypes } from 'react';

import {
  Panel,
  ListGroup,
  ListGroupItem,
  Label,
  Button
} from 'components';
import classes from '../admin.scss';

const AdminDetails = ({ admin, showModal, handleFormSubmit }) => {
  return (
    <Panel
      header={
        <h4 className='panel-title'>
          Admin Details
        </h4>
        }
        footer={
          <div className='text-right'>
            <Button
              onClick={() => { showModal('ADMIN_UPDATE', admin, handleFormSubmit)}}
              bsStyle='primary'
            >
              <i className="fa fa-pencil"></i> Edit Admin
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
                { admin.id }
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
                  bsStyle={admin.is_active ? 'success' : 'danger'}>
                  {admin.is_active ? 'Active' : 'Inactive'}
                </Label>
              </div>
            </ListGroupItem>
            <ListGroupItem className='flex-space-between'>
              <h5 className={ classes.detailsKey }>
                First Name
              </h5>
              <div className={ classes.detailsValue }>
                { admin.first_name }
              </div>
            </ListGroupItem>
            <ListGroupItem className='flex-space-between'>
              <h5 className={ classes.detailsKey }>
                Last Name
              </h5>
              <div className={ classes.detailsValue }>
                { admin.last_name }
              </div>
            </ListGroupItem>
            <ListGroupItem className='flex-space-between'>
              <h5 className={ classes.detailsKey }>
                Email
              </h5>
              <div className={ classes.detailsValue }>
                { admin.email }
              </div>
            </ListGroupItem>
            <ListGroupItem className='flex-space-between'>
              <h5 className={ classes.detailsKey }>
                Role
              </h5>
              <div className={ classes.detailsValue }>
                {admin.role}
              </div>
            </ListGroupItem>
            <ListGroupItem className='flex-space-between'>
              <h5 className={ classes.detailsKey }>
                Date Assigned
              </h5>
              <div className={ classes.detailsValue }>
                {admin.created_at}
              </div>
            </ListGroupItem>
          </ListGroup>
        </Panel>
  )
}

AdminDetails.propTypes = {
  admin: PropTypes.object.isRequired
}

export default AdminDetails;
