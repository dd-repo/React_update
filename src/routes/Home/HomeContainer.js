import React from 'react';
import Home from './components/HomeView';

class HomeContainer extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    componentDidMount() {
        //this.context.router.push('/start/projects');
    }

    render() {
      return <Home />;
    }
}

export default HomeContainer;
