import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import styled from 'styled-components'

import Button from '../../components/Button'
import { isValid } from './utils'

const SubHeader = styled.h3`
  ${props => props.isValid && 'color: #dc3545;'};
`

const LabelButton = Button.withComponent('label').extend`
  margin-right: 10px;
  
  &:last-child {
    margin-right: 0;
  }

  // Hide input (copied from boostrap)
  input {
    position: absolute;
    clip: rect(0,0,0,0);
    pointer-events: none;
  }
`

const DonationIntervalField = ({
  fieldName,
  title,
  intervals,
}) => (
  <Field name={fieldName}>
    {({ input, meta }) => (
      <Fragment>
        <SubHeader isValid={isValid(meta)}>{title} *</SubHeader>
        <div className="row">
          <div className="col offset-lg-3">
            {intervals.map(({ value, name }) => (
              <LabelButton
                className="btn"
                isActive={input.value === value}
                key={value}
                htmlFor={`frequencyInputOption${value}`}
              >
                <input
                  {...input}
                  type="radio"
                  value={value}
                  id={`frequencyInputOption${value}`}
                  autoComplete="off"
                />
                {name}
              </LabelButton>
            ))}
          </div>
        </div>
      </Fragment>
    )}
  </Field>
)

DonationIntervalField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  intervals: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
}

export default DonationIntervalField
