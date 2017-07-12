import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import PaymentForm from 'routes/client/Payment/components/PaymentForm';
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

const NewCardModal = props => {

  const _onSubmit = (data) => {
    props.submitForm(data, 'card', 'post')
  }

  return (
      <Modal show={ props.show } onHide={() => { props.toggleModal('newCardModal', false) }}>
        <Modal.Header closeButton>
          <Modal.Title>
            { 'Add Card ' }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PaymentForm
            submitForm={_onSubmit}
            buttonLabel='Add Card'
          />
        </Modal.Body>
      </Modal>
  );
}

NewCardModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func
};

NewCardModal.defaultProps = {
    onClose: () => { }
};

//const form = reduxForm({
  //form: 'keywordNew'
//})(NewCardModal)

export default NewCardModal;

