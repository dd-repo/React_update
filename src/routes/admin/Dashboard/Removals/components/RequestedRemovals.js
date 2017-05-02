import React, { Component } from 'react';
import Loading from 'react-loading';

import RequestedRemoval from './RequestedRemoval';

import {
  Table,
  Label,
  Button,
  Row,
  Pagination
} from 'components';


class RequestedRemovals extends Component {
  constructor(props) {
    super(props)

    this.paginationItems = this.paginationItems.bind(this)
  }

  paginationItems() {
    const { total, limit } = this.props.pagination
    Math.ceil(total / limit)
  }

  render() {
    const {
      removals,
      pagination,
      isFetching,
      handleClick,
      pageNum,
      getNextPage
    } = this.props

    return (
      <div>
        {
          !isFetching && pagination
            ?
              <Row>
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
                      client age
                    </th>
                    <th>
                      client address
                    </th>
                    <th>
                      site Link
                    </th>
                    <th className='text-right'>
                      status
                    </th>
                    <th>
                      action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    removals.map(
                      removal => <RequestedRemoval removal={removal} key={removal.id} handleClick={handleClick} />
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

              </div>
    )
  }
}

export default RequestedRemovals;
