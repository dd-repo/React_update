import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Link } from 'react-router';
import capitalize from 'utils/capitalize';

import SpinnerWhileLoading from 'HOC/SpinnerWhileLoading';
import classes from '../user.scss';
import AccountDetails from '../AccountDetails';
import ClientDetails from '../ClientDetails';
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
          {capitalize(props.client.details.fullName)}
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
            <ClientDetails
              client={props.client.details}
              accounts={props.client.accounts}
              showModal={props.showModal}
              updateUserStatus={props.updateUserStatus}
              handlePasswordReset={props.handlePasswordReset}
            />
          </Col>
          <Col lg={6}>
            <AccountDetails
              accounts={props.client.accounts}
              account={props.client.account}
              keywords={props.client.keywords}
              addresses={props.client.addresses}
              profile={props.client.profile}
              phones={props.client.phones}
              showModal={props.showModal}
              fetchAccount={props.fetchAccount}
              handleKeywordSubmit={props.handleKeywordSubmit}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Cards
              cards={props.client.cards}
              showModal={props.showModal}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Transactions
              transactions={props.client.transactions}
              showModal={props.showModal}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Subscriptions
              subscriptions={props.client.subscriptions}
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
          flashMessage={props.notification}
          clearMessage={props.clearMessage}
        />

        { renderUserDetails }

        <RootModal
          user={props.client.details}
          account={props.client.account}
          cards={props.client.cards}
          notification={props.notification}
        />

      </div>
  )
}

User.propTypes = {
  client: PropTypes.object,
  handlePasswordReset: PropTypes.func
}

export default compose(withLoader)(User);
