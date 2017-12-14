import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'

import { ReduxFormInput } from 'components/Forms/components'
import { checkValidation } from 'utils/formHelpers'
import formFields from 'consts/formFields'
import { Row, Col } from 'components'

const validate = values => {
  return checkValidation(values, formFields)
}

class SignupForm extends Component {
  constructor () {
    super()
    this.state = {
      passwordField: formFields.password,
      hidePassword: true
    }
  }

  _onClick = (e) => {
    this.props.showModal(e.target.name)
  }

  _onButtonClick = () => {
    this.props.invalid && this.props.scrollTop()
  }

  showPassword = () => {
    const type = this.state.hidePassword ? 'text' : 'password'
    this.setState({
      passwordField: { ...this.state.passwordField, type },
      hidePassword: !this.state.hidePassword
    })
  }

  render () {
    const {
      submitForm,
      handleSubmit,
      invalid,
      submitting,
      scrollTop,
      showModal
    } = this.props

    return (
      <Row>
        <Col md={10}>
          <form onSubmit={handleSubmit(submitForm)}>
            <ReduxFormInput field={formFields.fullName} />
            <ReduxFormInput field={formFields.email} />
            <ReduxFormInput field={this.state.passwordField} />
            <label>
              <Toggle
                className="v-a-m"
                defaultChecked={!this.state.hidePassword}
                onChange={this.showPassword}
              />
              <span className="m-l-1">
                {this.state.hidePassword ? 'Show Password' : 'Hide Password'}
              </span>
            </label>
            <p className='text-center m-t-3'>
              By clicking Register, you agree to
              our <a name='TOS' onClick={this._onClick}> Terms </a>
              and that you have read
              our <a name='PRIVACY_POLICY' onClick={this._onClick}> Privacy Policy</a>,
              including our Cookie Use.
            </p>

            <span className='m-r-1'>
              <button
                className='btn btn-primary m-b-2'
                disabled={submitting}
                onClick={this._onButtonClick}
                action="submit"
              >
                Continue
              </button>
            </span>
            <i className='fa fa-lock m-r-1' />
            Secure Server
          </form>
        </Col>
      </Row>
    )
  }
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  passwordErrorMsg: PropTypes.string,
  showModal: PropTypes.func,
  scrollTop: PropTypes.func,
  submitForm: PropTypes.func.isRequired
}

SignupForm = reduxForm({
  form: 'signupForm',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})(SignupForm)

export default SignupForm
