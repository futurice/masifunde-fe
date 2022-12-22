import { rgba } from 'polished'
import { FC, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { smallSpacing } from '../../styling/sizes'
import { defaultFont, rem } from '../../styling/typography'

// Props
// =====

export type Props = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'banner'
  center?: boolean
  className?: string
  href?: string
  rel?: string
  rounded?: boolean
  isActive?: boolean
}

// Helpers
// =======

const ButtonContainer = styled.div<{ center: boolean }>`
  display: flex;
  justify-content: ${({ center }) => (center ? 'center' : 'flex-start')};
`

const CoreButton: FC<Props> = ({
  children,
  center = false,
  className,
  href,
  rel,
}) => {
  return (
    <ButtonContainer center={center}>
      {href ? (
        <a href={href} rel={rel} className={`btn ${className}`}>
          {children}
        </a>
      ) : (
        <button className={`btn ${className}`}>{children}</button>
      )}
    </ButtonContainer>
  )
}

// Component
// =========

const Button = styled(CoreButton)<Props>`
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
    rounded &&
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
    props.variant === 'primary' &&
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
    (!props.variant || props.variant === 'secondary') &&
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
    props.variant === 'banner' &&
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

export default Button
