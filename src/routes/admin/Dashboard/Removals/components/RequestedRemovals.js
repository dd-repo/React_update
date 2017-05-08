import React, { Component } from 'react';
import Loading from 'react-loading';

import RequestedRemoval from './RequestedRemoval';

import {
  Table,
  Label,
  Button,
  Row,
  Pagination,
  Modal,
} from 'components';

class RequestedRemovals extends Component {
  constructor(props) {
    super(props)
    this.state = {showModal: false, removal: {}}

    this.paginationItems = this.paginationItems.bind(this);
    this.confirmRemovalComplete = this.confirmRemovalComplete.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  paginationItems() {
    const { total, limit } = this.props.pagination
    Math.ceil(total / limit)
  }

  confirmRemovalComplete(removal) {
    this.setState({showModal: true, removal: removal})
  }

  _handleClick() {
    this.props.handleClick(this.state.removal.id, 'completed')
    this.toggleModal()
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal, removal: {}})
  }

  render() {
    const {
      removals,
      pagination,
      isFetching,
      handleClick,
      pageNum,
      getNextPage
    } = this.props

    return (
      <div>
        {
          !isFetching && pagination
            ?
              <Row>
                <div className='text-center'>
                  <Pagination
                    bsSize="medium"
                    items={this.paginationItems()}
                    activePage={pageNum}
                    boundaryLinks
                    maxButtons={5}
                    prev
                    next
                    first
                    last
                    ellipsis
                    onSelect={getNextPage}
                  />
                </div>

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
                      client age
                    </th>
                    <th>
                      client address
                    </th>
                    <th>
                      site Link
                    </th>
                    <th className='text-right'>
                      status
                    </th>
                    <th>
                      action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    removals.map(
                      removal =>
                      <RequestedRemoval
                        removal={removal}
                        key={removal.id}
                        handleClick={handleClick}
                        confirmRemovalComplete={this.confirmRemovalComplete}
                      />
                    )}
                  </tbody>
                </Table>
              </Row>
              :
                <div className='container'>
                  <div className="spinner">
                    <div className="col-md-12">
                      <Loading type='bubbles' color='white' />
                    </div>
                  </div>
                </div>
                }

                <Modal  show={this.state.showModal} onHide={this.toggleModal}>
                  <Modal.Header>
                    <Modal.Title>Please Confirm</Modal.Title>
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
                            client age
                          </th>
                          <th>
                            client address
                          </th>
                          <th>
                            site Link
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className='bg-gray-dark'>
                          <td>
                            { this.state.removal.id }
                          </td>
                          <td>
                            { this.state.removal.client_name }
                          </td>
                          <td>
                            { this.state.removal.age }
                          </td>
                          <td>
                            { this.state.removal.addresses ? this.state.removal.addresses[0].address1 : ''}
                          </td>
                          <td>
                            { this.state.removal.site }
                          </td>
                       </tr>
                      </tbody>
                    </Table>
                      </Modal.Body>

                  <Modal.Footer>
                    <Button onClick={this.toggleModal}>Close</Button>
                    <Button bsStyle="danger" onClick={this._handleClick}>Complete</Button>
                  </Modal.Footer>
              </Modal>

              </div>
    )
  }
}

export default RequestedRemovals;
