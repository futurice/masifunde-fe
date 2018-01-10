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
        <div>
          <div className="offset-md-3 col-md-9 col-lg-7 pl-0">
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
            {isInvalid(meta) ? <StyledErrorMessage>{meta.error}</StyledErrorMessage> : ''}
          </div>
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
