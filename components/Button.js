import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function CustomButton(props) {
  const { children, className } = props
  return (
    <a {...props} className={`btn btn-primary ${className}`}>
      {children}
    </a>
  )
}

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
}

export default styled(CustomButton)`
  background-color: black;
  border-color: black;
  color: white !important;
`
