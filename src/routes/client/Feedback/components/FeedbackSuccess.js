import React from 'react';
import classes from './feedback.scss';
import {
  Row,
  Col,
  Panel,
  Button
} from 'components';

const FeedbackSuccess = ({ resetForm }) => (
  <Col className={ classes.centerCol } md={ 4 }>
    <Panel
      className={ classes.registerPanel }
    >
      <h2 className={ classes.panelHeader }>
        Your Feedback had been submitted!
      </h2>
        <div className={classes.iconElement}>
          <span className={ `${ classes.icon } glyphicon glyphicon-ok text-success text-center` }></span>
        </div>
        <p className='text-center m-b-3'>
          Thank you for helping us improve our services. We will evalutate your feedback and do our best to correct any issues you might be experiencing.
        </p>
        <Button bsStyle='success' className='full-width' onClick={resetForm}>
          Send More Feedback
        </Button>
    </Panel>
  </Col>
)

export default FeedbackSuccess;
