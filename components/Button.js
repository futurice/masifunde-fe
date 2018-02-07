import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { defaultFont, rem } from '../styling/typography'
import { smallSpacing } from '../styling/sizes'

const ButtonContainer = styled.div`
  display: flex;
  justify-content: ${({ center }) => (center ? 'center' : 'flex-start')};
`

const Button = ({
  center,
  children,
  className,
  ...rest
}) => (
  <ButtonContainer center={center}>
    <a {...rest} className={`btn ${className}`}>
      {children}
    </a>
  </ButtonContainer>
)

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  center: PropTypes.bool,
  href: PropTypes.string,
}

Button.defaultProps = {
  center: false,
  className: '',
  href: undefined,
}

const StyledButton = styled(Button)`
  font-size: ${rem('18px')};
  font-family: ${defaultFont};
  font-weight: bold;
  background-color: transparent;
  outline: none;
  box-shadow: none !important;
  padding: 0.5rem ${smallSpacing};
  border-radius: 47px;
  border-width: 3px;
  cursor: pointer;
  white-space: normal;

  &:hover, &:focus {
    color: white;
  }

  ${props => props.type === 'primary' && css`
    font-weight: 900;
    color: ${props.theme.darkGreen};
    border-color: ${props.theme.green};
    padding-top: 0.35rem;
    padding-bottom: 0.35rem;

    &:hover, &:focus {
      background-color: ${props.theme.green};
    }

    ${props.isActive && `
      background-color: ${props.theme.green};
      color: white;
    `}
  `}

  ${props => props.type === 'secondary' && css`
    color: ${props.theme.orangeRed};
    border-color: ${props.theme.orangeRed};

    &:hover, &:focus {
      background-color: ${props.theme.orangeRed};
    }

    ${props.isActive && `
      background-color: ${props.theme.orangeRed};
      color: white;
    `}
  `}

  ${props => props.type === 'banner' && css`
    color: white;
    border-color: white;

    &:hover, &:focus {
      color: ${props.theme.orange};
      background-color: white;
    }
  `}
`

StyledButton.propTypes = {
  ...Button.propTypes,
  type: PropTypes.oneOf(['primary', 'secondary', 'banner']),
}

StyledButton.defaultProps = {
  ...Button.defaultProps,
  type: 'secondary',
}

export default StyledButton
