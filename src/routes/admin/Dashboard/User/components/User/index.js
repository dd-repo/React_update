import React, { PropTypes } from 'react';
import { compose } from 'recompose';
import { Link } from 'react-router';
import capitalize from 'utils/capitalize';

import SpinnerWhileLoading from 'HOC/SpinnerWhileLoading';
import classes from '../user.scss';
import AccountDetails from '../AccountDetails';
import UserDetails from '../UserDetails';
import Transactions from '../Transactions';
import Subscriptions from '../Subscriptions';
import Cards from '../Cards';
import RootModal from 'components/Modals';

import { Row, Col, Alert, Button, FlashMessage } from 'components';

const withLoader = SpinnerWhileLoading(
  props => props.isFetching
)

const User = props => {

  const renderHeader = (
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
  )

  const renderUserDetails = (
    !props.isFetching &&
      <div>
        <Row>
          <Col lg={ 6 }>
            { renderHeader }
          </Col>
        </Row>
        <Row className='m-t-3'>
          <Col lg={ 6 }>
            <UserDetails
              user={props.user.details}
              accounts={props.user.accounts}
              showModal={props.showModal}
              handlePasswordReset={props.handlePasswordReset}
            />
          </Col>
          <Col lg={6}>
            <AccountDetails
              accounts={props.user.accounts}
              account={props.user.account}
              keywords={props.user.keywords}
              addresses={props.user.addresses}
              profile={props.user.profile}
              phones={props.user.phones}
              showModal={props.showModal}
              fetchAccount={props.fetchAccount}
              handleKeywordSubmit={props.handleKeywordSubmit}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Cards
              cards={props.user.cards}
              showModal={props.showModal}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Transactions
              transactions={props.user.transactions}
              showModal={props.showModal}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Subscriptions
              subscriptions={props.user.subscriptions}
              showModal={props.showModal}
              handleNewSubscription={props.handleNewSubscription}
            />
          </Col>
        </Row>
      </div>
  )

  return (
      <div className={classes.mainWrap}>

        <FlashMessage
          notification={props.notification}
          clearMessage={props.clearMessage}
        />

        { renderUserDetails }

        <RootModal
          user={props.user.details}
          account={props.user.account}
          cards={props.user.cards}
          notification={props.notification}
        />

      </div>
  )
}

User.propTypes = {
  user: PropTypes.object,
  handlePasswordReset: PropTypes.func
}

export default compose(withLoader)(User);

