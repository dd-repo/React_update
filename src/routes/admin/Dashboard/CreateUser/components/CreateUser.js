import React from 'react';
import { Link } from 'react-router';
import CreateUserForm from './CreateUserForm'

import logo from 'static/logos/logo-small.png';
import classes from '../../ClientRegistration/components/clientRegistration.scss';
import {
    Row,
    Col,
    Panel,
    Button,
    Alert
} from 'components';

const CreateUser = (props) => {
  const {
    notification,
    submitForm,
    resetform,
    isFetching
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
                      Create User
                    </h2>
                  </Link>
                  )}
                >
                  <CreateUserForm
                    isFetching={isFetching}
                    submitForm={submitForm}
                  />

              </Panel>
            </Col>
          </Row>
        </Col>
      </Row>
  )
}

export default CreateUser;
