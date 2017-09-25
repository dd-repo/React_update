import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';

import {
  checkValidation,
  normalizeDate,
  normalizeNums
} from 'utils/formHelpers.js';

import { Row, Col, Panel, Button } from 'components';
import { ReduxFormInput } from 'components/Forms/components';
import classes from './keywords.scss';
import AddressForm from './AddressForm';
import DateOfBirthForm from './DateOfBirthForm';
import fields from 'consts/formFields';

let title;
let description;

const validate = values => {
  return checkValidation(values, fields)
}

const renderInput = (props) => {
  const {
    input,
    label,
    type,
    maxLength,
    field,
    meta: { touched, error, warning }
  } = props

  return (
    <div>
      <input {...input}
        className="form-control input-group-lg reg_name"
        placeholder={label}
        maxLength={maxLength}
        type={type}/>
      {warning && <span>{warning}</span>}
      {touched &&
        ((error &&
          <span className='text-danger'>
            <strong>
              Opps!
            </strong>
            {error}
        </span>
        ))
      }
    </div>
  )
}

const renderField = (props) => {
  const {
    name,
    type,
    placeHolder,
    label,
    maxLength,
    normalize
  } = props

  return (
    <Field
      name={name}
      type={type}
      label={label}
      placeholder={placeHolder}
      component={ReduxFormInput}
      normalize={normalize}
      maxLength={maxLength}
    />
  )
}

let Keywords = (props) => {
  const {
    errorMessage,
    currentForm,
    handleSubmit,
    invalid,
    submitting,
    renderNextForm,
    submitForm,
    inputErrorMsg
  } = props

  const error = (
    <p className="alert-danger">
      {errorMessage}
    </p>
  )

  const form = () => {
    if(currentForm === 'address') {
      return <div>
        <h2 className={ classes.panelHeader }>
          Which Address Should We Protect?
        </h2>
        <p className='text-center m-b-3'>
          Quite a few websites sites share either all or part of your address. By filling in your address information, we can ensure that we're protecting your information even if the sites that share it don't have your full name, or if they have errors such as misspellings in your name. Only you can access this secure information, and we'll never share it with anyone.
        </p>
        <AddressForm
          renderNextForm={renderNextForm}
          handleSubmit={handleSubmit}
          invalid={invalid}
          submitting={submitting}
          renderField={renderField}
          Field={Field}
          inputErrorMsg={inputErrorMsg}
        />
      </div>
    } else {
      return <div>
        <h2 className={ classes.panelHeader }>
          What is Your Date of Birth
        </h2>
        <p className='text-center m-b-3'>
          Many sites list a date of birth or age range along with the information that they post about you. When you provide us with your date of birth, we can check for sites that are spreading this information around. Of course we'll never give that information to anyone for any reason
        </p>
         <DateOfBirthForm
          handleSubmit={handleSubmit}
          invalid={invalid}
          submitting={submitting}
          submitForm={submitForm}
          renderField={renderField}
          fields={fields}
        />
      </div>
    }
  }

  return (
    <Row>
      <Col lg={ 12 }>
        <Row>
          {error}
          <Col className={ classes.centerCol } md={ 4 }>
            <Panel
              className={ classes.registerPanel }
                >
                  { form() }
                </Panel>
              </Col>
            </Row>
          </Col>
        </Row>
  )
}

Keywords.propTypes = {
  submitForm: PropTypes.func.isRequired,
}

Keywords = reduxForm({
  form: 'keywordForm',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})(Keywords);

//Keywords = connect(
  //state => ({
    //initialValues: state.keywords.all[0]
  //})
//)(Keywords)

export default Keywords;
