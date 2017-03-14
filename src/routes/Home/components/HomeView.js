import React, { PropTypes } from 'react'
import classes from './HomeView.scss'
import { RoutedComponent, connect } from './../../routedComponent'
import { Link } from 'react-router';

import PricingTables from './PricingTables'


const HomeView = (props) => {
  return (
    <div className='home-page'>
      <PricingTables
        handleClick={props.handleClick}
      />
    </div>
  );
}

HomeView.propTypes = {
  handleClick: PropTypes.func.isRequired
}

export default HomeView;
