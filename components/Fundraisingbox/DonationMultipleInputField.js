import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import ErrorMessage from './ErrorMessage'
import FormLabel from './DonationFormLabel'
import { formInputClassFactory, formLabelBootstrapClasses } from './utils'

const DonationMultipleInputField = ({
  fieldName1,
  fieldName2,
  label,
  type,
}) => (
  <div className="form-group row">
    <FormLabel className={`${formLabelBootstrapClasses} col-form-label`} htmlFor={fieldName1}>
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
        <div className="col-md-5 pl-md-0 mt-1 mt-md-0">
          <input
            {...input}
            id={fieldName2}
            type={type}
            className={formInputClassFactory(meta)}
            aria-labelledby={fieldName2}
          />
          <ErrorMessage meta={meta} />
        </div>
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
