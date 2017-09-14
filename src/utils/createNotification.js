export default (notification, status) => {
  if(typeof notification === 'string') {
    return (
      {
        message: notification,
        status
      }
    )
  }
  if(typeof notification === 'object') {
    const message = notification.response.data.errorMessage
    return (
      {
        message,
        status
      }
    )
  }
}
