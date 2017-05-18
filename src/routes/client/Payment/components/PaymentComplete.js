import React from 'react';
import { Link } from 'react-router';

import {
    Row,
    Col,
    Panel,
    Button,
    Form,
    FormGroup,
    FormControl,
} from 'components';

import classes from './payment.scss';

import logo from 'static/logos/logo-small.png';

const styles = {
  link: {
    textDecoration: 'none',
    color: 'white'
  }
}

class PaymentComplete extends React.Component {
  constructor(props) {
    super(props)
    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    this.props.handleClick()
  }
  render() {
    return (
      <Row>
        <Col lg={ 12 }>
          { /* <Button className='m-t-2 m-b-1' onClick={ () => this.props.history.goBack() }>
               <i className='fa fa-angle-left m-r-1'></i>
               Back
               </Button> */ }

               <Row>
                 <Col className={ classes.centerCol } md={ 4 }>
                   <Panel
                     header={(
                       <Link to='/' className={ classes.toHomeLink }>
                         <img src={ logo } alt='Back to Home' />
                       </Link>
                       )}
                     >
                       <h2 className={ classes.panelHeader }>
                         Your payment has been securely processed and you're ready to start protecting your privacy online!
                       </h2>
                       <p className='text-center m-b-3'>
                       </p>

                       <Button onClick={this._onClick} block bsStyle='primary' className='m-b-2'>
                         Continue
                       </Button>
                     </Panel>
                   </Col>
                 </Row>
               </Col>
             </Row>
    );
  }
}

export default PaymentComplete;
