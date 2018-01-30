import React from 'react'
import PropTypes from 'prop-types'
import _ from 'underscore'

import Subscription from './Subscription'
import ResultsNotFound from 'routes/admin/components/resultsNotFound'
import {
  Table,
  Col,
  Row,
  Pagination,
  SearchBar,
  Loader
} from 'components'

const Subscriptions = props => {
  const {
    subscriptions,
    paginationItems,
    pageNum,
    getNextPage,
    isFetching,
    handleSearch,
    resultCount,
    queryName,
    limit
  } = props

  const renderPagination = (
    !isFetching && (resultCount > limit) &&
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
    subscriptions.map(
      subscription =>
        <Subscription
          subscription={subscription}
          key={subscription.id}
        />
    )
  )

  const renderLoader = isFetching && <Loader />

    const renderSearchBar = (
      <Col lg={6} lgOffset={3} className='m-b-2' >
        <SearchBar
          placeHolder='search by client name...'
          query={queryName}
          resultCount={resultCount}
          handleSearch={handleSearch}
        />
      </Col>
    )

  return (
    <Row>
      {renderSearchBar}
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
              Card id
            </th>
            <th>
              account status
            </th>
            <th>
              next payment
            </th>
            <th>
            </th>
          </tr>
        </thead>
        {renderSubscriptions}
      </Table>
      {
        _.isEmpty(subscriptions) && !isFetching &&
          <ResultsNotFound queryName={queryName} />
      }
      {renderPagination}
      {renderLoader}
    </Row>
  )
}

Subscriptions.propTypes = {
  subscriptions: PropTypes.array,
  paginationItems: PropTypes.number,
  pageNum: PropTypes.number,
  isFetching: PropTypes.bool,
  getNextPage: PropTypes.func.isRequired,
  queryName: PropTypes.string,
  handleSearch: PropTypes.func,
  resultCount: PropTypes.number,
  limit: PropTypes.number
}

export default Subscriptions
