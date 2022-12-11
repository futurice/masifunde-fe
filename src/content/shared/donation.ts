import { InferType, number, object, string } from 'yup'

// Schema
// ======

/**
 * Schema for the "Donation Interval" (`formFrequency`) content type.
 */
export const donationIntervalSchema = object({
  name: string().required(),
  value: string().required(),
})

/**
 * Schema for the "Donation Amount" (`formPrices`) content type.
 */
export const donationAmountSchema = object({
  text: string().required(),
  value: number().required(),
  description: string(),
})

// Types
// =====

export type DonationInterval = InferType<typeof donationIntervalSchema>
export type DonationAmount = InferType<typeof donationAmountSchema>
