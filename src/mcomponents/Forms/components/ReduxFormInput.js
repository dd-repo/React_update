import React from 'react'
import { Field } from 'redux-form'

/*
import {
  FormGroup,
  FormControl
} from 'components' // this is coming from bootstrap, it's in  components/index.jsx
*/

// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";

import customInputStyle from "assets/jss/material-dashboard-pro-react/components/customInputStyle.jsx";

const ReduxFormInput = ({ field, ...props }) => {
  const {
    name,
    type,
    label,
    placeHolder,
    maxLength,
    normalize
  } = field

  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
    helpText
  } = props;

  return (
    <Field
      name={name}
      type={type}
      label={label}
      placeholder={placeHolder}
      component={withStyles(customInputStyle)(renderInput)}
      normalize={normalize}
      maxLength={maxLength}

      classes={classes}
      formControlProps={formControlProps}
      labelText={labelText}
      id={id}
      labelProps={labelProps}
      inputProps={inputProps}
      error={error}
      white={white}
      inputRootCustomClasses={inputRootCustomClasses}
      success={success}
      helpText={helpText}
    />
  )
}

const renderInput = props => {
  const {
    /* OLD */
    name,
    input,
    label,
    placeholder,
    type,
    maxLength,
    meta: { touched, error, warning },

    /* NEW */
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    //error,
    white,
    inputRootCustomClasses,
    success,
    helpText
  } = props

  /* OLD */
  let message = touched &&
    (
      error && <span className='text-danger'>
        <strong>Opps!</strong> {error}
    </span>
    )
  let validationState = touched && (error && 'error') || null

  /* NEW */
  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white
  });
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white
  });
  var formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl;
  }
  var helpTextClasses = classNames({
    [classes.labelRootError]: error,
    [classes.labelRootSuccess]: success && !error
  });

  return (
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + " " + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input {...input}
        name={id}
        id={id}
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses
        }}
        {...inputProps}
      />
      {message !== undefined ? (
        <FormHelperText id={id + "-text"} className={helpTextClasses}>
          {message}
        </FormHelperText>
      ) : null}
    </FormControl>
  );

  /* OLD
  return (
    <FormGroup validationState={validationState}>
      <label>
        {label}
      </label>
      <FormControl {...input}
        placeholder={placeholder}
        maxLength={maxLength}
        type={type} />
      {message}
    </FormGroup>
  )
  */
}

export default ReduxFormInput
