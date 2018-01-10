import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import { isInvalid } from './utils'
import LabelButton from './LabelButton'
import ErrorMessage from './ErrorMessage'
import SubHeader from './SubHeader'
import PageSection from '../../components/PageSection'
import { mdBreakpoint, smBreakpoint } from '../../styling/breakpoints'
import { fundraisingFormSpacing } from '../../utils/constants'

const StyledErrorMessage = ErrorMessage.extend`
  margin-top: -0.4rem;
`

const IntervalLabelButton = LabelButton.extend`
  margin-right: ${fundraisingFormSpacing};
  padding-left: 0;
  padding-right: 0;
  
  @media (min-width: ${smBreakpoint}) {
    width: calc(50% - ${fundraisingFormSpacing});
  }
  
  @media (min-width: ${mdBreakpoint}) {
    width: calc(25% - ${fundraisingFormSpacing});
  }
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
            <IntervalLabelButton
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
            </IntervalLabelButton>
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
