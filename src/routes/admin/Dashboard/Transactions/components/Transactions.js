import React, { Component, PropTypes } from 'react';
import Loading from 'react-loading';

import Transaction from './Transaction';
import {
  Table,
  Label,
  Col,
  Button,
  Row,
  Pagination,
  SearchBar
} from 'components';

const Transactions = (props) => {
  const {
    transactions,
    paginationItems,
    pageNum,
    getNextPage,
    isFetching,
    queryName,
    handleSearch,
    limit,
    total
  } = props

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
          </tr>
        </thead>
        { renderTransactions }
      </Table>
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
  getNextPage: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  queryName: PropTypes.string,
  limit: PropTypes.number,
  total: PropTypes.number
}

export default Transactions;
