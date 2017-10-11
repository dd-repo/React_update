import React, { PropTypes } from 'react';
import hideIfNoData from 'HOC/hideIfNoData';
import {
  Alert,
  Button
} from 'components'

const enhancer = hideIfNoData(
  props => !props.flashMessage.message
)

const FlashMessage = enhancer(({ flashMessage, clearMessage }) => (
  <Alert bsStyle={flashMessage.status}>
    <Button
      bsStyle='link'
      onClick={clearMessage}
    >
      <i className={`fa fa-times-circle fa-lg text-${flashMessage.status} pull-right`}></i>
    </Button>
    {flashMessage.message}
  </Alert>
))

FlashMessage.propTypes = {
  flashMessage: PropTypes.object,
  clearMessage: PropTypes.func
}

export default FlashMessage;
