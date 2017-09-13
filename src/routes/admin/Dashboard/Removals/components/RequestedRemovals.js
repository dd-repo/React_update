import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

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
  SearchBar,
  Loader,
  FlashMessage
} from 'components';

class RequestedRemovals extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this._handleClick = this._handleClick.bind(this);
    this.updateRemovalStatus = this.updateRemovalStatus.bind(this);
    this.validateUrlInput = this.validateUrlInput.bind(this);
  }

  _handleClick() {
    const removed_url = ReactDOM.findDOMNode(this.input)

    removed_url && this.validateUrlInput(removed_url.value)

    !removed_url && this.updateRemovalStatus()
  }

  validateUrlInput(url) {
    url !== '' ?
      (
       this.updateRemovalStatus(url),
       this.setState({validation: null})
      )
        :
          this.setState({validation:'Please enter the removal url'})
  }

  updateRemovalStatus(url) {
    this.props.updateRemovalStatus(this.props.removalInProcess, url)
    this.props.hideModal()
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
      resultCount,
      handleSearch,
      queryName
    } = this.props

    const {
      id,
      client_name,
      age,
      addresses,
      site,
      nextStatus,
      status,
    } = removalInProcess

    const renderTitle = status === 'inprogress' ? 'Please confirm that this removal is complete' : 'Please provide the removal url'


    const renderInput = (
      <FormGroup>
          Removal URL
          <FormControl ref={(input) => this.input = input} type="text" placeholder='http://clickadilly.com/'/>
          <span className='text-danger'>{this.state.validation}</span>
      </FormGroup>
    )

    const renderModal = (
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

    const renderPagination = (
      !isFetching &&
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
    )

    const renderRemovals = (
      !isFetching && removals &&
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
    )

    const renderRequestedTable = (
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
            <th>
              created at
            </th>
            <th className='text-right'>
              status
            </th>
            <th>
              actions
            </th>
          </tr>
        </thead>
        { renderRemovals }
      </Table>
    )

    const renderSearchBar = (
      <Col lg={6} lgOffset={3} className='m-b-2' >
        <SearchBar
          placeHolder='Enter removal id...'
          query={queryName}
          resultCount={resultCount}
          handleSearch={handleSearch}
        />
      </Col>
    )

    const renderLoader = (
      isFetching &&
        <Loader />
    )

    return (
      <Row>
        <FlashMessage
          notification={this.props.notification}
          clearMessage={this.props.clearMessage}
        />
        { renderSearchBar }
        { renderRequestedTable }
        { renderPagination }
        { renderLoader }
        { renderModal }
      </Row>
    )
  }
}

RequestedRemovals.propTypes = {
  removals: PropTypes.array,
  pageNum: PropTypes.number,
  isFetching: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  getNextPage: PropTypes.func.isRequired,
  paginationItems: PropTypes.number,
  showModal: PropTypes.bool,
  hideModal: PropTypes.func.isRequired,
  removalInProcess: PropTypes.object,
  updateRemovalStatus: PropTypes.func.isRequired,
  queryName: PropTypes.string
}

export default RequestedRemovals;
