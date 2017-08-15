import React from 'react';
import Select from 'react-select';
import GoogleResult from 'routes/client/GoogleResults/components/GoogleResult';
import SearchKeywords from 'routes/client/GoogleResults/components/SearchKeywords';

import {
  Panel,
  Row,
  Col,
} from 'components';

const GoogleResults = props => {
  const {
    results,
    keywords,
    handleSearch,
    handlePrivacyRemovalButtonClick
  } = props

  return  (
    <Panel
      maxHeight={326}
      header={(
        <SearchKeywords
          keywords={keywords}
          getResults={handleSearch}
        />
      )}
    >
      <div className='p-l-1'>
        { results.map((result, i) => (
          <GoogleResult
            result={result}
            key={i}
            handleRemoval={handlePrivacyRemovalButtonClick}
          />
        ))
        }
      </div>
    </Panel>

        )
}

export default GoogleResults;
