import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { fetchUser } from 'routes/auth/modules/auth';

class AppContainer extends React.Component {
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
    const { history, routes, routerKey, store } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={history} children={routes} key={routerKey} />
        </div>
      </Provider>
    )
  }
}

const mapStateToProps = () => {return {}}
const mapActionCreators = {
  fetchUser
}

export default connect(mapStateToProps, mapActionCreators)(AppContainer)
