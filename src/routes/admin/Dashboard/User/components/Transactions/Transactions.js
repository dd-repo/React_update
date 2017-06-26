import React from 'react';
import {
  Panel,
  Table,
  Label
} from 'components';

import { formatDate } from 'utils/dateHelper';
import classes from '../user.scss';

const Transactions = ({isFetching, transactions}) => (
  !isFetching &&
    <Panel
      header={
        <h4 className='panel-title'>
          Transactions
        </h4>
        }
      >
        <Table>
          <thead>
            <tr>
              <th>
                id
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
            </tr>
          </thead>
          {
            transactions.map(transaction => {
              return renderTransaction(transaction)
            })
          }
        </Table>
      </Panel>
)

const salesRep = rep =>  rep ? rep : 'Web'

const renderTransaction = transaction => (
  <tbody key={transaction.id}>
    <tr className='bg-gray-darker'>
      <td>
        { transaction.id }
      </td>
      <td>
        { transaction.third_party_id }
      </td>
      <td>
        { formatDate(transaction.processed_at) }
      </td>
      <td>
        { transaction.round }
      </td>
      <td>
        { transaction.subscription_id }
      </td>
      <td>
        { transaction.type_of_deal }
      </td>
      <td>
        { salesRep(transaction.sales_rep) }
      </td>
      <td>
        <Label
          outline
          className='text-uppercase'
          bsStyle={STYLE[transaction.status]}>
          { transaction.status }
        </Label>
      </td>
    </tr>
  </tbody>
)

const STYLE = {
  'completed': 'success',
  'refunded':  'warning',
  'declined':  'danger'
}
export default Transactions;

