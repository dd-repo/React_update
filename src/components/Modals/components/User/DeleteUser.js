import React, { PropTypes } from 'react';
import {
  Table,
  Row,
  Col,
  Button,
  Modal
} from 'components'

const DeleteUser = props => {
  const { initialValues: user } = props
  return (
    <Modal  show={true} onHide={props.hideModal}>
      <Modal.Header>
        <Modal.Title>
          Are you sure you want to delete this user?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Once you click delete this user they will be gone forever.
        </p>
        <Table>
          <thead>
            <tr>
              <th>
                id
              </th>
              <th>
                User name
              </th>
              <th>
                User email
              </th>
              <th>
                Group
              </th>
              <th>
                Role
              </th>
            </tr>
          </thead>
          <tr>
            <td>
              { user.id }
            </td>
            <td>
              { user.name }
            </td>
            <td>
              { user.email }
            </td>
            <td>
              { user.group }
            </td>
            <td>
              { user.role }
            </td>
          </tr>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle='danger'
          onClick={() => props.handleDeleteUser(user.id)}
        >
          Delete
        </Button>
        <Button onClick={props.hideModal}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

DeleteUser.propTypes = {
  hideModal: PropTypes.func.isRequired,
  handleDeleteUser: PropTypes.func.isRequired
}

export default DeleteUser;




