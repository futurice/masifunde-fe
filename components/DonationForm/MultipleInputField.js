import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Field } from 'react-final-form'

import ErrorMessage from './ErrorMessage'
import FormLabel from './FormLabel'
import { FORM_LABEL_BOOTSTRAP_CLASSES } from './constants/formValues'
import { mdBreakpoint } from '../../styling/breakpoints'
import { formInputClassFactory } from './utils/formInputClassFactory'

const SecondInputContainer = styled.div`
  margin-top: 0.5rem;
  
  @media (min-width: ${mdBreakpoint}) {
    padding-left: 0;
    margin-top: 0;
  }
`

const DonationMultipleInputField = ({
  fieldName1,
  fieldName2,
  label,
  type,
}) => (
  <div className="form-group row">
    <FormLabel className={`${FORM_LABEL_BOOTSTRAP_CLASSES} col-form-label`} htmlFor={fieldName1}>
      {label}
    </FormLabel>
    <Field name={fieldName1}>
      {({ input, meta }) => (
        <div className="col-md-3">
          <input
            {...input}
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

DonationMultipleInputField.propTypes = {
  fieldName1: PropTypes.string.isRequired,
  fieldName2: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email']),
}

DonationMultipleInputField.defaultProps = {
  type: 'text',
}

export default DonationMultipleInputField
