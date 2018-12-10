import PropTypes from 'prop-types';
import React from 'react'
import ClientRegistration from './components/ClientRegistration'
import { reset } from 'redux-form'
import { RoutedComponent, connect } from 'routes/routedComponent'
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout'
import infosweepApi from 'services/infosweepApi'
import { sanitizeNums, formatDate } from 'utils'

// const CLIENT_SIGNUP_REQUEST = '/admin/api/signup'
const PROSPECT_CREATE_REQUEST = '/admin/api/create-prospect'
const PAYMENT_REQUEST = '/admin/api/create-subscription'
const KEYWORDS_UPDATE_REQUEST = '/admin/api/update-keywords'

class ClientRegistrationContainer extends RoutedComponent {
  constructor (props) {
    super(props)

    this.state = {
      isFetching: false,
      client: {},
      keywords: {},
      notification: {},
      nextStep: 'client'
    }

    this.handleSuccess = this.handleSuccess.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  getLayoutOptions () {
    return {
      contentView: CONTENT_VIEW_STATIC,
      sidebarEnabled: true,
      navbarEnabled: true,
      footerEnabled: true,
      headerEnabled: false
    }
  }
  

  handleProspectSelect = data => {
    this.toggleIsFetching()
    this.handleSuccess({user_id: data.prospect.value}, 'client')
  }

  handleNewClient = data => {
    this.toggleIsFetching()
    const payload = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      dob: this.formatDateOfBirth(data),
      phone_number: data.phoneNumber,
      phone_type: 'mobile',
      role: 'prospect',
      group: 'frontend'
    }
    this.sendClient(payload)
  }

  formatDateOfBirth = ({ dobMonth, dobDay, dobYear })  => {
    if (dobMonth && dobDay && dobYear) {
      return `${dobDay.value}-${dobMonth.value}-${dobYear.value}`
    } else {
      return null
    }
  }

  handlePayment = (data) => {
    const payload = {
      user: this.state.client.user_id,
      plan: data.plan.value,
      card_holder_name: data.fullName,
      card_number: sanitizeNums(data.creditCardNumber),
      card_month: data.expirationMonth.value,
      card_year: data.expirationYear.value,
      card_cvc: data.cvCode,
      address: data.address,
      city: data.city,
      state: data.state.value,
      zip: data.zipcode
    }
    this.sendPaymentDetails(payload)
  }

  sendClient = (payload) => {
    infosweepApi.post(PROSPECT_CREATE_REQUEST, payload)
      .then( response => this.handleSuccess(response.data, 'client'))
      .catch(error => this.handleErrors(error))
  }

  sendPaymentDetails = payload => {
    this.toggleIsFetching()
    infosweepApi.post(PAYMENT_REQUEST, payload)
      .then( response => this.handleSuccess(response.data, 'payment'))
      .catch( error => this.handleErrors(error))
  }

  handleKeywords = keywords => {
    this.toggleIsFetching()
    infosweepApi.post(KEYWORDS_UPDATE_REQUEST, this.formatKeywordParams(keywords))
      .then( response => this.handleSuccess(response, 'keywords'))
      .catch( error => this.handleErrors(error))
  }

  formatKeywordParams = keywords => {
    return Object.keys(keywords).map(id => ({
      id, value: keywords[id]
    }))
  }

  formatKeywords = keywords => {
    const keywordValues = {}
    for(let keyword of keywords) {
      keywordValues[keyword.id] = keyword.value
    }
    return keywordValues
  }

  handleSuccess (data, type) {
    switch (type) {
      case 'client':
        this.setState({
          client: data,
          nextStep: 'payment',
          isFetching: false,
          notification: {}
        })
        break;
      case 'payment':
        this.setState({
          keywords: this.formatKeywords(data.keywords),
          nextStep: 'keywords',
          isFetching: false,
          notification: {}
        })
        break;
      case 'keywords':
        this.setState({
          notification: {
            message: 'Registration Successfully Completed',
            status: 'success'
          },
          nextStep: 'client',
          client: {},
          keywords: {},
          isFetching: false
        })
        this.resetNotification()
    }
  }

  handleErrors (error) {
    this.toggleIsFetching()
    this.setState({
      notification: { message: this.formatErrorMessages(error), status: 'danger' },
      isFetching: false
    })
  }

  formatErrorMessages (error) {
    if(this.hasErrorMessage(error)) {
      const { errorMessage } = error.response.data
      console.log('client registration errors', errorMessage)
      return this.parseErrorMessage(errorMessage)
    }else{
      return 'Oops something went wrong'
    }
  }

  hasErrorMessage (error) {
    return (
      error.response
      || error.response.data 
      || error.response.data.errorMessage
    )
  }

  parseErrorMessage (errorMessage) {
    if (typeof errorMessage === 'string') { return errorMessage }
    if (typeof errorMessage === 'object') {
      const errorMessageArray = Object.keys(errorMessage).map( key => (
        errorMessage[key]
      ))
      return errorMessageArray.join(' ')
    }
  }

  toggleIsFetching = () => {
    const { isFetching } = this.state
    this.setState({ isFetching: !isFetching })
  }

  resetNotification = () => {
    setTimeout( () => { this.setState({ notification: {} }) }, 5000)
  }

  render () {
    return (
      <ClientRegistration
        handleNewClient={this.handleNewClient}
        handleProspectSelect={this.handleProspectSelect}
        handlePayment={this.handlePayment}
        handleKeywords={this.handleKeywords}
        {...this.state}
      />
    )
  }
}

const mapStateToProps = state => ({
  form: state.form
})

const mapActionCreators = {
  reset
}

export default connect(mapStateToProps, mapActionCreators)(ClientRegistrationContainer)
