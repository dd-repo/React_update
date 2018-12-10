import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import LoginForm from './LoginForm'
import classes from './Login.scss'
import {
    Row,
    Col,
    Panel,
    Alert
} from 'components'

/* NEW */

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
/*
// core components
import GridContainer from "mcomponents/Grid/GridContainer.jsx";
import GridItem from "mcomponents/Grid/GridItem.jsx";

import Button from "mcomponents/CustomButtons/Button.jsx";

import Card from "mcomponents/Card/Card.jsx";
import CardBody from "mcomponents/Card/CardBody.jsx";
import CardHeader from "mcomponents/Card/CardHeader.jsx";
import CardFooter from "mcomponents/Card/CardFooter.jsx";
*/
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

//const Login = ({ errorMessage, submitForm }) => {
class Login extends React.Component {

  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

  render(props)
  {
    console.log(this.props)
    const { errorMessage, submitForm } = this.props
    /* OLD */
    const renderErrorMessage = (
     errorMessage &&
       <Alert bsStyle='danger'>
         <i className="fa fa-fw text-danger m-r-1"></i>
         {errorMessage}
       </Alert>
    )

    /* NEW */
    /* 
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>  
            <Card login className={classes[this.state.cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="rose"
              >
                <h4 className={classes.cardTitle}>Log in</h4>
                <div className={classes.socialLine}>
                  {[
                    "fab fa-facebook-square",
                    "fab fa-twitter",
                    "fab fa-google-plus"
                  ].map((prop, key) => {
                    return (
                      <Button
                        color="transparent"
                        justIcon
                        key={key}
                        className={classes.customButtonClass}
                      >
                        <i className={prop} />
                      </Button>
                    );
                  })}
                </div>
              </CardHeader>
              <CardBody>
                <LoginForm
                  submitForm={submitForm}
                  errorMessage={errorMessage}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button color="rose" simple size="lg" block>
                  Let's Go
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
    */

    /* OLD */
    return (
      <Row>
        <Col lg={12}>
            {renderErrorMessage}
          <Row>
            <Col className={classes.centerCol} md={4}>
              <Panel
                footer={(
                  <div>
                    <Link to='/forgot-password'>
                      Forgot Password?
                    </Link>
                    <Link to='/signup' className='pull-right'>
                      Register
                    </Link>
                  </div>
                )}>
                <h2 className={classes.panelHeader}>
                  Login
                </h2>
                <p className='text-center m-b-3'>
                  Enter the email address and password that you chose at signup to access your online privacy portal
                </p>

                <LoginForm
                  submitForm={submitForm}
                  errorMessage={errorMessage}
                />
              </Panel>
            </Col>
          </Row>
        </Col>
      </Row>
    )
    
  }

  
}

Login.propTypes = {
  submitForm: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

export default withStyles(loginPageStyle)(Login)
