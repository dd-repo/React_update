import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
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
import { updateProfile } from 'routes/admin/Users/Client/modules/profile';
import { getDataUrl } from 'utils';
import classes from './profile.scss'

const renderInput = ({ input, type }) => {
  return (
    <FormControl
      {...input}
      type={type}
    />
  )
}

const renderFileInput = ({ input, className }) => {
  return (
    <label className={classes.fileUploaderLabel}>
      select file
      <input
        {...input}
        value={null}
        className={className}
        type='file'
      />
    </label>
  )
}

const UpdateProfileModal = props => {
  const _onSubmit = (data) => {
    let params = {
      id: data.id,
      middle_name: data.middle_name,
      maiden_name: data.maiden_name
    }

    if (data.dl) {
      getDataUrl(data.dl[0])
        .then(dataUrl => {
          props.dispatch(updateProfile(
            {
              ...params,
              driver_license: dataUrl
            }
          ))
        })
    } else {
      props.dispatch(updateProfile(params))
    }
    props.hideModal()
  }

  return (
    <Modal show={true} onHide={props.hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          { 'Edit Profile ' }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={props.handleSubmit(_onSubmit)} horizontal>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>
              Driver License
            </Col>
            <Col sm={9}>
              <Field
                name='dl'
                type='file'
                className={classes.fileUploader}
                component={renderFileInput}
              />
              {
                props.formValues && props.formValues.values && props.formValues.values.dl && props.formValues.values.dl[0] && props.formValues.values.dl[0].name
              }
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>
              Middle Name
            </Col>
            <Col sm={9}>
              <Field
                name='middle_name'
                type='text'
                component={renderInput}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>
              Madien Name
            </Col>
            <Col sm={9}>
              <Field
                name='maiden_name'
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
  );
}

const reduxUserEdit = reduxForm({
  form: 'profileEdit',
  enableReinitialize: true
})(UpdateProfileModal)

const mapStateToProps = state => ({
  formValues: state.form.profileEdit
})

export default connect(mapStateToProps)(reduxUserEdit);
