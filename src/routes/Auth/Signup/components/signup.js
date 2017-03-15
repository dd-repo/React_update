import React, { PropTypes } from 'react';

import SignupForm from './SignupForm';

const Signup = ({ errorMessage, handleSubmit, plan }) => {
  return (

        <SignupForm
          errorMessage={errorMessage}
          handleSubmit={handleSubmit}
          planType={plan.type}
          price={plan.price}
        />

  )
}

Signup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  plan: PropTypes.object.isRequired,
  errorMessage: PropTypes.string
}

export default Signup;
