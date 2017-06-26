import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import {
    Col,
    Modal,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from 'components';

const renderInput = ({ input, type }) => {
  return (
    <FormControl
      {...input}
      type={type}
    />
  )
}

const KeywordEditModal = props => {
  return (
    props.initialValues ?
      <Modal show={ props.show } onHide={() => { props.toggleModal('keywords', false) }}>
        <Modal.Header closeButton>
          <Modal.Title>
            { 'Edit Keyword ' }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={props.handleSubmit(props.submitForm)} horizontal>
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
              <Button onClick={() => { props.toggleModal('keywords', false) } }>Close</Button>
              <Button bsStyle='primary' type='submit'>Save</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
        :
          <div></div>
  );
}

KeywordEditModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func
};

KeywordEditModal.defaultProps = {
    onClose: () => { }
};

const reduxUserEdit = reduxForm({
  form: 'keywordEdit',
  enableReinitialize: true
})(KeywordEditModal)

export default reduxUserEdit;
