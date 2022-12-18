import { FC } from 'react'
import { Field } from 'react-final-form'
import ErrorMessage from './ErrorMessage'
import FormLabel from './FormLabel'
import {
  FORM_INPUT_BOOTSTRAP_CLASSES,
  FORM_LABEL_BOOTSTRAP_CLASSES,
} from './constants/formValues'
import { formInputClassFactory } from './utils/formInputClassFactory'

export type Option = {
  value: string
  text: string
}

export type Props = {
  fieldName: string
  label: string
  options: Option[]
  autoComplete?: string
  inputClassName?: string
}

const SelectField: FC<Props> = ({
  fieldName,
  label,
  options,
  autoComplete = 'on',
  inputClassName = FORM_INPUT_BOOTSTRAP_CLASSES,
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
              <option value={undefined} disabled hidden />
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

export default SelectField
