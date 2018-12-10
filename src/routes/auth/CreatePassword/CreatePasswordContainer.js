import PropTypes from 'prop-types';
import React from 'react'
import CreatePassword from './components/CreatePassword'
import { persistData } from 'localStorage'

import { RoutedComponent, connect } from 'routes/routedComponent'
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout'
import {
  updateUserPassword,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE
} from '../modules/auth'

const persistDataToLocalStorage = ({ auth_token }) => {
  persistData(auth_token, 'authToken')
  persistData(true, 'isLoggedIn')
}

class CreatePasswordContainer extends RoutedComponent {
  constructor (props) {
    super(props)
    this.state = {}

    this.submitForm = this.submitForm.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
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

  submitForm (formData) {
    if (formData.password !== formData.passwordConfirmation) {
      this.setState({passwordErrorMsg: 'Passwords Do Not Match'})
    } else {
      this.setState({passwordErrorMsg: null})
      formData.reset_password_token = this.parseParamsToken()
      this.props.updateUserPassword(formData)
        .then(res => { this.doNext(res) })
        .catch(error => { console.log('error user password create', error) })
    }
  }

  parseParamsToken () {
    const searchParam = this.props.location.search
    return searchParam.split('=').pop().trim()
  }

  doNext (res) {
    switch (res.type) {
    case USER_LOGIN_SUCCESS:
      persistDataToLocalStorage(res.data)
      this.context.router.push('/dashboard')
      break
    case USER_LOGIN_FAILURE:
      this.setState({errorMessage: res.error.response.data.errorMessage})
      break
    default:
      return null
    }
  }

  render () {
    return (
      <CreatePassword
        submitForm={this.submitForm}
        errorMessage={this.state.errorMessage}
        passwordErrorMsg={this.state.passwordErrorMsg}
      />
    )
  }
}

const mapStateToProps = state => ({
  form: state.form
})

const mapActionCreators = {
  updateUserPassword
}

export default connect(mapStateToProps, mapActionCreators)(CreatePasswordContainer)
