import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import SearchKeyword from './SearchKeyword';
import { Divider } from 'components';

export default class SearchKeywords extends Component {
  render() {
    const { keywords, getResults } = this.props
    return (
      <div>
        <Divider className='m-t-2'>
          Keywords
        </Divider>
        <div>
          <ul>
            {
              keywords.all.map( (keyword, key) => (
                <SearchKeyword
                  key={key}
                  keyword={keyword}
                  getResults={getResults}
                />
                ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

SearchKeywords.propTypes = {
  keywords: PropTypes.object.isRequired,
  getResults: PropTypes.func.isRequired
}
