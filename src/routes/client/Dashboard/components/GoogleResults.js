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
        <Row className='flex-space-between'>
          <Col xs={ 6 }>
            <span>First Page of Google for keyword </span>
          </Col>
          <Col xs={ 6 }>
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
