import React, { Component } from 'react';
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
    this.state = {showModal: false, subscription: {}}

    this.paginationItems = this.paginationItems.bind(this)
    this.confirmCancelation = this.confirmCancelation.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this._handleClick = this._handleClick.bind(this)
  }

  paginationItems() {
    const { total, limit } = this.props.pagination
    return  Math.ceil(total / limit)
  }

  confirmCancelation(subscription) {
    this.setState({showModal: true, subscription: subscription})
  }

  _handleClick() {
    this.props.handleClick(this.state.subscription.id, !this.state.subscription.is_active)
    this.toggleModal()
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal})
  }

  render() {
    const { id, client_name, user_id, start_date, plan_id, plan_description } = this.state.subscription
    const {
      subscriptions,
      pagination,
      pageNum,
      getNextPage,
      isFetching,
      handleClick,
    } = this.props

    return (
      <div>
        {
          !isFetching && pagination
            ?
              <Row>
                <div className="text-center">
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
                  <tbody>
                    {
                      subscriptions.map(
                        subscription =>
                        <Subscription
                          subscription={subscription}
                          key={subscription.id}
                          handleClick={handleClick}
                          confirmCancelation={this.confirmCancelation}
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
                    <Button onClick={this.toggleModal}>Close</Button>
                    <Button bsStyle="danger" onClick={this._handleClick}>Cancel Subscription</Button>
                  </Modal.Footer>
              </Modal>


                </div>
    )
  }
}
