import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import { Row, Col, Panel } from 'components'
import classes from './keywords.scss'
import AddressForm from './AddressForm'
import DateOfBirthForm from './DateOfBirthForm'
import formFields from 'consts/formFields'
import { checkValidation } from 'utils/formHelpers'

const validate = values => {
  return checkValidation(values, formFields)
}

const FORM_COMPONENTS = {
  'address': {
    component: AddressForm,
    title: 'Which Address Should We Protect?',
    description: "Quite a few websites sites share either all or part of your address. By filling in your address information, we can ensure that we're protecting your information even if the sites that share it don't have your full name, or if they have errors such as misspellings in your name. Only you can access this secure information, and we'll never share it with anyone."
  },
  'dob': {
    component: DateOfBirthForm,
    title: 'What is Your Date of Birth',
    description: "Many sites list a date of birth or age range along with the information that they post about you. When you provide us with your date of birth, we can check for sites that are spreading this information around. Of course we'll never give that information to anyone for any reason."
  }
}

class Keywords extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentForm: 'address'
    }
  }

  renderNextFormOrSubmit = (data) => {
    if (this.state.currentForm === 'address') {
      this.setState({currentForm: 'dob'})
    }
    if (this.state.currentForm === 'dob') {
      this.props.submitForm(data)
    }
  }

  renderForm = () => {
    const SpecificForm = FORM_COMPONENTS[this.state.currentForm]
    return (
      <div>
        <h2 className={classes.panelHeader}>
          {SpecificForm.title}
        </h2>
        <p>
          {SpecificForm.description}
        </p>
        <SpecificForm.component
          handleSubmit={this.props.handleSubmit}
          renderNextFormOrSubmit={this.renderNextFormOrSubmit}
          invalid={this.props.invalid}
          submitting={this.props.submitting}
          formFields={formFields}
        />
      </div>
    )
  }

  render () {
    return (
      <Row>
        <Col lg={12}>
          <Row>
            <Col className={classes.centerCol} md={4}>
              <Panel
                className={classes.registerPanel}
              >
                {this.renderForm()}
              </Panel>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

Keywords.propTypes = {
  submitForm: PropTypes.func.isRequired
}

Keywords = reduxForm({
  form: 'keywordForm',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})(Keywords)

export default Keywords
