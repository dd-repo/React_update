import React, { Component, PropTypes } from 'react';
import Loading from 'react-loading';

import Subscription from './Subscription';

import {
  Table,
  Label,
  Panel,
  Button,
  Row,
  Pagination,
  Modal,
} from 'components';

export default class Subscriptions extends Component {
  constructor(props) {
    super(props)

    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick() {
    const { id, is_active } = this.props.subscriptionInProcess
    this.props.handleClick(id, !is_active)
    this.props.hideModal()
  }

  render() {
    const {
      subscriptions,
      paginationItems,
      pageNum,
      getNextPage,
      isFetching,
      handleClick,
      showModal,
      hideModal,
      confirmCancelation,
      subscriptionInProcess,
    } = this.props

    const {
      id,
      client_name,
      user_id,
      start_date,
      plan_id,
      plan_description
    } = subscriptionInProcess

    const renderPagination = (
      !isFetching &&
        <div className="text-center">
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

    const renderSubscriptions = (
      !isFetching && subscriptions &&
        <tbody>
          {
            subscriptions.map(
              subscription =>
              <Subscription
                subscription={subscription}
                key={subscription.id}
                handleClick={handleClick}
                confirmCancelation={confirmCancelation}
              />
              )}
            </tbody>
    )

    const renderLoader = (
      isFetching &&
        <div className='container'>
          <div className="spinner">
            <div className="col-md-12">
              <Loading type='bubbles' color='white' />
            </div>
          </div>
        </div>
    )

    const renderModal = (
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
                  { id }
                </td>
                <td>
                  { client_name }
                </td>
                <td>
                  { user_id }
                </td>
                <td>
                  { plan_id }
                </td>
                <td>
                  { plan_description }
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={hideModal}>Close</Button>
          <Button bsStyle="danger" onClick={this._handleClick}>Cancel Subscription</Button>
        </Modal.Footer>
      </Modal>
    )

    return (
      <Row>
        { renderPagination }
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
                start date
              </th>
              <th>
                end date
              </th>
              <th>
                plan id
              </th>
              <th>
                plan description
              </th>
              <th>
                sales rep
              </th>
              <th>
                account status
              </th>
            </tr>
          </thead>
          { renderSubscriptions }
        </Table>
        { renderLoader }
        { renderModal }
      </Row>
    )
  }
}

Subscriptions.propTypes = {
  subscription: PropTypes.array,
  paginationItems: PropTypes.number,
  pageNum: PropTypes.number,
  isFetching: PropTypes.bool,
  getNextPage: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
}
