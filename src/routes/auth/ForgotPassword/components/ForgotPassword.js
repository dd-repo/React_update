import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import ForgotPasswordForm from './ForgotPasswordForm'
import { Row, Col, Panel } from 'components'

import classes from './forgotPassword.scss'
import logo from 'static/logos/logo-white-sm.png'

const ForgotPassword = ({ submitForm }) => {
  return (
    <Row>
      <Col lg={12}>
        <Row>
          <Col className={classes.centerCol} md={4}>
            <Panel
              header={(
                <Link to='/login' className={classes.toHomeLink}>
                  <img src={logo} height={50} alt='Back to Home' />
                </Link>
              )}
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
            <p className='text-center text-gray-light'>
              <span className="text-gray-dark">
                © 2017 <strong className="m-r-1">InfoSweep.</strong>
                All rights reserved.
              </span>
            </p>
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
