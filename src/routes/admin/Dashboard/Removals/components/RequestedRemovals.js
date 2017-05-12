import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Loading from 'react-loading';

import RequestedRemoval from './RequestedRemoval';

import {
  Table,
  Label,
  Button,
  Row,
  Pagination,
  Modal,
  FormGroup,
  FormControl,
  Col,
  ControlLabel,
  Alert,
} from 'components';

let validation;

class RequestedRemovals extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this._handleClick = this._handleClick.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }

  _handleClick() {
    const removed_url = ReactDOM.findDOMNode(this.input)

    if(removed_url) {
      if(removed_url.value !== '') {
        this.props.updateRemovalStatus(this.props.removalInProcess, removed_url.value)
        this.props.hideModal()
      } else {
        this.setState({validation:'Please enter the removal url'})
      }
    } else {
      this.props.updateRemovalStatus(this.props.removalInProcess)
      this.props.hideModal()
    }
  }

  renderModal() {
    const {
      showModal,
      hideModal,
      removalInProcess,
    } = this.props

    const {
      id,
      client_name,
      age,
      addresses,
      site,
      nextStatus,
    } = removalInProcess

    const renderTitle = removalInProcess.status === 'inprogress' ? 'Please confirm that this removal is complete' : 'Please provide the removal url'

    const renderInput = (
      <FormGroup>
          Removal URL
          <FormControl ref={(input) => this.input = input} type="text" placeholder='http://blitzmonitoring.com/'/>
          <span className='text-danger'>{this.state.validation}</span>
      </FormGroup>
    )

    return (
      <Modal  show={showModal} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>{renderTitle}</Modal.Title>
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
                  { id }
                </td>
                <td>
                  { client_name }
                </td>
                <td>
                  { age }
                </td>
                <td>
                  { addresses ? addresses[0].address1 : ''}
                </td>
                <td>
                  { site }
                </td>
              </tr>
            </tbody>
          </Table>
          { nextStatus === 'inprogress' && renderInput }
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={hideModal}>Close</Button>
          <Button bsStyle="danger" onClick={this._handleClick}>Submit</Button>
        </Modal.Footer>
      </Modal>
    )
  }


  render() {
    const {
      removals,
      isFetching,
      handleClick,
      pageNum,
      getNextPage,
      paginationItems,
      showModal,
      hideModal,
      removalInProcess,
    } = this.props

    return (
      <div>
        {
          !isFetching
            ?
              <Row>
                <div className='text-center'>
                  <Pagination
                    bsSize="medium"
                    items={paginationItems}
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

                { this.renderModal() }

              </div>
    )
  }
}

export default RequestedRemovals;
