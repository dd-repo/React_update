import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { RoutedComponent, connect } from 'routes/routedComponent';
import { postKeywords } from 'modules/keywords';
import Keywords from './components/Keywords';
import { persistData } from 'localStorage';
import { KEYWORD_SUCCESS, KEYWORD_FAILURE } from 'modules/keywords';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';

class KeywordContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentForm: 'address'
    }

    this.submitForm = this.submitForm.bind(this);
    this.buildParams = this.buildParams.bind(this);
    this.doNext = this.doNext.bind(this);
    this.renderNextForm = this.renderNextForm.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  getLayoutOptions() {
    return {
      contentView: CONTENT_VIEW_STATIC,
      sidebarEnabled: false,
      navbarEnabled: false,
      footerEnabled: false,
      headerEnabled: false
    }
  }

  buildParams(values) {
    return {
      address: values.address,
      zip: values.zipcode,
      city: values.city,
      state: values.state,
      country: 'US',
      dob: values.dob,
      account: this.props.currentUser.account_id
    }
  }

  submitForm(formProps) {
    let authToken = this.props.currentUser.access_token
    let params = this.buildParams(formProps)
    this.props.postKeywords(params, authToken)
    .then(res => { this.doNext(res) })
    .catch(error => { console.log(error) });
  }

  doNext(res) {
    switch(res.type) {
      case KEYWORD_SUCCESS:
        const keywordList = {all: res.keywords, currentKeyword: res.keywords[0]}
        persistData(keywordList, 'keywords')
        this.context.router.push('/dashboard')
        break;
      case KEYWORD_FAILURE:
        this.setState({ errorMessage: res.error });
        break;
      default:
        this.props.router.push('/keywords')
    }
  }

  renderNextForm() {
    this.setState({currentForm: 'dob'})
  }

  render() {
    return (
      <Keywords
        submitForm={this.submitForm}
        renderNextForm={this.renderNextForm}
        currentForm={this.state.currentForm}
        doNext={this.doNext}
        history={this.props.history}
        />
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    keywords: state.keywords.all
  }
}

const mapActionCreators = {
  postKeywords
}

export default connect(mapStateToProps, mapActionCreators)(KeywordContainer);
