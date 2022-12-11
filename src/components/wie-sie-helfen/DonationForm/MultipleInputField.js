import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import styled from 'styled-components'
import { mdBreakpoint } from '../../../styling/breakpoints'
import ErrorMessage from './ErrorMessage'
import FormLabel from './FormLabel'
import { FORM_LABEL_BOOTSTRAP_CLASSES } from './constants/formValues'
import { formInputClassFactory } from './utils/formInputClassFactory'

const SecondInputContainer = styled.div`
  margin-top: 0.5rem;

  @media (min-width: ${mdBreakpoint}) {
    padding-left: 0;
    margin-top: 0;
  }
`

const MultipleInputField = ({
  fieldName1,
  fieldName2,
  autoComplete1,
  autoComplete2,
  label,
  type,
}) => (
  <div className="form-group row">
    <FormLabel
      className={`${FORM_LABEL_BOOTSTRAP_CLASSES} col-form-label`}
      htmlFor={fieldName1}
    >
      {label}
    </FormLabel>
    <Field name={fieldName1}>
      {({ input, meta }) => (
        <div className="col-md-3">
          <input
            {...input}
            autoComplete={autoComplete1}
            id={fieldName1}
            type={type}
            className={formInputClassFactory(meta)}
            aria-labelledby={fieldName1}
          />
          <ErrorMessage meta={meta} />
        </div>
      )}
    </Field>
    <Field name={fieldName2}>
      {({ input, meta }) => (
        <SecondInputContainer className="col-md-5">
          <input
            {...input}
            autoComplete={autoComplete2}
            id={fieldName2}
            type={type}
            className={formInputClassFactory(meta)}
            aria-labelledby={fieldName1}
          />
          <ErrorMessage meta={meta} />
        </SecondInputContainer>
      )}
    </Field>
  </div>
)

MultipleInputField.propTypes = {
  fieldName1: PropTypes.string.isRequired,
  fieldName2: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  autoComplete1: PropTypes.string,
  autoComplete2: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email']),
}

MultipleInputField.defaultProps = {
  autoComplete1: 'on',
  autoComplete2: 'on',
  type: 'text',
}

export default MultipleInputField
