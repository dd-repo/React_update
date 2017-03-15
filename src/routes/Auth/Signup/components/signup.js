import React, { PropTypes } from 'react';

import SignupForm from './SignupForm';

const Signup = ({ errorMessage, submitForm, planType, price }) => {
  return (

        <SignupForm
          errorMessage={errorMessage}
          submitForm={submitForm}
          planType={planType}
          price={price}
        />

  )
}

Signup.propTypes = {
  submitForm: PropTypes.func.isRequired,
  planType: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  errorMessage: PropTypes.string
}

export default Signup;
