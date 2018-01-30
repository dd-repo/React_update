import React from 'react'
import PropTypes from 'prop-types'
import _ from 'underscore'

import Transaction from './Transaction'
import ResultsNotFound from 'routes/admin/components/resultsNotFound'
import RootModal from 'components/Modals'
import {
  Table,
  Col,
  Row,
  Pagination,
  SearchBar,
  FlashMessage,
  Loader
} from 'components'

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
    total,
    showModal,
    clearMessage,
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
            showModal={showModal}
            key={transaction.id}
          />
        ))
  )

  const renderSearchBar = (
    <Col lg={6} lgOffset={3} className='m-b-2' >
      <SearchBar
        placeHolder='search by client name...'
        query={queryName}
        resultCount={total}
        handleSearch={handleSearch}
      />
    </Col>
  )

  return (
    <Row>
      <FlashMessage
        flashMessage={notification}
        clearMessage={clearMessage}
      />
      {renderSearchBar}
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
              amount
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        {renderTransactions}
      </Table>

      <RootModal />
      {
        _.isEmpty(transactions) && !isFetching &&
          <ResultsNotFound queryName={queryName} />
      }
      {renderPagination}
      {renderLoader}
    </Row>
  )
}

Transactions.propTypes = {
  transactions: PropTypes.array,
  paginationItems: PropTypes.number,
  pageNum: PropTypes.number,
  isFetching: PropTypes.bool,
  getNextPage: PropTypes.func,
  handleSearch: PropTypes.func,
  queryName: PropTypes.string,
  limit: PropTypes.number,
  handleSeach: PropTypes.func,
  showModal: PropTypes.func,
  errorMessage: PropTypes.string,
  notification: PropTypes.object,
  clearMessage: PropTypes.func,
  total: PropTypes.number
}

export default Transactions
