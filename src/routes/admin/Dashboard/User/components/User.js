import React, { PropTypes } from 'react';
import Loading from 'react-loading';
import { Link } from 'react-router';
import capitalize from 'utils/capitalize';

import classes from './user.scss';
import AccountDetails from './AccountDetails/AccountDetails';
import UserDetails from './UserDetails';
import Transactions from './Transactions';
import Subscriptions from './Subscriptions/Subscriptions';
import Cards from './Cards';
import { RootModal } from 'components/Modals';

import { Row, Col, Alert, Button, Loader } from 'components';

const User = props => {

  const renderLoader = (
    props.isFetching &&
    <Loader />
  )

  const renderHeader = () => (
    <div className={ `${classes.taskHeader} flex-space-between` }>
      <h2 className='m-y-0 f-w-300'>
        <Link to='/admin/dashboard/users/clients'>
          Clients
        </Link>
        <span className='text-muted m-x-1'>/</span>
        <span>
          {capitalize(props.user.details.fullName)}
        </span>
      </h2>
    </div>
  );

  const renderAlertMessage = (
    props.notification.message &&
      <Alert bsStyle={props.notification.status}>
         <Button
           bsStyle='link'
           onClick={props.clearMessage}
         >
           <i className={`fa fa-times-circle fa-lg text-${props.notification.status} pull-right`}></i>
         </Button>
         {props.notification.message}
      </Alert>
  )

  const renderUserDetails = (
    !props.isFetching &&
      <div>
        {renderAlertMessage}
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
      </div>
  )

  return (
      <div className={classes.mainWrap}>
        { renderUserDetails }
        { renderLoader }
        <RootModal
          hideModal={props.hideModal}
        />
      </div>
  )
}

User.propTypes = {
  user: PropTypes.object,
  toggelModal: PropTypes.func,
  handlePasswordReset: PropTypes.func
}

export default User;
