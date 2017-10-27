import React, { Component } from 'react';
import Select from 'react-select';
import classnames from 'classnames';
import scrollToComponent from 'react-scroll-to-component';

import GoogleResult from 'routes/client/GoogleResults/components/GoogleResult';
import SearchKeywords from 'routes/client/GoogleResults/components/SearchKeywords';
import DashboardPopover from '../DashboardPopover';

import {
  SCREEN_SIZE_LG,
  SCREEN_SIZE_MD,
  SCREEN_SIZE_SM,
  SCREEN_SIZE_XS
} from 'layouts/DefaultLayout/modules/layout';
import {
  Panel,
  Row,
  Col,
  ScrollBarContainer
} from 'components';
import classes from '../dashboard.scss';

class GoogleResults extends Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.active) {
      switch(this.props.screenSize) {
        case SCREEN_SIZE_XS:
          scrollToComponent(this.nodeRef, {offset: -200, align: 'bottom', duration: 1000})
          break;
        case SCREEN_SIZE_SM:
          scrollToComponent(this.nodeRef, {offset: 0, align: 'bottom', duration: 1000})
          break;
      }
    }
  }

  render() {
    const {
      tutorialIsActive,
      configs,
      results,
      keywords,
      handleSearch,
      handlePrivacyRemovalButtonClick,
      screenSize
    } = this.props

    const highlightStyles = classnames({[`${classes.highlight}`]: tutorialIsActive && configs.active})

    return  (
      <div
        className={highlightStyles}
        ref={ node => this.nodeRef = node }
      >
        <div>
          <SearchKeywords
            keywords={keywords}
            getResults={handleSearch}
          />
          <div className='m-b-3'></div>
          <ScrollBarContainer
            style={{ maxHeight: screenSize === SCREEN_SIZE_LG ? '500px' : '300px' }}
          >
            <div className='m-t-1 p-l-1'>
              { results.map((result, i) => (
                <GoogleResult
                  result={result}
                  key={i}
                  handleRemoval={handlePrivacyRemovalButtonClick}
                />
                ))
              }
            </div>
          </ScrollBarContainer>
        </div>
      </div>
    )
  }
}

export default GoogleResults;
