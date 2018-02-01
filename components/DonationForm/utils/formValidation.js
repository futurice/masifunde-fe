import T from 'i18n-react'

export const checkRequiredValues = (keysArray, fields) => {
  const errors = {}
  keysArray.forEach(({ fieldName, errorMessage = T.translate('donation.required') }) => {
    if (!fields[fieldName]) {
      errors[fieldName] = errorMessage
    }
  })
  return errors
}

const isPositiveInteger = (field) => {
  const parsedNumber = Number(field)
  const isInteger = Number.isInteger(parsedNumber)
  return (isInteger && parsedNumber > 0)
}

export const checkPositiveIntValues = (keysArray, fields) => {
  const errors = {}
  keysArray.forEach((key) => {
    if (!isPositiveInteger(fields[key])) {
      errors[key] = T.translate('donation.greaterThanZero')
    }
  })
  return errors
}
