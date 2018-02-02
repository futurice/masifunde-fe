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

const isInteger = field => Number.isInteger(Number(field))

export const checkPositiveIntValues = (keysArray, fields) => {
  const errors = {}
  keysArray.forEach((key) => {
    if (!isInteger(fields[key])) {
      errors[key] = 'Der Wert muss eine Zahl sein'
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

export const checkMinValues = (keysArray, fields, value) => {
  const errors = {}
  keysArray.forEach((key) => {
    if (fields[key] < Number(value)) {
      errors[key] = `Der Betrag darf nicht kleiner als ${value} sein`
    }
  })

  return errors
}

export const checkMaxValues = (keysArray, fields, value) => {
  const errors = {}
  keysArray.forEach((key) => {
    if (fields[key] && fields[key] > Number(value)) {
      errors[key] = `Der Betrag darf nicht mehr als ${value} betragen`
    }
  })

  return errors
}
