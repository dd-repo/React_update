import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'

import { ReduxFormInput } from 'mcomponents/Forms/components'
import { checkValidation } from 'utils/formHelpers'
import formFields from 'consts/formFields'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

/*
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
*/

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

const validate = values => {
  return checkValidation(values, formFields)
}

const LoginForm = ({ submitForm, handleSubmit }) => {

  return (
    <form onSubmit={handleSubmit(submitForm)}>

      <ReduxFormInput field={formFields.email}
        // the following properties are needed by the material theme
        labelText={formFields.email.label}  // formFields.label
        id={formFields.email.name}            // formFields.name
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          type:"email",
          endAdornment: ""
        }} />

      <ReduxFormInput field={formFields.password}
        labelText={formFields.password.label}  // formFields.label
        id={formFields.password.name}            // formFields.name
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          type:"password",
          endAdornment: ""
        }} />
        <button
          className='full-width btn btn-primary m-b-2'
          action="submit"
          /*onClick={(event) => handleClick(event, submitForm, handleSubmit)}*/>
            Login
        </button>
    </form>
  )

  /* OLD
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <ReduxFormInput field={formFields.email} />
      <ReduxFormInput field={formFields.password} />
        <button
        className='full-width btn btn-primary m-b-2'
        action="submit"
        >
          Login
        </button>
    </form>
  )
  */
}

LoginForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func
}

export default reduxForm({
  form: 'loginForm',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})( (withStyles(loginPageStyle)(LoginForm)) )
