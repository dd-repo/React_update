import React from 'react';
import {
  Panel,
  Table
} from 'components';

import Transaction from '../Transaction';


const Transactions = ({ transactions, handleReceiptClick }) => {

  return (
    <Panel
      maxHeight={400}
      header={
        <h4 className='panel-title'>
          Payment History
        </h4>
        }
      >
        <Table fill responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Payment Method</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {
              transactions.map( (transaction, i) => (
                <Transaction 
                  transaction={transaction}
                  key={i} 
                  handleReceiptClick={handleReceiptClick}
                />
                ))
            }
          </tbody>
        </Table>
      </Panel>
  )
}
export default Transactions;
