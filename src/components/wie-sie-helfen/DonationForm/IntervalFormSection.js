import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import styled from 'styled-components'
import { mdBreakpoint, smBreakpoint } from '../../../styling/breakpoints'
import { fundraisingFormSpacing } from '../../../utils/constants'
import ErrorMessage from './ErrorMessage'
import PageSection from './PageSection'
import RadioButton from './RadioButton'
import SubHeader from './SubHeader'

const StyledErrorMessage = styled(ErrorMessage)`
  margin-top: -0.4rem;
`

const IntervalRadioButton = styled(RadioButton)`
  margin-right: ${fundraisingFormSpacing};
  width: 100%;

  @media (min-width: ${smBreakpoint}) {
    width: calc(50% - ${fundraisingFormSpacing});
  }

  @media (min-width: ${mdBreakpoint}) {
    width: calc(25% - ${fundraisingFormSpacing});
  }
`

const IntervalFormSection = ({ fieldName, title, intervals }) => (
  <Field name={fieldName}>
    {({ input, meta }) => (
      <PageSection>
        <SubHeader className="row">{title}</SubHeader>
        <div className="row">
          {intervals.map(({ value, name }) => (
            <IntervalRadioButton
              {...input}
              key={value}
              id={`frequencyInputOption${value}`}
              label={name}
              value={value}
              isActive={input.value === value}
            />
          ))}
          <StyledErrorMessage meta={meta} />
        </div>
      </PageSection>
    )}
  </Field>
)

IntervalFormSection.propTypes = {
  fieldName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  intervals: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ),
}

IntervalFormSection.defaultProps = {
  intervals: [],
}

export default IntervalFormSection
