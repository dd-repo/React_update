import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  Table,
  Button,
  Modal
} from 'components'

import { updateTransaction } from 'routes/admin/Dashboard/User/modules/transactions';

const TransactionUpdateModal = ({
  initialValues: transaction,
  hideModal,
  dispatch
}) => {

  const buttonLabel = transaction.status === 'completed' ? 'Refund' : 'Charge'

  const handleTransactionUpdate = () => {
    hideModal()
    dispatch(updateTransaction(transaction))
  }

  return (
    <Modal  show={true} onHide={hideModal}>
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
        <Button onClick={hideModal}>Close</Button>
        <Button bsStyle="danger" onClick={handleTransactionUpdate}>{buttonLabel}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default connect()(TransactionUpdateModal);
