import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import ErrorMessage from './ErrorMessage'
import FormLabel from './FormLabel'
import { FORM_INPUT_BOOTSTRAP_CLASSES, FORM_LABEL_BOOTSTRAP_CLASSES } from './constants/formValues'
import { formInputClassFactory } from './utils/formInputClassFactory'

const InputField = ({
  fieldName,
  label,
  type,
}) => (
  <div className="form-group row">
    <FormLabel className={`${FORM_LABEL_BOOTSTRAP_CLASSES} col-form-label`} htmlFor={fieldName}>
      {label}
    </FormLabel>
    <div className={FORM_INPUT_BOOTSTRAP_CLASSES}>
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

InputField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email']),
}

InputField.defaultProps = {
  type: 'text',
}

export default InputField
