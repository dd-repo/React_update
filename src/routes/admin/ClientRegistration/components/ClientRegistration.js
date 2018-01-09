import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import ClientRegistrationForm from './ClientRegistrationForm'
import classes from './clientRegistration.scss'
import {
  Row,
  Col,
  Panel,
  Alert
} from 'components'

const ClientRegistration = (props) => {
  const { 
    notification,
    submitForm,
    isFetching,
    disableButton
  } = props

  const renderMessage = notification &&
    <Alert bsStyle={notification.status}>
      {notification.message}
    </Alert>

    return (
      <Row>
        <Col lg={12}>
          {renderMessage}
          <Row>
            <Col className={classes.centerCol} lg={9}>
              <Panel
                className={classes.registerPanel}
                header={(
                  <Link to='#' className={classes.toHomeLink}>
                    <h2 className={classes.panelHeader}>
                      Client Registration Form
                    </h2>
                  </Link>
                )}
              >

              <ClientRegistrationForm
                submitForm={submitForm}
                isFetching={isFetching}
                disableButton={disableButton}
              />

          </Panel>
        </Col>
      </Row>
    </Col>
  </Row>
    )
}

ClientRegistration.propTypes = {
  submitForm: PropTypes.func.isRequired,
  notification: PropTypes.object,
  isFetching: PropTypes.bool
}

export default ClientRegistration
