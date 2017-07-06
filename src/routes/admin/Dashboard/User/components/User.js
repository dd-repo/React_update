import React, { PropTypes } from 'react';
import Loading from 'react-loading';
import { Link } from 'react-router';
import capitalize from 'utils/capitalize';

import classes from './user.scss';
import AccountDetails from './AccountDetails/AccountDetails';
import UserDetails from './UserDetails';
import Transactions from './Transactions/Transactions';
import Subscriptions from './Subscriptions/Subscriptions';
import Cards from './Cards';

import { Row, Col, Alert, Button } from 'components';

const User = props => {
  const renderLoader = (
    props.isFetching &&
      <div className='container'>
        <div className="spinner">
          <div className="col-md-12">
            <Loading type='bubbles' color='white' />
          </div>
        </div>
      </div>
  )

  const renderHeader = () => (
    !props.isFetching &&
    <div className={ `${classes.taskHeader} flex-space-between` }>
      <h2 className='m-y-0 f-w-300'>
        <Link to='/admin/dashboard/users/clients'>
          Clients
        </Link>
        <span className='text-muted m-x-1'>/</span>
        <span>
          {capitalize(props.user.first_name)} {capitalize(props.user.last_name)}
        </span>
      </h2>
    </div>
  );

  const renderErrorMessage = (
    props.errorMessage &&
      <Alert bsStyle='danger'>
         <Button
           bsStyle='link'
           onClick={() => {props.clearErrorMessage()}}
         >
           <i className="fa fa-times-circle fa-lg text-danger pull-right"></i>
         </Button>
         {props.errorMessage}
      </Alert>
  )

  return (
    <div className={classes.mainWrap}>
      {renderErrorMessage}
      <Row>
        <Col lg={ 6 }>
          { renderHeader() }
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
          <Cards {...props} />
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

UserDetails.defaultProps = {
  user: {},
  account: {},
  accounts: [],
  transactions: [],
  subscriptions: []
}

User.propTypes = {
  user: PropTypes.object,
  account: PropTypes.object,
  accounts: PropTypes.array,
  transactions: PropTypes.array,
  subscriptions: PropTypes.array,
  isFetching: PropTypes.bool,
  toggelModal: PropTypes.func,
  handlePasswordReset: PropTypes.func
}

export default User;
