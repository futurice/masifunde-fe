import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import { isInvalid } from './utils'
import LabelButton from './LabelButton'
import ErrorMessage from './ErrorMessage'
import SubHeader from './SubHeader'
import PageSection from '../PageSection'

const StyledErrorMessage = ErrorMessage.extend`
  margin-top: -0.4rem;
`

const DonationIntervalField = ({
  fieldName,
  title,
  intervals,
}) => (
  <Field name={fieldName}>
    {({ input, meta }) => (
      <PageSection>
        <SubHeader>{title}</SubHeader>
        <div className="row">
          {intervals.map(({ value, name }) => (
            <div className="col">
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
            </div>
          ))}
          {isInvalid(meta) ? <StyledErrorMessage>{meta.error}</StyledErrorMessage> : ''}
        </div>
      </PageSection>
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
