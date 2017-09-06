import React, { PropTypes } from 'react';
import hideIfNoData from 'HOC/hideIfNoData';
import {
  Alert,
  Button
} from 'components'

const enhancer = hideIfNoData(
  props => !props.notification.message
)

const FlashMessage = enhancer(({ notification, clearMessage }) => (
  <Alert bsStyle={notification.status}>
    <Button
      bsStyle='link'
      onClick={clearMessage}
    >
      <i className={`fa fa-times-circle fa-lg text-${notification.status} pull-right`}></i>
    </Button>
    {notification.message}
  </Alert>
))

FlashMessage.propTypes = {
  notification: PropTypes.object,
  clearMessage: PropTypes.func
}

export default FlashMessage;
