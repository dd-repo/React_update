import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { fetchUser } from 'routes/auth/modules/auth';
import { Spinner } from 'components';

class AppContainer extends React.Component {
  constructor() {
    super()
    this.state = {isFetching: true}
  }
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    routerKey: PropTypes.number,
    store: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.fetchUser()
  }

  render () {
    const { history, routes, routerKey, store, currentUser } = this.props

    const isFetching = (
      currentUser.isFetching === true
        ||
          currentUser.isFetching === undefined
    )

    if(!isFetching) {
      return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={history} children={routes} key={routerKey} />
        </div>
      </Provider>
    )
    }else{
      return <Spinner />
    }
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}
const mapActionCreators = {
  fetchUser
}

export default connect(mapStateToProps, mapActionCreators)(AppContainer)
