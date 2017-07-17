import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { buildCreditCardParams } from 'utils/paramsHelper';

import PaymentForm from 'routes/client/Payment/components/PaymentForm';
import { addCard } from 'routes/admin/Dashboard/User/modules/cards';
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

const CardModal = props => {

  const _onSubmit = (data) => {
    props.hideModal()
    props.dispatch(addCard(buildCreditCardParams(data), props.userId))
  }

  return (
      <Modal show={true} onHide={props.hideModal}>
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

const mapStateToProps = state => ({
  userId: state.user.details.id
})

export default connect(
  mapStateToProps
)(CardModal);
