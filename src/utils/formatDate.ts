/* eslint-disable no-confusing-arrow */

export default function formatDate(inputDateString: string) {
  const date = new Date(inputDateString)
  const dayOfMonth = padZero(date.getDate())
  const month = padZero(date.getMonth() + 1)
  const year = date.getFullYear()
  return `${dayOfMonth}.${month}.${year}`
}

function padZero(n: number) {
  return n < 10 ? `0${n}` : n
}
