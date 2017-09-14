import React from 'react';
import {
  Panel,
  Table
} from 'components';

import Transaction from 'routes/admin/Dashboard/Transactions/components/Transaction'
import classes from '../user.scss';

const Transactions = (props) => {
 const { transactions, showModal} = props

  return (
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
                Amount
              </th>
              <th>
                Action
              </th>
            </tr>
          </thead>
          {
            transactions.map(transaction => {
              return <Transaction
                transaction={transaction}
                showModal={showModal}
                key={transaction.id}
              />
              })
          }
        </Table>
      </Panel>
  )
}

export default Transactions;
