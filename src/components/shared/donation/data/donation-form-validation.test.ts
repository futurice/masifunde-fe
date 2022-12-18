import { validateDonationForm } from './donation-form-validation'
import { DonationFormValues } from './donation-form-values'

describe('validateForm()', () => {
  const validValues: DonationFormValues = {
    amount: '30',
    interval: '1', // monthly
    projectId: '3522', // South Africa
    wantsReceipt: 'no_receipt',
    address: 'Musterstr. 1',
    city: 'Musterstadt',
    companyName: 'ACME GmbH',
    country: 'DE',
    email: 'maxima.muster@example.com',
    firstName: 'Maxima',
    lastName: 'Muster',
    postCode: '12345',
    salutation: 'Mrs.',
    title: 'Dr.',
  }

  test('returns no error for valid data', () => {
    const errors = validateDonationForm(validValues)
    expect(errors).toEqual({})
  })

  test.each([
    { field: 'amount', errorKey: 'donation.required' },
    { field: 'interval', errorKey: 'donation.requiredInterval' },
    { field: 'country', errorKey: 'donation.required' },
    { field: 'email', errorKey: 'donation.required' },
    { field: 'firstName', errorKey: 'donation.required' },
    { field: 'lastName', errorKey: 'donation.required' },
    { field: 'salutation', errorKey: 'donation.required' },
    { field: 'wantsReceipt', errorKey: 'donation.required' },
  ])('returns error if "$field" is missing', ({ field, errorKey }) => {
    const values = { ...validValues, [field]: undefined }
    const errors = validateDonationForm(values)
    expect(errors).toEqual({
      [field]: { key: errorKey },
    })
  })

  test('returns error if "amount" is not an integer', () => {
    const values = { ...validValues, amount: '123.45' }
    const errors = validateDonationForm(values)
    expect(errors).toEqual({
      amount: { key: 'donation.mustBeANumber' },
    })
  })

  test('returns error if "amount" is zero', () => {
    const values = { ...validValues, amount: '0' }
    const errors = validateDonationForm(values)
    expect(errors).toEqual({
      amount: {
        key: 'donation.cantBeLessThan',
        details: { min: 1 },
      },
    })
  })

  test('returns error if "amount" is negative', () => {
    const values = { ...validValues, amount: '-1' }
    const errors = validateDonationForm(values)
    expect(errors).toEqual({
      amount: {
        key: 'donation.cantBeLessThan',
        details: { min: 1 },
      },
    })
  })

  test('returns error if "amount" is above 10000 euros', () => {
    const values = { ...validValues, amount: '10001' }
    const errors = validateDonationForm(values)
    expect(errors).toEqual({
      amount: {
        key: 'donation.cantBeGreaterThan',
        details: { max: 10_000 },
      },
    })
  })

  test('returns error if "email" is not an email address', () => {
    const values = { ...validValues, email: 'not an e-mail' }
    const errors = validateDonationForm(values)
    expect(errors).toEqual({
      email: { key: 'donation.invalidEmail' },
    })
  })

  test.each([
    'projectId',
    'address',
    'city',
    'postCode',
    'title',
    'companyName',
  ])('allows "$1" to be missing by default', (field) => {
    const values = { ...validValues, [field]: undefined }
    const errors = validateDonationForm(values)
    expect(errors).toEqual({})
  })

  describe('if project must be selected', () => {
    test('returns error if "projectId" is missing', () => {
      const values = { ...validValues, projectId: undefined }
      const errors = validateDonationForm(values, { projectRequired: true })
      expect(errors).toEqual({ projectId: { key: 'donation.requiredProject' } })
    })
  })

  describe('if the donor wants a receipt now', () => {
    const valuesWithReceiptRequested: DonationFormValues = {
      ...validValues,
      wantsReceipt: 'receipt_now',
    }

    test.each(['address', 'city', 'postCode'])(
      'returns error if "%s" is missing',
      (field) => {
        const values = { ...valuesWithReceiptRequested, [field]: '' }
        const errors = validateDonationForm(values)
        expect(errors).toEqual({
          [field]: { key: 'donation.required' },
        })
      }
    )
  })

  describe('if donor wants a receipt at the end of the year', () => {
    const valuesWithReceiptRequested: DonationFormValues = {
      ...validValues,
      wantsReceipt: 'receipt_end_of_year',
    }

    test.each(['address', 'city', 'postCode'])(
      'returns error if "%s" is missing',
      (field) => {
        const values = { ...valuesWithReceiptRequested, [field]: '' }
        const errors = validateDonationForm(values)
        expect(errors).toEqual({
          [field]: { key: 'donation.required' },
        })
      }
    )
  })
})
