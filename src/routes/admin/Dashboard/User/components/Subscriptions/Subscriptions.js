import React from 'react';

import {
  Panel,
  Table,
  Label
} from 'components';

import { formatDate } from 'utils/dateHelper';
import Subscription from 'routes/admin/Dashboard/Subscriptions/components/Subscription';
import classes from '../user.scss';

const button = {
  label: <i className="fa fa-pencil"> Edit</i>,
  style: 'link'
}

const Subscriptions = ({isFetching, subscriptions, toggleModal}) => {

  const _onClick = subscription => {
   toggleModal('subscriptionEditModal', true, subscription)
  }

  return (
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
                  plan id
                </th>
                <th>
                  plan description
                </th>
                <th>
                  sales rep
                </th>
                <th>
                  card id
                </th>
                <th>
                  account status
                </th>
                <th>
                </th>
              </tr>
            </thead>
            {
              subscriptions.map(subscription => {
                return <Subscription
                  subscription={subscription}
                  key={subscription.id}
                  button={button}
                  _onClick={_onClick}
                />
              })
            }
          </Table>
        </Panel>
  )
}

export default Subscriptions;
