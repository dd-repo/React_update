import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'

import { checkValidation } from 'utils/formHelpers'
import formFields from 'consts/formFields'
import { ReduxFormSelect, ReduxFormInput, UserSelect } from 'components/Forms/components'
import classes from './clientRegistration.scss'
import {
  FormGroup,
  Col,
  Row,
  Button,
  Divider
} from 'components'

const validate = values => {
  return checkValidation(values, formFields)
}

const CreateClientForm = props => {
  return (
    <Row>
      <Col lg={12}>
        <form
          onSubmit={props.handleSubmit(props.handleNewClient)}
        >
          <Row>
            <Divider>
              <h4 className="m-l-2">
                Or create client
              </h4>
            </Divider>
            <FormGroup controlId="formSizingColumn">
              <Col lg={12}>
                <Row>
                  <Col sm={6}>
                    <ReduxFormInput field={formFields.firstName} />
                  </Col>
                  <Col sm={6}>
                    <ReduxFormInput field={formFields.lastName} />
                  </Col>
                </Row>
              </Col>
            </FormGroup>
            <FormGroup controlId="formSizingColumn">
              <Col sm={12}>
                <Row>
                  <Col sm={4}>
                    <ReduxFormInput field={formFields.email} />
                  </Col>
                  <Col sm={3}>
                    <ReduxFormInput field={formFields.phoneNumber} />
                  </Col>
                  <Col sm={5}>
                    <label>
                      Date Of Birth
                    </label>
                    <div className={classes.inlineInputs}>
                      <ReduxFormSelect
                        className={classes.customSelect}
                        field={formFields.dobMonth} />
                      <ReduxFormSelect
                        className={classes.customSelect}
                        field={formFields.dobDay}
                      />
                      <ReduxFormSelect
                        className={classes.customSelect}
                        field={formFields.dobYear}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </FormGroup>
          </Row>
          <Button
            bsStyle='primary'
            className='btn btn-primary btn-lg pull-right m-b-2'
            disabled={props.invalid || props.isFetching}
            type="submit"
          >
            Create Client
          </Button>
        </form>
      </Col>
    </Row>
  )
}

CreateClientForm.propTypes = {
  handleNewClient: PropTypes.func.isRequired,
  isFetching: PropTypes.bool
}

export default reduxForm({
  form: 'ClientForm',
  validate
})(CreateClientForm)
