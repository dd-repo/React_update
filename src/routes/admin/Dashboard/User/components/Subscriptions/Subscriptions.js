import React from 'react';

import {
  Panel,
  Table,
  Label
} from 'components';
import { formatDate } from 'utils/dateHelper';
import classes from '../user.scss';

const Subscriptions = ({isFetching, user}) => (
  !isFetching &&
    <Panel
      header={
        <h4 className='panel-title'>
          Subscriptions
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
                start date
              </th>
              <th>
                end date
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
              <th>
                account status
              </th>
            </tr>
          </thead>
          {
            user.subscriptions.map(subscription => {
              return renderSubscription(subscription)
            })
          }
        </Table>
      </Panel>
)


const renderSubscription = subscription => (
  <tbody key={subscription.id}>
    <tr className='bg-gray-dark'>
      <td>
        { subscription.id }
      </td>
      <td>
        { formatDate(subscription.start_date) }
      </td>
      <td>
        { formatDate(subscription.end_date) }
      </td>
      <td>
        { subscription.plan_id }
      </td>
      <td>
        { subscription.plan_description }
      </td>
      <td>
        { salesRep(subscription.salesRep) }
      </td>
      <td>
        <Label
          outline
          className='text-uppercase'
          bsStyle={subscription.is_active ? 'primary' : 'danger'}>
          { isActive(subscription.is_active) }
        </Label>
      </td>
    </tr>
  </tbody>
)

const isActive = is_active =>  is_active ? 'Active' : 'Canceled'
const salesRep = rep =>  rep ? rep : 'Web'

export default Subscriptions;
