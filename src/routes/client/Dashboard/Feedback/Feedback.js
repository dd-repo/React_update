import React from 'react';
import { RoutedComponent, connect } from 'routes/routedComponent';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';

import { sendFeedback } from './modules/feedback';
import FeedbackForm from './components/FeedbackForm';
import FeedbackSuccess from './components/FeedbackSuccess';
import {
  FEEDBACK_SUCCESS,
  FEEDBACK_FAILURE
} from './modules/feedback';
import {
  Row,
  Col,
  Alert
} from 'components';

export class Feedback extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {}

    this.submitFeedback = this.submitFeedback.bind(this);
    this.onNext = this.onNext.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  getLayoutOptions() {
    return {
      contentView: CONTENT_VIEW_STATIC,
      sidebarEnabled: true,
      navbarEnabled: true,
      footerEnabled: true,
      headerEnabled: true
    }
  }

  submitFeedback(values) {
    this.props.sendFeedback(values, this.props.userId)
    .then( res => this.onNext(res))
  }

  onNext(res) {
    switch(res.type) {
      case FEEDBACK_SUCCESS:
        this.setState({
          isFetching: false,
          success: true
        })
        break;
      case FEEDBACK_FAILURE:
        this.setState({
          isFetching: false,
          success: false,
          errorMessage: res.error.response.data.errorMessage
        })
        break;
    }
  }

  resetForm() {
    this.setState({success: null})
  }

  render() {
    const renderAlert = (
      this.state.errorMessage &&
        <Alert bsStyle='danger'>
          {this.state.errorMessage}
        </Alert>
    )

    return (
      <Row>
        <Col lg={ 12 }>
          { renderAlert }
          <Row>
            {!this.state.success &&
              <FeedbackForm
              isFetching={this.state.isFetching}
              submitFeedback={this.submitFeedback}
            />}

            {this.state.success &&
              <FeedbackSuccess
                resetForm={this.resetForm} />}
          </Row>
    </Col>
  </Row>
    )
  }
}
const mapStateToProps = state => ({
  userId: state.currentUser.id
})

const mapActionCreators = {
  sendFeedback
}

export default connect(
  mapStateToProps,
  mapActionCreators
)(Feedback);
