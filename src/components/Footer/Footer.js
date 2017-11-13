import React, { PropTypes } from 'react'
import {
    Grid
} from 'react-bootstrap'

const Footer = props => {
  const { fluid, children, ...otherProps } = props

  return (
    <footer {...otherProps}>
      <Grid fluid={fluid}>
        {children}
      </Grid>
    </footer>
  )
}

Footer.propTypes = {
  fluid: PropTypes.bool
}

export default Footer
