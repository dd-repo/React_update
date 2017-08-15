import React, { PropTypes } from 'react';
import Select from 'react-select';

import { Row } from 'components';
import classes from './googleResults.scss'

const SearchKeywords = props => {
  const {
    keywords,
    paginationTotal,
    getResults
  } = props

  const keywordValue = props => (
    <div className='Select-value'>
      <span className="Select-value-label">
        <i className="fa fa-search fa-lg m-r-2"></i>
        { props.children }
      </span>
    </div>
  )

  return (
    <div className={classes.mainWrapper}>
      <h3 className={classes.searchHeader}>
        Google Results for <strong>"{ keywords.currentKeyword.label }"</strong>
        {
          paginationTotal &&
            <small className='m-l-1'>
              { paginationTotal } Results
            </small>
            }
          </h3>
          <Select
            options={keywords.all}
            value={keywords.currentKeyword}
            name='form-keywords'
            autosize={true}
            searchable={false}
            clearable={false}
            valueComponent={keywordValue}
            onChange={getResults}
          />
        </div>
  )
}

SearchKeywords.propTypes = {
  keywords: PropTypes.object.isRequired,
  getResults: PropTypes.func.isRequired,
  paginationTotal: PropTypes.number
}

export default SearchKeywords;
