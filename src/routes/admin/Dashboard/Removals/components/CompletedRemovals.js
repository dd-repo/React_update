import React, { Component, PropTypes } from 'react';
import CompletedRemoval from './CompletedRemoval';

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
  SearchBar,
  Loader
} from 'components';

const CompletedRemovals = props => {
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
  } = props

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

  const renderCompletedRemovals = (
    !isFetching && removals &&
      <tbody>
        {
          removals.map(
            removal =>
            <CompletedRemoval
              removal={removal}
              key={removal.id}
              handleClick={handleClick}
            />
            )}
          </tbody>
  )

  const renderCompletedTable = (
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
            Site Link Removed
          </th>
          <th>
            completed at
          </th>
        </tr>
      </thead>
      { renderCompletedRemovals }
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
      { renderSearchBar }
      { renderCompletedTable }
      { renderPagination }
      { renderLoader }
    </Row>
  )
}

CompletedRemovals.propTypes = {
  removals: PropTypes.array,
  pageNum: PropTypes.number,
  isFetching: PropTypes.bool,
  getNextPage: PropTypes.func.isRequired,
  paginationItems: PropTypes.number,
  queryName: PropTypes.string
}

export default CompletedRemovals;

