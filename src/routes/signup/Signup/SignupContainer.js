import React from 'react'
import Signup from './components/Signup'
import ReactGA from 'react-ga'

import { RoutedComponent, connect } from 'routes/routedComponent'
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout'
import { persistData } from 'localStorage'
import {
  postUserSignup,
  removeErrorMessage,
  USER_SIGNUP_FAILURE,
  USER_SIGNUP_SUCCESS
} from 'routes/auth/modules/auth'
import { buildSignupParams } from 'utils/paramsHelper'
import { showModal } from 'modules/modal'
import RootModal from 'components/Modals'

const persistDataToLocalStorage = data => {
  const { auth_token } = data

  persistData(auth_token, 'authToken')
}

class SignupContainer extends RoutedComponent {
  constructor (props) {
    super(props)
    this.state = {}

    this.submitForm = this.submitForm.bind(this)
    this.doNext = this.doNext.bind(this)
  }

  static contextTypes = {
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

  submitForm (user) {
    const payload = buildSignupParams(user)
    this.props.postUserSignup(payload)
      .then(res => { this.doNext(res) })
      .catch(error => { console.log('error user signup', error) })
  }

  doNext (res) {
    switch (res.type) {
      case USER_SIGNUP_SUCCESS:
        persistDataToLocalStorage(res.data)
        this.context.router.push('/payment')
        this.props.removeErrorMessage()
        break
      case USER_SIGNUP_FAILURE:
        this.scrollTop()
        break
      default:
        return null
    }
  }

  scrollTop () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div>
        <Signup
          submitForm={this.submitForm}
          errorMessage={this.props.currentUser.errorMessage}
          scrollTop={this.scrollTop}
          showModal={this.props.showModal}
        />
        <RootModal />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  form: state.form
})

const mapActionCreators = {
  postUserSignup,
  showModal,
  removeErrorMessage
}

export default connect(mapStateToProps, mapActionCreators)(SignupContainer)
