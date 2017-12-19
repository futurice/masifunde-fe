/* eslint-disable import/prefer-default-export */
export const isInvalid = meta => meta.error && meta.touched

export const isPositiveInteger = (field) => {
  const parsedNumber = Number(field)
  const isInteger = Number.isInteger(parsedNumber)
  return (isInteger && parsedNumber > 0)
}
