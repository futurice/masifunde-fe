/* eslint-disable function-paren-newline */
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import ErrorMessage from './ErrorMessage'
import FormLabel from './FormLabel'
import {
  FORM_INPUT_BOOTSTRAP_CLASSES,
  FORM_LABEL_BOOTSTRAP_CLASSES,
} from './constants/formValues'
import { formInputClassFactory } from './utils/formInputClassFactory'

const SelectField = ({
  fieldName,
  inputClassName,
  label,
  options,
  autoComplete,
}) => (
  <div className="form-group row">
    <FormLabel
      className={`${FORM_LABEL_BOOTSTRAP_CLASSES} col-form-label`}
      htmlFor={fieldName}
    >
      {label}
    </FormLabel>
    <div className={inputClassName}>
      <Field name={fieldName}>
        {({ input, meta }) => (
          <div className="w-100">
            <select
              {...input}
              autoComplete={autoComplete}
              id={fieldName}
              className={formInputClassFactory(meta)}
              aria-labelledby={fieldName}
            >
              <option value={null} disabled hidden />
              {options.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
            <ErrorMessage meta={meta} />
          </div>
        )}
      </Field>
    </div>
  </div>
)

SelectField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  autoComplete: PropTypes.string,
  inputClassName: PropTypes.string,
}

SelectField.defaultProps = {
  autoComplete: 'on',
  inputClassName: FORM_INPUT_BOOTSTRAP_CLASSES,
}

export default SelectField
