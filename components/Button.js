import { omit } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'

import { defaultFont, rem } from '../styling/typography'
import { smallSpacing } from '../styling/sizes'

const ButtonContainer = styled.div`
  display: flex;
  justify-content: ${({ center }) => (center ? 'center' : 'flex-start')};
`

const Button = ({ center, children, className, href, ...rest }) => {
  // Filter out props meant only for styling
  const forwardedProps = omit(rest, ['type', 'isActive', 'rounded'])

  return (
    <ButtonContainer center={center}>
      {href ? (
        <a {...forwardedProps} href={href} className={`btn ${className}`}>
          {children}
        </a>
      ) : (
        <button {...forwardedProps} className={`btn ${className}`}>
          {children}
        </button>
      )}
    </ButtonContainer>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  center: PropTypes.bool,
  href: PropTypes.string,
  rounded: PropTypes.bool,
}

Button.defaultProps = {
  center: false,
  className: '',
  href: undefined,
  rounded: false,
}

const StyledButton = styled(Button)`
  font-size: ${rem('18px')};
  font-family: ${defaultFont};
  font-weight: bold;
  background-color: transparent;
  outline: none;
  padding: 0.5rem ${smallSpacing};
  border-radius: 47px;
  border-width: 3px;
  cursor: pointer;
  white-space: normal;

  ${({ rounded }) =>
    rounded === 'true' &&
    css`
      width: 50px;
      height: 50px;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
    `}

  &:hover {
    color: white;
  }

  ${(props) =>
    props.type === 'primary' &&
    css`
      font-weight: 900;
      color: ${props.theme.darkGreen};
      border-color: ${props.theme.green};
      padding-top: 0.35rem;
      padding-bottom: 0.35rem;

      &:hover {
        background-color: ${props.theme.green};
      }

      &:focus {
        box-shadow: 0px 0px 0px 3px ${rgba(props.theme.green, 0.5)};
      }

      ${props.isActive &&
      `
      background-color: ${props.theme.green};
      color: white;
    `}
    `}

  ${(props) =>
    props.type === 'secondary' &&
    css`
      color: ${props.theme.orangeRed};
      border-color: ${props.theme.orangeRed};

      &:hover {
        background-color: ${props.theme.orangeRed};
      }

      &:focus {
        box-shadow: 0px 0px 0px 3px ${rgba(props.theme.orangeRed, 0.5)};
      }

      ${props.isActive &&
      `
      background-color: ${props.theme.orangeRed};
      color: white;
    `}
    `}

  ${(props) =>
    props.type === 'banner' &&
    css`
      color: white;
      border-color: white;

      &:hover {
        color: ${props.theme.orange};
        background-color: white;
      }

      &:focus {
        box-shadow: 0px 0px 0px 3px ${rgba('white', 0.5)};
      }
    `}
`

StyledButton.propTypes = {
  ...Button.propTypes,
  type: PropTypes.oneOf(['primary', 'secondary', 'banner']),
  isActive: PropTypes.bool,
  rounded: PropTypes.bool,
  theme: PropTypes.object,
}

StyledButton.defaultProps = {
  ...Button.defaultProps,
  type: 'secondary',
}

export default StyledButton
