import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import ErrorMessage from './ErrorMessage'
import FormLabel from './DonationFormLabel'
import { formInputBootstrapClasses, formLabelBootstrapClasses } from './constants'
import { formInputClassFactory } from './utils/formInputClassFactory'

const DonationInputField = ({
  fieldName,
  label,
  type,
}) => (
  <div className="form-group row">
    <FormLabel className={`${formLabelBootstrapClasses} col-form-label`} htmlFor={fieldName}>
      {label}
    </FormLabel>
    <div className={formInputBootstrapClasses}>
      <Field name={fieldName}>
        {({ input, meta }) => (
          <div>
            <input
              {...input}
              id={fieldName}
              type={type}
              className={formInputClassFactory(meta)}
              aria-labelledby={fieldName}
            />
            <ErrorMessage meta={meta} />
          </div>
        )}
      </Field>
    </div>
  </div>
)

DonationInputField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email']),
}

DonationInputField.defaultProps = {
  type: 'text',
}

export default DonationInputField
