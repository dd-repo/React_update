import React, { PropTypes } from 'react';
import {
  Table,
  Button,
  Modal
} from 'components'

const CancelTransaction = props => {
  const { transaction, show, toggleModal, handleClick } = props
  const buttonLabel = transaction.status === 'completed' ? 'Refund' : 'Charge'

  return (
    <Modal  show={show} onHide={() => { toggleModal('transactionEditModal', false) }}>
      <Modal.Header>
        <Modal.Title>Please confirm transaction before taking action</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Table>
          <thead>
            <tr>
              <th>
                id
              </th>
              <th>
                client name
              </th>
              <th>
                client email
              </th>
              <th>
                third party id
              </th>
              <th>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className='bg-gray-dark'>
              <td>
                { transaction.id }
              </td>
              <td>
                { transaction.client_name }
              </td>
              <td>
                { transaction.user_email }
              </td>
              <td>
                { transaction.third_party_id }
              </td>
              <td>
                { transaction.status }
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => { toggleModal('transactionEditModal', false)}}>Close</Button>
        <Button bsStyle="danger" onClick={() => { handleClick(transaction) }}>{buttonLabel}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CancelTransaction;
