import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

import UpdatePasswordForm from './UpdatePasswordForm'
import {
  Alert,
  Panel,
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel,
  Radio,
  Button,
  Divider
} from 'components';

import { Colors } from 'consts';

import classes from './accountEdit.scss';

const AccountEdit = (props) => {
  const {
    disableButton,
    submitForm,
    passwordErrorMsg,
    alert
  } = props

  const renderMessage = (
    alert &&
      <Alert bsStyle={alert.style}>
        <i className="fa fa-fw text-success m-r-1"></i>
        {alert.message}
      </Alert>
  )

  return (
    <div>
      {renderMessage}
      <Panel
        className='m-b-2'
        header={
          <h4 className='panel-title'>
            Account Edit
          </h4>
          }
          footer={
            <div>
              <i className="fa fa-fw fa-support m-r-1"></i>
              <span>
                If you have trouble with changing your password, you can contact us at (844) 641-7829.
              </span>
              { ' ' }
              <Link to='/apps/faq'>
                We can help.
              </Link>
            </div>
            }
          >

          <UpdatePasswordForm
            disableButton={disableButton}
            submitForm={submitForm}
            passwordErrorMsg={passwordErrorMsg}
          />

      </Panel>

        <Panel
          header={
            <h4 className='panel-title'>
              Delete Account
            </h4>
            }
            footer={
              <div>
                <i className="fa fa-fw fa-exclamation-circle m-r-1"></i>
                <span></span>
              </div>
              }
            >
              <p>
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button bsStyle='danger' className='btn-outline'>
                Delete Your Account
              </Button>
            </Panel>
          </div>
  )
}

export default AccountEdit;
