import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import { submitKeyword } from 'routes/admin/Users/Client/modules/keywords'
import {
    Col,
    Modal,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from 'components'

const renderInput = ({ input, type }) => {
  return (
    <FormControl
      {...input}
      type={type}
    />
  )
}

const KeywordFormModal = props => {
  const _onSubmit = (data) => {
    props.hideModal()
    props.dispatch(submitKeyword(data, props.accountId))
  }

  return (
      <Modal show onHide={props.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {'Edit Keyword '}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={props.handleSubmit(_onSubmit)} horizontal>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Keyword
              </Col>
              <Col sm={9}>
                <Field
                  name='value'
                  type='text'
                  component={renderInput}
                />
              </Col>
            </FormGroup>
            <Modal.Footer>
              <Button onClick={props.hideModal}>Close</Button>
              <Button bsStyle='primary' type='submit'>Save</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
  )
}

const reduxUserEdit = reduxForm({
  form: 'keywordEdit',
  enableReinitialize: true
})(KeywordFormModal)

const mapStateToProps = state => ({
  accountId: state.user.account.id
})

export default connect(
  mapStateToProps
)(reduxUserEdit)
