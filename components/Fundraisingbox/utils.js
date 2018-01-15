export const isPositiveInteger = (field) => {
  const parsedNumber = Number(field)
  const isInteger = Number.isInteger(parsedNumber)
  return (isInteger && parsedNumber > 0)
}

export const formInputClassFactory = meta =>
  `form-control ${meta.error && meta.touched ? 'is-invalid' : ''}`

export const formLabelBootstrapClasses = 'col-md-3'
export const formInputBootstrapClasses = 'col-md-8'

export const checkRequiredValues = (keysArray, fields) => {
  const errors = {}
  keysArray.forEach(({ fieldName, errorMessage = 'Pflichtfeld' }) => {
    if (!fields[fieldName]) {
      errors[fieldName] = errorMessage
    }
  })
  return errors
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
