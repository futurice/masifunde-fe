import formatDate from './formatDate'

test('formats ISO 8601 date in "DD.MM.YYYY" format', () => {
  const result = formatDate('2022-11-30')
  expect(result).toBe('30.11.2022')
})

test('pads day and month to two digits', () => {
  const result = formatDate('2022-02-08')
  expect(result).toBe('08.02.2022')
})

test('ignores the time portion of an ISO 8601 timestamp', () => {
  const result = formatDate('2022-12-09T12:34:56.789Z')
  expect(result).toBe('09.12.2022')
})
