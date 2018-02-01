import isEmail from 'validator/lib/isEmail'

export const checkRequiredValues = (keysArray, fields) => {
  const errors = {}
  keysArray.forEach(({ fieldName, errorMessage = 'Pflichtfeld' }) => {
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
      errors[key] = 'Bitte wählen Sie eine Betrag größer als Null.'
    }
  })
  return errors
}

export const checkEmails = (keysArray, fields) => {
  const errors = {}
  keysArray.forEach((key) => {
    if (fields[key] && !isEmail(fields[key])) {
      errors[key] = 'Falsche E-Mail'
    }
  })

  return errors
}
