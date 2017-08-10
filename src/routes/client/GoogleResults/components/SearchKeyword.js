import React, { Component } from 'react';

import { Button } from 'components';

class SearchKeyword extends Component {
  constructor(props) {
    super(props)

    this._onClick = this._onClick.bind(this)
  }

  _onClick() {
    const { getResults, keyword } = this.props
    getResults(keyword)
  }

  render() {
    const { keyword } = this.props
    return (
      <li className='list-unstyled'>
        <Button
          bsStyle='link'
          onClick={this._onClick}
        >
          {keyword.value}
        </Button>
      </li>
    )
  }
}

export default SearchKeyword;
