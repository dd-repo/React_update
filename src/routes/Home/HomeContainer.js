import React, { Component } from 'react';

class HomeContainer extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    componentDidMount() {
      this.context.router.push('/signup');
    }

    render() {
      return (<span></span>);
    }
}

export default HomeContainer;
