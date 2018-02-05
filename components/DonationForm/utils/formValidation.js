import T from 'i18n-react'
import isEmail from 'validator/lib/isEmail'

export const checkRequiredValues = (keysArray, fields) => {
  const errors = {}
  keysArray.forEach(({ fieldName, errorMessage = T.translate('donation.required') }) => {
    if (!fields[fieldName]) {
      errors[fieldName] = errorMessage
    }
  })
  return errors
}

const createValidator = (isValid, errorMessage) => (keysArray, fields, ...args) => {
  const errors = {}
  keysArray.forEach((key) => {
    const value = fields[key]
    if (value && !isValid(value, ...args)) {
      errors[key] = errorMessage(value, ...args)
    }
  })
  return errors
}

const isInteger = field => Number.isInteger(Number(field))

export const checkIsIntegerValues = createValidator(
  value => isInteger(value),
  () => T.translate('donation.mustBeANumber'),
)

export const checkEmails = createValidator(
  value => isEmail(value),
  () => T.translate('donation.invalidEmail'),
)

export const checkMinValues = createValidator(
  (value, minValue) => Number(minValue) <= value,
  (value, minValue) => T.translate('donation.cantBeLessThan', { value: minValue }),
)

export const checkMaxValues = createValidator(
  (value, maxValue) => Number(maxValue) >= value,
  (value, maxValue) => T.translate('donation.cantBeGreaterThan', { value: maxValue }),
)
