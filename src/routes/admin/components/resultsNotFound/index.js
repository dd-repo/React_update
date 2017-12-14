import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'components'

const ResultsNotFound = ({ queryName }) => (
  <Col className='text-center'>
    <h3>Results not found for "{queryName}"</h3>
  </Col>
)

ResultsNotFound.propTypes = {
  queryName: PropTypes.string
}

export default ResultsNotFound
