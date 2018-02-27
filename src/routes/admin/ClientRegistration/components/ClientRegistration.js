import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import ClientRegistrationForm from './ClientRegistrationForm'
import classes from './clientRegistration.scss'
import ClientForm from './CreateClientForm'
import ProspectSelectForm from './SelectProspectForm'
import PaymentForm from './PaymentForm'
import KeywordsForm from './KeywordsForm'
import {
  Row,
  Col,
  Panel,
  Alert
} from 'components'

const ClientRegistration = (props) => {
  const {
    notification,
    handleNewClient,
    handleProspectSelect,
    handlePayment,
    handleKeywords,
    isFetching,
    client,
    keywords,
    nextStep,
  } = props

  const renderMessage = notification.message &&
    <Alert bsStyle={notification.status}>
      {notification.message}
    </Alert>

    const formTitle = {
      'client': 'Client Registration Form',
      'payment': 'Credit Card Form',
      'keywords': 'Keywords Form'
    }

    return (
      <Row>
        <Col lg={12}>
          {renderMessage}
          <Row>
            <Col className={classes.centerCol} lg={9}>
              <Panel
                className={classes.registerPanel}
                header={(
                  <div className={classes.toHomeLink}>
                    <h2 className={classes.panelHeader}>
                      { formTitle[nextStep] }
                    </h2>
                  </div>
                )}
              >
                { nextStep == 'client' &&
                    <div>
                      <ProspectSelectForm
                        handleProspectSelect={handleProspectSelect}
                        isFetching={isFetching}
                      />
                      <ClientForm
                        handleNewClient={handleNewClient}
                        isFetching={isFetching}
                      />
                    </div>
                }
                { nextStep == 'payment' &&
                    <PaymentForm
                      handlePayment={handlePayment}
                      isFetching={isFetching}
                    />
                }
                { nextStep == 'keywords' &&
                    <KeywordsForm
                      handleKeywords={handleKeywords}
                      initialValues={keywords}
                      isFetching={isFetching}
                    />
                }
              </Panel>
            </Col>
          </Row>
        </Col>
      </Row>
    )
}

ClientRegistration.propTypes = {
  notification: PropTypes.object,
  isFetching: PropTypes.bool,
  handleNewClient: PropTypes.func.isRequired,
  handleProspectSelect: PropTypes.func.isRequired,
  handlePayment: PropTypes.func.isRequired,
  handleKeywords: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
  keywords: PropTypes.object.isRequired,
  nextStep: PropTypes.string.isRequired
}

export default ClientRegistration
