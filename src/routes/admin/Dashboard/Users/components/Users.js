import React, { PropTypes } from 'react';
import Loading from 'react-loading';

import User from './User';
import {
  Table,
  Label,
  Button,
  Row,
  Pagination
} from 'components';

const Users = (props) => {
  const {
    users,
    paginationItems,
    pageNum,
    getNextPage,
    isFetching,
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

  const renderUsers = (
    !isFetching && users &&
      <tbody>
        {
          users.map(user => (
            <User
              user={user}
              key={user.id}
            />
            ))
        }
      </tbody>
  )

  return (
    <Row>
      { renderPagination }
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
          </tr>
        </thead>
        { renderUsers }
      </Table>
      { renderLoader }
    </Row>
  )
}

Users.propTypes = {
  users: PropTypes.array,
  paginationItems: PropTypes.number,
  pageNum: PropTypes.number,
  isFetching: PropTypes.bool,
  getNextPage: PropTypes.func.isRequired
}

export default Users
