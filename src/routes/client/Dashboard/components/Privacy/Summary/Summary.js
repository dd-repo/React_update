import React, { Component } from 'react';
import classnames from 'classnames';
import faker from 'faker';
import scrollToComponent from 'react-scroll-to-component';

import classes from '../privacy.scss';
import SummaryResult from 'routes/client/Monitoring/components/SummaryResult';
import PopoverGuide from '../../PopoverGuide';
import {
  SCREEN_SIZE_LG,
  SCREEN_SIZE_MD,
  SCREEN_SIZE_SM,
  SCREEN_SIZE_XS
} from 'layouts/DefaultLayout/modules/layout';
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
  Tooltip,
  Button,
  Overlay,
  Popover
} from 'components';
import { Colors } from 'consts';

const description = "This section shows your privacy removals at a glance. Here you can see how many removals you’ve requested, how many we’re working on, and what we’ve done to protect your privacy. You can also see the number of potential risks."

class Summary extends Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.active) {
      switch(this.props.screenSize) {
        case SCREEN_SIZE_XS:
          scrollToComponent(
            this.nodeRef, {
              offset: -200,
              align: 'middle',
              duration: 1000
            })
          break;
        case SCREEN_SIZE_SM:
          scrollToComponent(
            this.nodeRef, {
              offset: 0,
              align: 'middle',
              duration: 1000
            })
          break;
        default:
          scrollToComponent(this.nodeRef)
      }
    }
  }

  render() {
    const {
      active,
      styles,
      handleContinue,
      isFetching,
      inProgressCount,
      inQueueCount,
      potentialRiskCount,
      screenSize,
      totalRemovalCount
    } = this.props

    return (
      <ListGroup
        ref={ node => this.nodeRef = node }
        className={styles}
      >
        <PopoverGuide
          active={active}
          description={description}
          title='Privacy Report'
          placement={screenSize === SCREEN_SIZE_XS ? 'top' : 'bottom'}
          nodeRef={this.nodeRef}
          handleContinue={handleContinue}
        />
        <ListGroupItem className='text-white' style={{background: Colors.brandDanger}}>
          Your Privacy Removal Report
          <OverlayTrigger
            placement='left'
            overlay={(
              <Tooltip>
                { description }
              </Tooltip>
              )}
            >
              <Button
                className={classes.infoButton}
                bsStyle='link'
              >
                <i className='fa fa-question fa-fw fa-lg text-white'></i>
              </Button>
            </OverlayTrigger>
          </ListGroupItem>
          <ListGroupItem style={{background: 'none'}}>
            <div className='m-b-3'>
              <Row className={ classes.summary }>
                <Col md={ 6 } sm={ 6 } xs={ 6 }>
                  <SummaryResult
                    title='in progress'
                    count={inProgressCount}
                  />
                </Col>
                <Col md={ 6 } sm={ 6 } xs={ 6 }>
                  <SummaryResult
                    title='in queue'
                    count={inQueueCount}
                  />
                </Col>
              </Row>
              <Row className={ classes.summary }>
                <Col md={ 6 } sm={ 6 } xs={ 6 }>
                  <SummaryResult
                    title='potential risks'
                    count={potentialRiskCount}
                  />
                </Col>

                <Col md={ 6 } sm={ 6 } xs={ 6 }>
                  <SummaryResult
                    title='total removals'
                    count={totalRemovalCount}
                    label='Records'
                  />
                </Col>
              </Row>
            </div>
          </ListGroupItem>
        </ListGroup>
    )
  }
}

export default Summary;
