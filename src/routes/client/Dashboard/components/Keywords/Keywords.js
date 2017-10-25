import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import scrollToComponent from 'react-scroll-to-component';
import classnames from 'classnames'

import {
  SCREEN_SIZE_LG,
  SCREEN_SIZE_MD,
  SCREEN_SIZE_SM,
  SCREEN_SIZE_XS
} from 'layouts/DefaultLayout/modules/layout';
import {
  Row,
  Panel,
  Col,
  Button,
  ButtonGroup,
  OverlayTrigger,
  ListGroup,
  ListGroupItem,
  Overlay,
  Popover,
  Tooltip,
} from 'components';

import { Colors } from 'consts';
import classes from '../dashboard.scss';

let buttonRef = {};

const description = "Each of these phrases represents a Google search. You can edit these phrases as you see fit. We recommend that you use one phrase containing your full name, and one containing your address for the most complete privacy coverage. Other popular options include your maiden name or your name and age."

class KeywordSummary extends Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.active) {
      switch(this.props.screenSize) {
        case SCREEN_SIZE_XS:
          scrollToComponent(this.nodeRef, {offset: 0, align: 'bottom', duration: 1000})
          break;
        case SCREEN_SIZE_SM:
          scrollToComponent(this.nodeRef, {offset: 0, align: 'bottom', duration: 1000})
          break;
        default:
          scrollToComponent(this.nodeRef)
      }
    }
  }

  render() {
    const {
      tutorialIsActive,
      configs,
      keywords,
      showModal,
      handleKeywordEdit
    } = this.props

    const highlightStyles = classnames({[`${classes.highlight}`]: tutorialIsActive && configs.active})

    return (
      <ListGroup
        ref={ node => this.nodeRef = node }
        className={highlightStyles}
      >
        <ListGroupItem className='text-white' style={{background: Colors.brandPrimary}}>
          Your Search Phrases
          <OverlayTrigger
            placement='left'
            overlay={(
              <Tooltip id='searchPhraseDescription'>
                { configs.description || '' }
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
          {
            keywords.map( (keyword, i) => (
              <ListGroupItem key={i} className={classes.keywords} style={{background: 'none'}}>
                <Row>
                  { keyword.label }
                  <ButtonGroup
                    className='pull-right'
                  >
                    { /*
                         <OverlayTrigger
                         placement='top'
                         overlay={(
                         <Tooltip>
                         Search
                         </Tooltip>
                         )}
                         >
                         <Button
                         bsSize='small'
                         >
                         <i className='fa fa-search fa-fw fa-lg text-gray-lighter'></i>
                         </Button>
                         </OverlayTrigger>
                         */ }
                         <OverlayTrigger
                           placement='top'
                           overlay={(
                             <Tooltip id='keyword-edit'>
                               Edit
                             </Tooltip>
                             )}
                           >
                             <Button
                               ref={ button => buttonRef[`button-${i}`] = button }
                               onClick={() => { showModal('KEYWORD', keyword, handleKeywordEdit) }}
                               className={classes.standOut}
                               bsSize='small'
                             >
                               <i className='fa fa-pencil fa-fw fa-lg text-gray-lighter'></i>
                             </Button>
                           </OverlayTrigger>
                         </ButtonGroup>
                       </Row>
                       </ListGroupItem>
                  ))
          }
        </ListGroup>
    )
  }
}

KeywordSummary.defaultProps = {
  keywords: []
}

KeywordSummary.propTypes = {
  tutorialIsActive: PropTypes.bool,
  configs: PropTypes.object,
  keywords: PropTypes.array,
  showModal: PropTypes.func,
  handleKeywordEdit: PropTypes.func
}
export default KeywordSummary;
