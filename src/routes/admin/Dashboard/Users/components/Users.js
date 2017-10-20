import React, { PropTypes } from 'react';
import Loading from 'react-loading';

import User from './User';
import {
  Table,
  Label,
  Button,
  Row,
  Pagination,
  Col,
  SearchBar,
  FlashMessage
} from 'components';

const Users = (props) => {
  const {
    users,
    paginationItems,
    pageNum,
    getNextPage,
    isFetching,
    handleSearch,
    queryName,
    results,
    limit,
    isFrontend,
    handleDropdownSelect
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
    !isFetching && results > limit &&
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

  const renderUsers = (
    !isFetching && users &&
      <tbody>
        {
          users.map(user => (
            <User
              user={user}
              handleDropdownSelect={handleDropdownSelect}
              key={user.id}
            />
            ))
        }
      </tbody>
  )

  const renderSearch = (
    isFrontend &&
      <Col lg={6} lgOffset={3} className='m-b-2' >
        <SearchBar
          placeHolder='Search by first name, last name or email...'
          query={queryName}
          resultCount={results}
          handleSearch={handleSearch}
        />
      </Col>
  )

  return (
    <Row>
      <Col lg={12}>
        <FlashMessage
          flashMessage={props.notification}
          clearMessage={props.clearMessage}
        />
      </Col>
      { renderSearch }
      <Table>
        <thead>
          <tr>
            <th>
              id
            </th>
            <th>
              User name
            </th>
            <th>
              User email
            </th>
            <th>
              Group
            </th>
            <th>
              Role
            </th>
            <th>
              Created At
            </th>
            <th>
              Active until
            </th>
            <th>
              Status
            </th>
            <th>
              actions
            </th>
          </tr>
        </thead>
        { renderUsers }
      </Table>
      { renderPagination }
      { renderLoader }
    </Row>
  )
}

Users.propTypes = {
  notification: PropTypes.object.isRequired,
  users: PropTypes.array,
  paginationItems: PropTypes.number,
  pageNum: PropTypes.number,
  isFetching: PropTypes.bool,
  getNextPage: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleDropdownSelect: PropTypes.func.isRequired,
  queryName: PropTypes.string,
  results: PropTypes.number,
  limit: PropTypes.number,
  isFrontend: PropTypes.bool
}

export default Users
