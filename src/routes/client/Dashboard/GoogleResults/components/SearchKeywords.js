import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'underscore';

import SearchKeyword from './SearchKeyword';
import { Divider, FormControl } from 'components';
import classes from './googleResults.scss'

export default class SearchKeywords extends Component {
  constructor(props) {
    super(props)

    this.renderDropDownMenu = this.renderDropDownMenu.bind(this);
    this._onChange = this._onChange.bind(this);
}

  _onChange(e) {
    const id = parseInt(e.target.value)
    const keyword = _.findWhere(this.props.keywords.all, {id: id})
    this.props.getResults(keyword)
  }

  renderDropDownMenu() {
    const { currentKeyword, all } = this.props.keywords
    return (
      <FormControl onChange={this._onChange} componentClass='select'>
        { all.map( (keyword, key) => (
          <option  value={keyword.id} key={key}>{keyword.value}</option>
          ))
        }
      </FormControl>
    )
  }

  render() {
    const { keywords, pagination } = this.props
    const renderNumberOfResults = pagination ? `${pagination.total} Results` : ''
    return (
    <div>
        <h3 className={classes.searchHeader}>
            Google Results for <strong>"{ keywords.currentKeyword.value }"</strong>
            <small className='m-l-1'>
              { renderNumberOfResults }
            </small>
        </h3>
            { this.renderDropDownMenu() }
    </div>
    )
  }
}

SearchKeywords.propTypes = {
  keywords: PropTypes.object.isRequired,
  getResults: PropTypes.func.isRequired,
  pagination: PropTypes.object
}
