/* eslint-disable no-confusing-arrow */

const formatDate = (inputDateString) => {
  const padZero = number => number < 10 ? `0${number}` : number
  const dateObj = new Date(inputDateString)

  const date = dateObj.getDate()
  const dateString = padZero(date)

  const month = dateObj.getMonth() + 1
  const monthString = padZero(month)

  const year = dateObj.getFullYear()

  return `${dateString}.${monthString}.${year}`
}

export default formatDate
