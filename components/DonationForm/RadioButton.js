import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

import Button from '../../components/Button'
import { rem } from '../../styling/typography'
import { fundraisingFormSpacing } from '../../utils/constants'

const Label = Button.withComponent('label').extend`
  margin-bottom: ${fundraisingFormSpacing};
  font-size: ${rem('18px')};
  padding: 0.3rem 0 0.3rem 0;
  width: 100%;
  color: ${({ theme }) => theme.black};
  border-radius: 8px;
  border: solid 2px rgba(179, 170, 161, 0.6);


  &:hover, input:focus + & {
    border: solid 2px ${({ theme }) => theme.orange};
    color: ${({ theme }) => theme.black};
    background-color: transparent;
  }

  ${(props) =>
    props.isActive &&
    css`
      color: white;
      border: solid 2px ${({ theme }) => theme.orange};
      background-color: ${({ theme }) => theme.orange};

      &:hover,
      input:focus + & {
        background-color: ${({ theme }) => theme.orange};
        color: white;
      }

      input:focus + & {
        border-color: ${({ theme }) => theme.orangeRed};
      }
    `}
`

const Input = styled.input.attrs({ type: 'radio', autoComplete: 'off' })`
  /* Hide input (copied from boostrap) */
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
`

const RadioButton = ({
  id,
  name,
  label,
  value,
  isActive,
  className,
  ...inputProps
}) => (
  <div className={className}>
    <Input
      {...inputProps}
      id={id}
      name={name}
      value={value}
      checked={isActive}
    />
    <Label {...inputProps} className="btn" htmlFor={id} isActive={isActive}>
      {label}
    </Label>
  </div>
)

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isActive: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

RadioButton.defaultProps = {
  className: undefined,
}

export default RadioButton
