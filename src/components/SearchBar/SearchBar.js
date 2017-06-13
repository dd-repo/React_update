import React, { PropTypes } from 'react';
import numeral from 'numeral';
import {
    FormGroup,
    FormControl,
    InputGroup,
    Button,
    Divider
} from 'components';

import classes from './searchBar.scss';


const SearchBar = (props) => {
  let searchInput;

  const handleKeyPress = target => {
    if(target.charCode === 13) {
      props.handleSearch(searchInput.value)
    }
  }

  const _onClick = () => {
    props.handleSearch(searchInput.value)
  }

  return (
    <div>
        <h3 className={classes.searchHeader}>
            Search Results for <strong>"{ props.query }"</strong>
            <small className='m-l-1'>
              found { !!props.resultCount ? numeral(props.resultCount).format('0,0') : '' } Results
            </small>
        </h3>
        <InputGroup className='m-t-2'>
          <FormControl
            type='text'
            placeholder={props.placeHolder}
            inputRef={(input) => {searchInput = input}}
            onKeyPress={handleKeyPress}
          />
            <InputGroup.Button>
              <Button
                onClick={_onClick}
                bsStyle='primary'
              >
                <i className='fa fa-fw fa-search'></i>
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </div>
  )
}

SearchBar.propTypes = {
  query: PropTypes.string,
  resultCount: PropTypes.number,
  handleSearch: PropTypes.func,
  placeHolder: PropTypes.string
};

SearchBar.defaultProps = {
    query: '',
    resultCount: null,
    placeHolder: 'Enter your search request...'
}

export default SearchBar;
