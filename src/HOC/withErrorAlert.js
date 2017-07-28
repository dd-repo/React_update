import React from 'react';
import hideIfNoData from './hideIfNoData';
import { Alert } from 'components';

const enhance = hideIfNoData(
  props => !(props.errorMessage)
)

const withErrorAlert = enhance(props => (
  <Alert bsStyle='danger'>
    {props.errorMessage}
  </Alert>
))

export default withErrorAlert;
