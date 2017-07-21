import { compose, branch, renderNothing } from 'recompose';

const hideIfNoData = notification =>
branch(
  notification,
  renderNothing
)

const enhance = hideIfNoData(props => !(props.notification))

const withAlertMessage = enhance(({ notification }) => (
  <Alert bsStyle={props.notification.status}>
    <Button
      bsStyle='link'
      onClick={props.clearMessage}
    >
      <i className={`fa fa-times-circle fa-lg text-${props.notification.status} pull-right`}></i>
    </Button>
    {props.notification.message}
  </Alert>
))

export default withAlertMessage;

