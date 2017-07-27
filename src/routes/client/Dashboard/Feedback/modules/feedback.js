import clickadillyApi from 'services/clickadillyAPi';

export const FEEDBACK_POSTING = 'FEEDBACK_POSTING';
export const FEEDBACK_SUCCESS = 'FEEDBACK_SUCCESS';
export const FEEDBACK_FAILURE = 'FEEDBACK_FAILURE';
export const FEEDBACK_PATH = '/dashboard/api/v1/feedbacks';

export const sendFeedback = (data, user_id) => {
  const payload = {
    feedback: {
      ...data,
      user_id
    }
  }
  return dispatch => {
    dispatch(sendingFeedback())
    return clickadillyApi.post(FEEDBACK_PATH, payload)
    .then( response => dispatch(sentFeedbackSuccess()))
    .catch( error => dispatch(sentFeedbackFailure(error)))
  }
}

export const sendingFeedback = () => (
  {
    type: FEEDBACK_POSTING
  }
)

export const sentFeedbackSuccess = () => (
  {
    type: FEEDBACK_SUCCESS
  }
)

export const sentFeedbackFailure = error => (
  {
    type: FEEDBACK_FAILURE,
    error
  }
)

