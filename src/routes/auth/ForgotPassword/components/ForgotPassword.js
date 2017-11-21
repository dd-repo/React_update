import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import ForgotPasswordForm from './ForgotPasswordForm'
import { Row, Col, Panel } from 'components'

import classes from './forgotPassword.scss'

const ForgotPassword = ({ submitForm }) => {
  return (
    <Row>
      <Col lg={12}>
        <Row>
          <Col className={classes.centerCol} md={4}>
            <Panel
              footer={(
                <div>
                  <Link to='/login'>
                    Login
                  </Link>
                  <Link to='/signup' className='pull-right'>
                    Register
                  </Link>
                </div>
              )}
            >
              <h2 className={classes.panelHeader}>
                Forgot Password
              </h2>
              <p className='text-center m-b-3'>
                We can help you reset your password using your email address associated with your account.
              </p>

              <ForgotPasswordForm
                submitForm={submitForm}
              />
            </Panel>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

ForgotPassword.propTypes = {
  submitForm: PropTypes.func
}

export default ForgotPassword
