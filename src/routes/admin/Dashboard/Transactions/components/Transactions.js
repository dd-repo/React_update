import React from 'react';
import Loading from 'react-loading';

import {
  Table,
  Label,
  Button,
  Row,
  Pagination
} from 'components';



const Transactions = props => {
  const {
    transactions,
    pagination,
    pageNum,
    getNextPage,
    isFetching,
  } = props

  const paginationItems = () => {
    const { total, limit } = pagination
    return  Math.ceil(total / limit)
  }

  const renderTransaction = transaction => {
    const {
      id,
      state,
      processed_at,
      type_of_deal,
      round,
      subscription_id,
      sales_rep_name,
      client_name,
    } = transaction

    return (
      <tr className='bg-gray-darker' key={id}>
        <td>
          { client_name }
        </td>
        <td>
          email
        </td>
        <td>
          { id }
        </td>
        <td>
          { processed_at }
        </td>
        <td>
          { round }
        </td>
        <td>
          { subscription_id }
        </td>
        <td>
          { type_of_deal }
        </td>
        <td>
          { sales_rep_name }
        </td>
      </tr>
    )
  }

  return (
    <div>
      {
        !isFetching
          ?
            <Row>
              <Pagination
                bsSize="medium"
                items={paginationItems()}
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
                    transaction => renderTransaction(transaction)
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

export default Transactions;
