import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'

import formFields from 'consts/formFields'
import { UserSelect } from 'components/Forms/components'
import classes from './clientRegistration.scss'
import {
  FormGroup,
  Col,
  Row,
  Button,
  Divider
} from 'components'

const validate = (values) => {
  const errors = {}
  if(!values.prospect) {
    errors['prospect'] = 'select a prospect'
  }
  return errors
}

const ProspectSelectForm = props => {
  return (
    <Row>
      <Col lg={12}>
        <form
          onSubmit={props.handleSubmit(props.handleProspectSelect)}
        >
          <Row>
            <Divider>
              <h4 className="m-l-2">
                Select a Prospect
              </h4>
            </Divider>
            <FormGroup controlId="formSizingColumn">
              <Col lg={12}>
                <Row>
                  <Col sm={6}>
                    <UserSelect 
                      name='prospect'
                      group='frontend'
                      role='prospect'
                      placeholder='Select prospect...'
                    />
                  </Col>
                </Row>
              </Col>
            </FormGroup>
          </Row>
            <Button
              bsStyle='primary'
              className='btn btn-primary btn-lg pull-right m-b-2'
              disabled={props.invalid}
              type="submit"
            >
              Next
            </Button>
        </form>
      </Col>
    </Row>
  )
}

ProspectSelectForm.propTypes = {
  handleProspectSelect: PropTypes.func.isRequired,
  isFetching: PropTypes.bool
}

export default reduxForm({
  form: 'prospectSelectForm',
  validate
})(ProspectSelectForm)
