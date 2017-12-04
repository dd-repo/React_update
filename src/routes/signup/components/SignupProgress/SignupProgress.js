import React from 'react'
import { Nav, NavItem } from 'components'
import trialImg from 'static/freeTrialRed.png'
import bbb from 'static/bbb.png'
import arrow from 'static/arrow_icon.png'
import classes from './signupProgress.scss'
import classNames from 'classnames'

const SignupProgress = props => {
    const signupClass = classNames(classes.firstStep, {
      [classes.complete]: props.currentStep > 1,
      [classes.active]: props.currentStep === 1
    })

    const paymentClass = classNames({
      [classes.complete]: props.currentStep > 2,
      [classes.active]: props.currentStep === 2
    })

    const keywordsClass = classNames(classes.lastStep, {
      [classes.active]: props.currentStep === 3
    })

  return (
    <Nav bsStyle="pills" className={classes.steps} activeKey={1}>
      <NavItem className={signupClass} eventKey={1}>
        <span className={classes.arrows}>
          1 <img style={{height: '35px'}} src={arrow} />
        </span>
        Create Your Account
      </NavItem>
      <NavItem className={paymentClass} disabled={props.currentStep < 2} eventKey={2}>
        <span className={classes.arrows}>
          2 <img style={{height: '35px'}} src={arrow} />
        </span>
        Enter Payment Details
      </NavItem>
      <NavItem className={keywordsClass} disabled={props.currentStep < 3} eventKey={3}>
        <span className={classes.arrows}>
          3 <img style={{height: '35px'}} src={arrow} />
        </span>
        Protect Your Information
      </NavItem>
    </Nav>
  )
}

export default SignupProgress
