import React, { PropTypes } from 'react';
import { compose } from 'recompose';

import { SpinnerWhileLoading, hideIfNoData } from 'HOC';
import RootModal from 'components/Modals';
import { Row, Col, Alert, Button, FlashMessage } from 'components';
import Header from '../Header';
import AdminDetails from '../AdminDetails';
import classes from '../admin.scss';

const withLoader = SpinnerWhileLoading(
  props => props.isFetching
)

const enhancer = hideIfNoData(
  props => props.isFetching
)

const Admin = ({
  admin,
  isFetching,
  notification,
  clearMessage,
  handleFormSubmit,
  showModal }) => {

  return (
    <div className={classes.mainWrap}>
      <Row>
        <Col lg={6}>
          <Header fullName={admin.fullName} />
        </Col>
      </Row>
      <FlashMessage
        flashMessage={notification}
        clearMessage={clearMessage}
      />
      <AdminDetails
        admin={admin}
        showModal={showModal}
        isFetching={isFetching}
        handleFormSubmit={handleFormSubmit}
      />
      <RootModal />
    </div>
  )
}
Admin.defaultProps = {
  notification: {},
  admin: {}
}
Admin.propTypes = {
  admin: PropTypes.object,
  isFetching: PropTypes.bool,
  notification: PropTypes.object,
}

//export default compose(withLoader)(Admin);
export default Admin;
