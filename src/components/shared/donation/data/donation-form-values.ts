import { CountryCode } from '../../../../i18n/countries'

/**
 * Possible options for what the donation should be used for.
 * Only for the general donation form (not for the campaign ones).
 */
export type FundraisingProjectId =
  | '3520' // Learn 4 Life
  | '3522' // General work in South Africa
  | '3531' // General work in Germany

/**
 * Available options for (not) receiving a donation receipt.
 */
export type ReceiptPreference =
  | 'receipt_now'
  | 'receipt_end_of_year'
  | 'no_receipt'

/**
 * The shape of a donation form's data.
 * Does not include the payment details, which are entered into the
 * Fundraisingbox iframe and are not visible to this website for
 * security reasons.
 */
export type DonationFormValues = {
  // Donation details
  amount?: string // = `value` of a `donationAmount` content entry
  interval?: string // = `value` of a `donationInteval` content entry
  wantsReceipt: ReceiptPreference
  projectId?: FundraisingProjectId
  // Personal details
  country: CountryCode
  email: string
  firstName: string
  lastName: string
  salutation?: 'Mrs.' | 'Mr.'
  address?: string
  city?: string
  postCode?: string
  title?: string
  companyName?: string
}

/**
 * The type of a field name in {@link DonationFormValues}.
 */
export type DonationFormField = keyof DonationFormValues
