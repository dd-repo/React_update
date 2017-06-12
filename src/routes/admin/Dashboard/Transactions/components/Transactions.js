import React, { Component, PropTypes } from 'react';
import Loading from 'react-loading';
import { formatDate } from 'utils/dateHelper';

import Transaction from './Transaction';
import {
  Table,
  Label,
  Col,
  Button,
  Row,
  Pagination,
  SearchBar,
  Modal
} from 'components';

const Transactions = (props) => {
  const {
    transactions,
    transactionInProgress,
    paginationItems,
    pageNum,
    getNextPage,
    isFetching,
    queryName,
    handleSearch,
    handleCancelTransaction,
    confirmCancelTransaction,
    limit,
    total,
    showModal,
    hideModal
  } = props

  const {
    id,
    state,
    processed_at,
    type_of_deal,
    user_email,
    third_party_id,
    round,
    subscription_id,
    sales_rep_name,
    client_name,
  } = transactionInProgress

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

  const renderPagination = (
    !isFetching && (total > limit) &&
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

  const renderTransactions = (
    !isFetching && transactions &&
      <tbody>
        {
          transactions.map(transaction => (
            <Transaction
              transaction={transaction}
              confirmCancelTransaction={confirmCancelTransaction}
              key={transaction.id}
            />
            ))
        }
      </tbody>
  )

  const renderSearchBar = (
    <Col lg={6} lgOffset={3} className='m-b-2' >
      <SearchBar
        query={queryName}
        resultCount={total}
        handleSearch={handleSearch}
      />
    </Col>
  )

  const renderModal = (
    <Modal  show={showModal} onHide={hideModal}>
      <Modal.Header>
        <Modal.Title>Please confirm transaction before canceling</Modal.Title>
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
                transaction id
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
                { user_email }
              </td>
              <td>
                { third_party_id }
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={hideModal}>Close</Button>
        <Button bsStyle="danger" onClick={handleCancelTransaction}>Cancel Transaction</Button>
      </Modal.Footer>
    </Modal>
  )

  return (
    <Row>
      { renderSearchBar }
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
              transaction id
            </th>
            <th>
              process date
            </th>
            <th>
              # of rounds
            </th>
            <th>
              subscription id
            </th>
            <th>
              type of deal
            </th>
            <th>
              sales rep
            </th>
            <th>
              Cancel Action
            </th>
          </tr>
        </thead>
        { renderTransactions }
      </Table>
      { renderPagination }
      { renderLoader }
      { renderModal }
    </Row>
  )
}

Transactions.PropTypes = {
  transactions: PropTypes.array,
  paginationItems: PropTypes.number,
  pageNum: PropTypes.number,
  isFetching: PropTypes.bool,
  getNextPage: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  queryName: PropTypes.string,
  limit: PropTypes.number,
  total: PropTypes.number
}

export default Transactions;
