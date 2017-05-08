import React, { Component } from 'react';
import Loading from 'react-loading';

import Transaction from './Transaction';
import {
  Table,
  Label,
  Button,
  Row,
  Pagination
} from 'components';



export default class Transactions extends Component {
  constructor(props) {
    super(props)

    this.paginationItems = this.paginationItems.bind(this);
  }

  paginationItems() {
    const { total, limit } = this.props.pagination
    return  Math.ceil(total / limit)
  }

  render() {
    const {
      transactions,
      pagination,
      pageNum,
      getNextPage,
      isFetching,
    } = this.props

    return (
      <div>
        {
          !isFetching && pagination
            ?
              <Row>
                <div className="text-center">
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
                </div>
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
                <tbody>
                  {
                    transactions.map(
                      transaction => <Transaction transaction={transaction} key={transaction.id} />
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
