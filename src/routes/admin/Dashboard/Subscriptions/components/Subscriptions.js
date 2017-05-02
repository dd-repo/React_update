import React, { Component } from 'react';
import Loading from 'react-loading';

import Subscription from './Subscription';

import {
  Table,
  Label,
  Button,
  Row,
  Pagination
} from 'components';

export default class Subscriptions extends Component {
  constructor(props) {
    super(props)

    this.paginationItems = this.paginationItems.bind(this)
  }

  paginationItems() {
    const { total, limit } = this.props.pagination
    return  Math.ceil(total / limit)
  }

  render() {
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
                      cancel date
                    </th>
                    <th>
                      is active
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
                  </tr>
                </thead>
                <tbody>
                  {
                    subscriptions.map(
                      subscription => <Subscription subscription={subscription} key={subscription.id} handleClick={handleClick} />
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
