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

let searchInput;
const SearchBar = (props) => (
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
            placeholder='Search by last name or email...'
            inputRef={(input) => {searchInput = input}}
          />
            <InputGroup.Button>
              <Button
                onClick={(e) => {props.handleSearch(e, searchInput.value)}}
                bsStyle='primary'
              >
                <i className='fa fa-fw fa-search'></i>
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </div>
);

SearchBar.propTypes = {
  query: PropTypes.string,
  resultCount: PropTypes.number,
  handleSearch: PropTypes.func
};

SearchBar.defaultProps = {
    query: '',
    resultCount: null
}

export default SearchBar;
