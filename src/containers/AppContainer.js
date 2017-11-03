import React from 'react'
import PropTypes from 'prop-types'
import { connect, Provider } from 'react-redux'
import { Router } from 'react-router'
import { fetchUser } from 'routes/auth/modules/auth'
import { Spinner } from 'components'

class AppContainer extends React.Component {
  constructor () {
    super()
    this.state = {isFetching: true}
  }
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    routerKey: PropTypes.number,
    store: PropTypes.object.isRequired,
    logPageView: PropTypes.func
  }

  componentWillMount () {
    const authToken = localStorage.getItem('authToken')
    authToken !== null
      ? this.props.fetchUser()
      : this.setState({isFetching: false})
  }

  componentWillReceiveProps (nextProps) {
    nextProps.currentUser.isFetching === false &&
      this.setState({isFetching: nextProps.currentUser.isFetching})
  }

  render () {
    const { history, routes, routerKey, store, logPageView } = this.props

    if (!this.state.isFetching) {
      return (
        <Provider store={store}>
          <div style={{ height: '100%' }}>
            <Router
              history={history}
              children={routes}
              key={routerKey}
              onUpdate={logPageView}
            />
          </div>
        </Provider>
      )
    } else {
      return <Spinner />
    }
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

const mapActionCreators = {
  fetchUser
}

export default connect(mapStateToProps, mapActionCreators)(AppContainer)
