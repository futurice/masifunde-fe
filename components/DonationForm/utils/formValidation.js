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
  () => 'Der Wert muss eine Zahl sein',
)

export const checkEmails = createValidator(
  value => isEmail(value),
  () => 'Falsche E-Mail',
)

export const checkMinValues = createValidator(
  (value, minValue) => Number(minValue) <= value,
  (value, minValue) => `Der Betrag darf nicht kleiner als ${minValue} sein`,
)

export const checkMaxValues = createValidator(
  (value, maxValue) => Number(maxValue) >= value,
  (value, maxValue) => `Der Betrag darf nicht mehr als ${maxValue} betragen`,
)
