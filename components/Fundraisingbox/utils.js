export const isPositiveInteger = (field) => {
  const parsedNumber = Number(field)
  const isInteger = Number.isInteger(parsedNumber)
  return (isInteger && parsedNumber > 0)
}

export const formInputClassFactory = meta =>
  `form-control ${meta.error && meta.touched ? 'is-invalid' : ''}`

export const formLabelBootstrapClasses = 'col-md-3'
export const formInputBootstrapClasses = 'col-md-8'
