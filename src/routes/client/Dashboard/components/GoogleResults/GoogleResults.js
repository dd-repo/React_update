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

const description = "This is a snapshot of the Google results for your chosen search phrases. This is the information that someone would see if they entered your search phrase into Google and clicked search. We include this information so that you’re aware of what the internet shows when searching for your information."

class GoogleResults extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

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
      results,
      active,
      styles,
      handleContinue,
      keywords,
      handleSearch,
      handlePrivacyRemovalButtonClick,
      screenSize
    } = this.props

    return  (
      <div
        className={styles}
        ref={ node => this.nodeRef = node }
      >
        <DashboardPopover
          active={active}
          description={description}
          title='Google Results'
          placement='top'
          nodeRef={this.nodeRef}
          handleClick={handleContinue}
        />
        <div>
          <SearchKeywords
            keywords={keywords}
            getResults={handleSearch}
          />
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
