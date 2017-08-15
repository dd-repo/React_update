import React from 'react';
import Select from 'react-select';
import GoogleResult from 'routes/client/GoogleResults/components/GoogleResult';

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
        <Row>
          <Col xs={ 3 }>
              <h4>First Page of Google for keyword </h4>
          </Col>
          <Col xs={ 3 }>
              <Select
                options={keywords.all}
                value={keywords.currentKeyword}
                name='form-keywords'
                autosize={true}
                searchable={false}
                clearable={false}
                onChange={ val => handleSearch({ value: val }) }
              />
          </Col>
        </Row>
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
