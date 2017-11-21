import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import LoginForm from './LoginForm'
import classes from './Login.scss'
import {
    Row,
    Col,
    Panel,
    Alert
} from 'components'

const Login = ({ errorMessage, submitForm }) => {
  const renderErrorMessage = (
   errorMessage &&
     <Alert bsStyle='danger'>
       <i className="fa fa-fw text-danger m-r-1"></i>
       {errorMessage}
     </Alert>
  )

  return (
    <Row>
      <Col lg={12}>
        { /* <Button className='m-t-2 m-b-1' onClick={ () => this.props.history.goBack() }>
          <i className='fa fa-angle-left m-r-1'></i>
          Back
          </Button> */ }
          {renderErrorMessage}

        <Row>
          <Col className={classes.centerCol} md={4}>
            <Panel
              footer={(
                <div>
                  <Link to='/forgot-password'>
                    Forgot Password?
                  </Link>
                  <Link to='/signup' className='pull-right'>
                    Register
                  </Link>
                </div>
              )}
            >
              <h2 className={classes.panelHeader}>
                Login
              </h2>
              <p className='text-center m-b-3'>
                Enter the email address and password that you chose at signup to access your online privacy portal
              </p>

              <LoginForm
                submitForm={submitForm}
                errorMessage={errorMessage}
              />
            </Panel>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

Login.propTypes = {
  submitForm: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

export default Login
