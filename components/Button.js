import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function CustomButton({ children, className, href }) {
  return (
    <a href={href} className={`btn btn-primary ${className}`}>
      {children}
    </a>
  )
}

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  href: PropTypes.string,
}

CustomButton.defaultProps = {
  href: undefined,
}

export default styled(CustomButton)`
  background-color: black;
  border-color: black;
  color: white !important;
`
