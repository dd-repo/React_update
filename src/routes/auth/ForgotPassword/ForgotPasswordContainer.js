import React from 'react'
import ForgotPassword from './components/ForgotPassword'
import ForgotPasswordComplete from './components/ForgotPasswordComplete'

import { RoutedComponent, connect } from 'routes/routedComponent'
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout'
import { resetUserPassword } from '../modules/auth'

class ForgotPasswordContainer extends RoutedComponent {
  constructor (props) {
    super(props)
    this.state = {emailSent: false}
    this.submitForm = this.submitForm.bind(this)
  }

  static contexttypes = {
    router: React.PropTypes.object.isRequired
  }

  getLayoutOptions () {
    return {
      contentView: CONTENT_VIEW_STATIC,
      sidebarEnabled: false,
      navbarEnabled: true,
      footerEnabled: true,
      headerEnabled: false
    }
  }

  submitForm (email) {
    this.props.resetUserPassword(email)
    .then((res) => this.setState({emailSent: true}))
    .catch((error) => console.log('error in forgot password', error))
  }

  render () {
    if (!this.state.emailSent) {
      return (
        <ForgotPassword
          submitForm={this.submitForm}
        />
    )
    } else {
      return (
        <ForgotPasswordComplete
          userEmail={this.props.currentUser.email}
        />
      )
    }
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

const mapActionCreators = {
  resetUserPassword
}

export default connect(mapStateToProps, mapActionCreators)(ForgotPasswordContainer)
