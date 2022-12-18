import { Schema, ValidationError, number, string } from 'yup'
import { DonationFormField, DonationFormValues } from './donation-form-values'

// Validations
// ===========

type FieldValidations = Record<DonationFormField, Schema>

/**
 * The field validations that are applied in all cases.
 */
const baseFieldValidations: FieldValidations = {
  amount: number()
    .typeError('donation.mustBeANumber')
    .required('donation.required')
    .integer('donation.mustBeANumber')
    .min(1, 'donation.cantBeLessThan')
    .max(10_000, 'donation.cantBeGreaterThan'),
  interval: string().required('donation.requiredInterval'),
  wantsReceipt: string().required('donation.required'),
  projectId: string(),
  address: string(),
  city: string(),
  postCode: string(),
  country: string().required('donation.required'),
  email: string().required('donation.required').email('donation.invalidEmail'),
  firstName: string().required('donation.required'),
  lastName: string().required('donation.required'),
  salutation: string().required('donation.required'),
  title: string(),
  companyName: string(),
}

/**
 * The field validations that are applied only if the user is
 * expected to choose a project to donate to.
 */
const fieldValidationsIfProjectRequired: Partial<FieldValidations> = {
  projectId: string().required('donation.requiredProject'),
}

/**
 * The field validations that are applied only if the user has
 * requested a donation receipt to be sent to them.
 */
const fieldValidationsIfReceiptRequested: Partial<FieldValidations> = {
  address: string().required('donation.required'),
  city: string().required('donation.required'),
  postCode: string().required('donation.required'),
}

// Types
// =====

/**
 * A validation error for a particular form field.
 */
export type DonationFormFieldError =
  | { key: 'donation.required'; details: undefined }
  | { key: 'donation.requiredProject'; details: undefined }
  | { key: 'donation.requiredInterval'; details: undefined }
  | { key: 'donation.invalidEmail'; details: undefined }
  | { key: 'donation.mustBeANumber'; details: undefined }
  | { key: 'donation.cantBeLessThan'; details: { min: number } }
  | { key: 'donation.cantBeGreaterThan'; details: { max: number } }

/**
 * The return type of {@link validateDonationForm}. For each invalid field,
 * it contains a mapping from the field name to the corresponding error.
 */
export type DonationFormErrors = Record<
  DonationFormField,
  DonationFormFieldError | undefined
>

/**
 * The options that can be passed to {@link validateDonationForm}.
 */
export type DonationFormValidationOptions = {
  /**
   * Whether the user has to select a project to donate to.
   * False by default.
   */
  projectRequired?: boolean
}

// Functions
// =========

/**
 * Checks the current values entered into a donation form according
 * to the given options. Returns a mapping from field names to error
 * messages if at least one field is invalid, or an empty object
 * otherwise.
 *
 * @param values - The donation form data to validate.
 * @param options - Validation options.
 * @returns An object with a name-to-message entry for each invalid field.
 */
export function validateDonationForm(
  values: DonationFormValues,
  options?: DonationFormValidationOptions
): DonationFormErrors {
  const fieldValidations = chooseFieldValidations(values, options)

  const errors: DonationFormErrors = {
    amount: undefined,
    interval: undefined,
    wantsReceipt: undefined,
    projectId: undefined,
    country: undefined,
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    salutation: undefined,
    address: undefined,
    city: undefined,
    postCode: undefined,
    title: undefined,
    companyName: undefined,
  }

  for (const [fieldName, schema] of Object.entries(fieldValidations)) {
    const field = fieldName as DonationFormField
    const value = values[field]
    try {
      schema.validateSync(value)
    } catch (e) {
      errors[field] = toFieldError(e as ValidationError)
    }
  }

  return errors
}

function chooseFieldValidations(
  values: DonationFormValues,
  options?: DonationFormValidationOptions
): FieldValidations {
  let validations = baseFieldValidations

  if (options?.projectRequired) {
    validations = {
      ...validations,
      ...fieldValidationsIfProjectRequired,
    }
  }

  if (values.wantsReceipt !== 'no_receipt') {
    validations = {
      ...validations,
      ...fieldValidationsIfReceiptRequested,
    }
  }

  return validations
}

function toFieldError(e: ValidationError): DonationFormFieldError {
  switch (e.message) {
    case 'donation.cantBeLessThan':
      return {
        key: e.message,
        details: { min: e.params!.min as number },
      }
    case 'donation.cantBeGreaterThan':
      return {
        key: e.message,
        details: { max: e.params!.max as number },
      }
    case 'donation.required':
    case 'donation.requiredProject':
    case 'donation.requiredInterval':
    case 'donation.invalidEmail':
    case 'donation.mustBeANumber':
      return {
        key: e.message,
        details: undefined,
      }
      break
    default:
      throw new Error(`Unexpected validation error: ${e.message}`)
  }
}
