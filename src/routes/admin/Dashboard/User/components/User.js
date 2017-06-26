import React from 'react';
import Loading from 'react-loading';
import { Link } from 'react-router';

import classes from './user.scss';
import AccountDetails from './AccountDetails/AccountDetails';
import UserDetails from './UserDetails/UserDetails';
import Transactions from './Transactions/Transactions';
import Subscriptions from './Subscriptions/Subscriptions';

import { Row, Col } from 'components';

const User = (props) => {

const { user, accounts, transactions, subscriptions, isFetching, account } = props

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
          { renderHeader }
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
          <Subscriptions {...props} />
        </Col>
      </Row>
      { renderLoader }
    </div>
  )
}

export default User;
