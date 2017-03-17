import React, { Component } from 'react';
import Loading from 'react-loading';

import { RoutedComponent, connect } from 'routes/routedComponent';
import GoogleResults from './components/GoogleResults';
import { getGoogleResults } from 'modules/googleResults';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';

class GoogleResultsContainer extends RoutedComponent {

  getLayoutOptions() {
    return {
      contentView: CONTENT_VIEW_STATIC,
      sidebarEnabled: true,
      navbarEnabled: true,
      footerEnabled: true,
      headerEnabled: true
    }
  }

  componentWillMount() {
    const number = this.props.pageNumber || '1'
    const account_id = this.props.currentUser.account_id
    const keyword_id = this.props.currentKeyword || this.props.keywords[0].id
    const params = { number, keyword_id, account_id }
    const authToken = this.props.currentUser.access_token
    this.props.getGoogleResults(params, authToken);
    this.setState({isFetching: true})
  }

  componentWillReceiveProps(nextProps) {
    !nextProps.googleResults.isFetching &&
      setTimeout(() => this.setState({isFetching: false}), 3000)
  }

  render() {
    return (
      <div>
      {
        this.state.isFetching
          ?
            <div className='container'>
              <div className="spinner">
                <div className="col-md-12 pricing-left">
                  <Loading type='bubbles' color='black' />
                </div>
              </div>
            </div>
              : <GoogleResults
                results={this.props.googleResults.results}
                keywords={this.props.kewords}
                isFetching={this.state.isFetching}
              />
              }
              </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    googleResults: state.googleResults,
    currentUser: state.currentUser,
    keywords: state.keywords
  }
}

const mapActionCreators = {
  getGoogleResults
}

export default connect(mapStateToProps, mapActionCreators)(GoogleResultsContainer);
