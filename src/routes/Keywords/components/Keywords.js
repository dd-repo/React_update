import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'routes/RoutedComponent';
import { Link } from 'react-router';

import {
  checkValidation,
  normalizeDate,
  normalizeNums
} from 'utils/formHelpers.js';
import { Row, Col, Panel, Button } from 'components';
import classes from './keywords.scss';
import AddressForm from './AddressForm';
import DateOfBirthForm from './DateOfBirthForm';
import logo from 'static/spin-logo-inverted.png';
//import ProgressIndicator from './ProgressIndicator';

const fields = {
  address: {
    name: 'address',
    type: 'text',
    label: 'Street Address',
  },
  city: {
    name: 'city',
    type: 'text',
    label: 'City / Town',
  },
  state: {
    name: 'state',
    type: 'text',
    label: 'CO'
  },
  zipcode: {
    name: 'zipcode',
    type: 'text',
    label: 'Zipcode',
    normalize: normalizeNums,
    maxLength: 5
  },
  dob: {
    name: 'dob',
    type: 'text',
    label: 'MM / DD / YYYY',
    normalize: normalizeDate
  }
}

const validate = values => {
  return checkValidation(values, fields)
}

const renderInput = ({ input, label, type, maxLength, field, meta: { touched, error, warning } }) => (
  <div>
    <input {...input}
      className="form-control input-group-lg reg_name"
      placeholder={label}
      maxLength={maxLength}
      type={type}/>
    {warning && <span>{warning}</span>}
    {touched && ((error && <span className='alert-danger'>{error}</span>) )}
  </div>
)

const renderField = ({name, type, label, maxLength, normalize}) => (
  <Field
    name={name}
    type={type}
    label={label}
    component={renderInput}
    normalize={normalize}
    maxLength={maxLength}
  />
)

let Keywords = ({ errorMessage, currentForm, handleSubmit, invalid, submitting, renderNextForm, submitForm }) => {
  const error = (
    <p className="alert-danger">
      {errorMessage}
    </p>
  )

  const form = () => {
    if(currentForm === 'address') {
      return <AddressForm
        renderNextForm={renderNextForm}
        handleSubmit={handleSubmit}
        invalid={invalid}
        submitting={submitting}
        renderField={renderField}
        fields={fields}
      />
    } else {
      return <DateOfBirthForm
        handleSubmit={handleSubmit}
        invalid={invalid}
        submitting={submitting}
        submitForm={submitForm}
        renderField={renderField}
        fields={fields}
      />
    }
  }

  return (
    <Row>
      <Col lg={ 12 }>
        <Button className='m-t-2 m-b-1' onClick={ () => this.props.history.goBack() }>
          <i className='fa fa-angle-left m-r-1'></i>
          Back
        </Button>

        <Row>
          {error}
          <Col className={ classes.centerCol } md={ 4 }>
            <Panel
              className={ classes.registerPanel }
              header={(
                <Link to='/' className={ classes.toHomeLink }>
                  <img src={ logo } alt='Back to Home' />
                </Link>
                )}
                footer={(
                  <div>
                    <Link to='/pages/forgot-password'>
                      Forgot Password?
                    </Link>
                    <Link to='/pages/login' className='pull-right'>
                      Login
                    </Link>
                  </div>
                  )}
                >
                  <h2 className={ classes.panelHeader }>
                    Register
                  </h2>
                  <p className='text-center m-b-3'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                  </p>
                  {form()}
                </Panel>
                <p className='text-center text-gray-light'>
                  <strong>SPIN Dashboard </strong>
                  <span className='text-gray-light'>
                    © 2009 - 2016. Made by <i className="fa fa-fw fa-heart text-danger"></i> New York, US
                  </span>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
  )
}

Keywords.propTypes = {
  submitForm: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired
}

Keywords = reduxForm({
  form: 'keywordForm',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})(Keywords);

Keywords = connect(
  state => ({
    initialValues: state.keywords.all[0]
  })
)(Keywords)

export default Keywords;
