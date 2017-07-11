import React, { PropTypes } from 'react';
import {
  Table,
  Button,
  Modal
} from 'components'

const CancelSubscription = ({subscription, showModal, hideModal, handleClick}) => (
  <Modal  show={showModal} onHide={hideModal}>
    <Modal.Header>
      <Modal.Title>Please Confirm</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Table>
        <thead>
          <tr>
            <th>
              subscription id
            </th>
            <th>
              client name
            </th>
            <th>
              user id
            </th>
            <th>
              plan id
            </th>
            <th>
              plan description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className='bg-gray-dark'>
            <td>
              { subscription.id }
            </td>
            <td>
              { subscription.client_name }
            </td>
            <td>
              { subscription.user_id }
            </td>
            <td>
              { subscription.plan_id }
            </td>
            <td>
              { subscription.plan_description }
            </td>
          </tr>
        </tbody>
      </Table>
    </Modal.Body>

    <Modal.Footer>
      <Button onClick={hideModal}>Close</Button>
      <Button bsStyle="danger" onClick={handleClick}>Cancel Subscription</Button>
    </Modal.Footer>
  </Modal>
)

CancelSubscription.propTypes = {
  hideModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default CancelSubscription;
