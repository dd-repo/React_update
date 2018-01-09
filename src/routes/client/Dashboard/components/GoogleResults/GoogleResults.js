import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Loading from 'react-loading'
import scrollToComponent from 'react-scroll-to-component'

import GoogleResult from 'routes/client/GoogleResults/components/GoogleResult'
import SearchKeywords from 'routes/client/GoogleResults/components/SearchKeywords'
import {ScrollBarContainer} from 'components'
import {
  SCREEN_SIZE_LG,
  SCREEN_SIZE_SM,
  SCREEN_SIZE_XS
} from 'layouts/DefaultLayout/modules/layout'
import classes from '../dashboard.scss'

class GoogleResultsWidget extends Component {

  componentWillReceiveProps (nextProps) {
    if (nextProps.configs.active) {
      switch (this.props.screenSize) {
      case SCREEN_SIZE_XS:
        scrollToComponent(this.nodeRef, {offset: -200, align: 'bottom', duration: 1000})
        break
      case SCREEN_SIZE_SM:
        scrollToComponent(this.nodeRef, {offset: 0, align: 'bottom', duration: 1000})
        break
      }
    }
  }

  renderSpinner = () => {
    if (this.props.results.isFetching) {
      return (
        <div className={classes.mainDiv}>
          <div className={classes.mainSpinnerDiv}>
            <Loading type='spinningBubbles' color='white' />
          </div>
        </div>
      )
    }
  }

  render () {
    const {
      tutorialIsActive,
      configs,
      results,
      keywords,
      handleSearch,
      screenSize
    } = this.props

    const highlightStyles = classnames({[`${classes.highlight}`]: tutorialIsActive && configs.active})
    const googleResultStyles = classnames('m-t-1 p-l-1',
      { [`${classes.hide}`]: this.props.results.isFetching }
    )

    return (
      <div
        className={highlightStyles}
        ref={node => { this.nodeRef = node }}
      >
        {this.renderSpinner()}
        <div>
          <SearchKeywords
            keywords={keywords}
            getResults={handleSearch}
          />
          <div className='m-b-3'></div>
          <ScrollBarContainer
            noXScrollBar
            style={{
              maxHeight: screenSize === SCREEN_SIZE_LG ? '500px' : '300px'
            }}
          >
            <div className={googleResultStyles}>
              {results.all.map((result, i) => (
                <GoogleResult
                  result={result}
                  key={i}
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

GoogleResultsWidget.propTypes = {
  tutorialIsActive: PropTypes.bool,
  configs: PropTypes.object,
  results: PropTypes.object,
  keywords: PropTypes.object,
  handleSearch: PropTypes.func,
  screenSize: PropTypes.string
}

export default GoogleResultsWidget
