import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import CreatePasswordForm from './CreatePasswordForm'
import {
    Row,
    Col,
    Panel,
    Alert
} from 'components'

import classes from './createPassword.scss'

const CreatePassword = ({
  submitForm,
  passwordErrorMsg,
  errorMessage
}) => {
  const renderErrorMsg = (
    errorMessage &&
      <Alert bsStyle='danger'>
        <i className='fa fa-fw text-danger m-r-1'></i>
        {errorMessage}
      </Alert>
  )

  return (
    <Row>
      <Col lg={12}>
        <Row>
          {renderErrorMsg}
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
                Create Password
              </h2>
              <p className='text-center m-b-3'>
              </p>

              <CreatePasswordForm
                submitForm={submitForm}
                passwordErrorMsg={passwordErrorMsg}
              />
            </Panel>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

CreatePassword.propTypes = {
  submitForm: PropTypes.func.isRequired,
  passwordErrorMsg: PropTypes.string,
  errorMessage: PropTypes.string
}

export default CreatePassword
