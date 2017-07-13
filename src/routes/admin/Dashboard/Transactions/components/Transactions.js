import React, { Component, PropTypes } from 'react';
import Loading from 'react-loading';
import { formatDate } from 'utils/dateHelper';

import Transaction from './Transaction';
import { EditTransactionModal } from 'components/Modals';
import {
  Table,
  Label,
  Col,
  Button,
  Row,
  Pagination,
  SearchBar,
  Modal,
  Alert,
  Loader
} from 'components';

const Transactions = (props) => {
  const {
    transactions,
    transactionInProgress,
    paginationItems,
    updateTransaction,
    pageNum,
    getNextPage,
    isFetching,
    queryName,
    handleSearch,
    confirmTransaction,
    limit,
    total,
    showModal,
    hideModal,
    errorMessage,
    notification
  } = props

  const renderLoader = (
    isFetching &&
      <Loader />
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
        transactions.map(transaction => (
          <Transaction
            transaction={transaction}
            confirmTransaction={confirmTransaction}
            key={transaction.id}
          />
        ))
  )

  const renderSearchBar = (
    <Col lg={6} lgOffset={3} className='m-b-2' >
      <SearchBar
        placeHolder='Search by id...'
        query={queryName}
        resultCount={total}
        handleSearch={handleSearch}
      />
    </Col>
  )


  const renderMessage = () => {
    if(errorMessage || notification) {
      let status;
      let message;
      errorMessage && (status = 'danger', message = errorMessage)
      notification && (status = 'success', message = notification.message)

      return  <Alert bsStyle={status}>
        <i className="fa fa-fw text-danger m-r-1"></i>
        {message}
      </Alert>
    }
  }

  return (
    <Row>
      { renderMessage() }
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
                Status
              </th>
            <th>
              Cancel Action
            </th>
          </tr>
        </thead>
        { renderTransactions }
      </Table>

      <EditTransactionModal
        transaction={transactionInProgress}
        show={showModal}
        toggleModal={hideModal}
        handleClick={updateTransaction}
      />

      { renderPagination }
      { renderLoader }
    </Row>
  )
}

Transactions.PropTypes = {
  transactions: PropTypes.array,
  paginationItems: PropTypes.number,
  pageNum: PropTypes.number,
  isFetching: PropTypes.bool,
  updateTransaction: PropTypes.func,
  confirmTransaction: PropTypes.func,
  getNextPage: PropTypes.func,
  handleSearch: PropTypes.func,
  queryName: PropTypes.string,
  limit: PropTypes.number,
  total: PropTypes.number
}

export default Transactions;
