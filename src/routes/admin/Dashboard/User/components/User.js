import React from 'react';
import Loading from 'react-loading';
import { Link } from 'react-router';

import { formatDate } from 'utils/dateHelper';
import classes from './user.scss';
import renderSection from 'modules/sectionRender';
import AccountDetails from './AccountDetails';
import UserDetails from './UserDetails';
import Transactions from './Transactions';
import Subscriptions from './Subscriptions';

import {
  Row,
  Col,
  Button,
  ButtonToolbar,
  ButtonGroup,
  Panel,
  ListGroup,
  ListGroupItem,
  Divider,
  Table,
  InputGroup,
  FormControl,
  DropdownButton,
  MenuItem
} from 'components';

const User = (props) => {
const { user, isFetching, account, handleAccountSelect } = props
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

  const salesRep = rep =>  rep ? rep : 'Web'

  const renderUserSubscriptions = () => (
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
          { isActive(subscription.is_active) }
        </td>
      </tr>
    </tbody>
  )

  const isActive = is_active =>  is_active ? 'Active' : 'Canceled'

  const renderHeader = () => (
    !isFetching &&
    <div className={ `${classes.taskHeader} flex-space-between` }>
      <h2 className='m-y-0 f-w-300'>
        <Link to='/admin/dashboard/users/clients'>
          Clients
        </Link>
        <span className='text-muted m-x-1'>/</span>
        <span className='text-uppercase'>
          {user.first_name} {user.last_name}
        </span>
      </h2>
    </div>
  );

  return (
    <div className={classes.mainWrap}>
      <Row>
        <Col lg={ 6 }>
          { renderSection(renderHeader) }
        </Col>
      </Row>
      <Row className='m-t-3'>
        <Col lg={ 6 }>
          <UserDetails {...props} />
        </Col>
        <Col lg={6}>
          <AccountDetails {...props} />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Transactions {...props} />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
            { renderSection(renderUserSubscriptions) }
        </Col>
      </Row>
      { renderLoader }
    </div>
  )
}

export default User;
