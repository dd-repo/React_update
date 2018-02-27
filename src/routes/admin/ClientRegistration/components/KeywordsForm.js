import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'

import { checkValidation } from 'utils/formHelpers'
import formFields from 'consts/formFields'
import { ReduxFormInput } from 'components/Forms/components'
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

const KeywordForm = props => {
  return (
    <Row>
      <Col lg={12}>
        <form
          onSubmit={props.handleSubmit(props.handleKeywords)}
        >
          <Row>
            <Divider>
              <h4 className="m-l-2">
                Keywords
              </h4>
            </Divider>
          </Row>
          <Row>
            {
              Object.keys(props.initialValues).map((keywordId, i) => (
                <FormGroup controlId="formSizingColumn" key={keywordId}>
                  <Col sm={12}>
                    <Row>
                      <Col sm={10}>
                        <label>
                          Keyword {i+1}
                        </label>
                        <ReduxFormInput field={{name: `${keywordId}`}} />
                      </Col>
                    </Row>
                  </Col>
                </FormGroup>
              ))
            }
          </Row>
          <Button
            bsStyle='primary'
            className='btn btn-primary btn-lg pull-right m-b-2'
            disabled={props.invalid || props.isFetching}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Col>
    </Row>
  )
}

KeywordForm.propTypes = {
  handleKeywords: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  isFetching: PropTypes.bool
}

export default reduxForm({
  form: 'keywordsForm',
  validate
})(KeywordForm)
