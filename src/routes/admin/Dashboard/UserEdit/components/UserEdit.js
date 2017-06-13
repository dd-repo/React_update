import React from 'react';
import classes from './userEdit.scss';
import { Link } from 'react-router';
import {
    Row,
    Col,
    Panel,
    Button,
    Alert
} from 'components';
import UserEditForm from './UserEditForm';

const UserEdit = (props) => {
  const {
    notification,
    submitForm,
    isFetching,
    user
  } = props

  const renderMessage = notification &&
    <Alert bsStyle={notification.status}>
      { notification.message }
    </Alert>

    return (
      <Row>
        <Col lg={ 12 }>
          {renderMessage}
          <Row>
            <Col className={ classes.centerCol } lg={ 9 }>
              <Panel
                className={ classes.registerPanel }
                header={(
                  <Link to='#' className={ classes.toHomeLink }>
                    <h2 className={ classes.panelHeader }>
                      Client Edit Form
                    </h2>
                  </Link>
                  )}
                >
                  <UserEditForm
                    submitForm={submitForm}
                    isFetching={isFetching}
                    initialValues={user}
                  />
            </Panel>
          </Col>
        </Row>
      </Col>
    </Row>
    )
}

export default UserEdit;
