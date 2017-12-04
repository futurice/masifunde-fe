import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

function CustomButton({ children, className, href }) {
  return (
    <a href={href} className={`btn ${className}`}>
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

const StyledButton = styled(CustomButton)`
  font-family: 'Lato', 'sans-serif';
  background-color: transparent;
  outline: none;
  box-shadow: none !important;
  border-radius: 47px;
  padding: 0.5rem 1.5rem;
  border-width: 3px;
  font-weight: bold;
  font-size: 1.125rem;
  
  ${props => props.type === 'primary' && css`
    font-weight: 900;
    color: ${props.theme.darkGreen};
    border-color: ${props.theme.green};
    padding-top: 0.35rem;
    padding-bottom: 0.35rem;
    
    &:hover {
      color: white;
      background-color: ${props.theme.green};
    }
  `}
  
  ${props => props.type === 'secondary' && css`
    color: ${props.theme.orange};
    border-color: ${props.theme.orangeRed};
    
    &:hover {
      color: white;
      background-color: ${props.theme.orangeRed};
    }
  `}
  
  ${props => props.type === 'banner' && css`
    color: white;
    border-color: white;
    
    &:hover {
      color: ${props.theme.orange};
      background-color: white;
    }
  `}
`

StyledButton.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary', 'banner']),
}

StyledButton.defaultProps = {
  type: 'secondary',
}

export default StyledButton
