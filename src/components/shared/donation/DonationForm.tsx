import { Decorator } from 'final-form'
import T from 'i18n-react'
import { mapValues, noop, sortBy } from 'lodash'
import { FC, useCallback, useMemo, useRef, useState } from 'react'
import { Form, FormSpy } from 'react-final-form'
import styled from 'styled-components'
import {
  DonationAmount,
  DonationInterval,
} from '../../../content/shared/donation'
import { countryCodes } from '../../../i18n/countries'
import AmountFormSection from './AmountFormSection'
import FormContainer from './FormContainer'
import FundraisingIframeContainer from './FundraisingIframeContainer'
import InputField from './InputField'
import IntervalFormSection from './IntervalFormSection'
import MultipleInputField from './MultipleInputField'
import PageSection from './PageSection'
import ProjectFormSection from './ProjectFormSection'
import SelectField from './SelectField'
import SubHeader from './SubHeader'
import { PAYMENT_INTERVAL, PROJECT_ID } from './constants/fieldNames'
import { DE_PROJECT_ID, SA_PROJECT_ID } from './constants/formValues'
import { validateDonationForm } from './data/donation-form-validation'
import { DonationFormValues } from './data/donation-form-values'

// Props
// =====

export type DonationFormDecorator = Decorator<
  DonationFormValues,
  Partial<DonationFormValues>
>

export type Props = {
  // General
  formTitle: string
  initialValues?: Partial<DonationFormValues>
  decorators?: DonationFormDecorator[]
  // Donation Amount
  amountTitle: string
  amounts: DonationAmount[]
  minimumYearlyAmount?: string
  enableOtherAmount?: boolean
  otherAmountPlaceholder?: string
  // Donation Interval
  intervalTitle: string
  intervals: DonationInterval[]
  disableIntervalSelection?: boolean
  // Project Selection
  enableProjectSelection?: boolean
  projectHeadline?: string
  buttonProjectDeText?: string
  buttonProjectSaText?: string
  // Fundraisingbox
  fundraisingboxIframeTitle: string
  fundraisingboxFormHash: string
  iframeStatus: string | null
}

// Helpers
// =======

const HiddenSubmitButton = styled.button`
  display: none;
`

const receiptOptions = [
  {
    value: 'receipt_now',
    text: 'Ja, so schnell wie möglich',
  },
  {
    value: 'receipt_end_of_year',
    text: 'Ja, konsolidiert am Ende des Jahres',
  },
  {
    value: 'no_receipt',
    text: 'Nein, ich brauche keine Quittung',
  },
]

const salutationOptions = [
  { value: 'Mrs.', text: 'Frau' },
  { value: 'Mr.', text: 'Herr' },
]

function getCountryOptions(locale: string) {
  const displayNames = new Intl.DisplayNames([locale, 'en'], { type: 'region' })

  const options = countryCodes.map((code) => ({
    value: code,
    text: displayNames.of(code) ?? code,
  }))

  return sortBy(options, (o) => o.text)
}

function isFundraisingboxIframeFinished(iframeStatus: string | null) {
  return iframeStatus === 'successful' || iframeStatus === 'failure'
}

// Components
// ==========

const DonationForm: FC<Props> = ({
  formTitle,
  fundraisingboxIframeTitle,
  fundraisingboxFormHash,
  decorators,
  projectHeadline,
  buttonProjectDeText,
  buttonProjectSaText,
  amounts,
  intervals,
  otherAmountPlaceholder,
  amountTitle,
  intervalTitle,
  initialValues,
  enableProjectSelection,
  enableOtherAmount,
  minimumYearlyAmount = '0',
  iframeStatus,
  disableIntervalSelection,
}) => {
  const fullInitialValues = useMemo<DonationFormValues>(
    () => ({
      wantsReceipt: 'receipt_now',
      country: 'DE',
      email: '',
      firstName: '',
      lastName: '',
      ...(disableIntervalSelection && { interval: '0' }),
      ...initialValues,
    }),
    [initialValues, disableIntervalSelection]
  )

  const [values, setValues] = useState<DonationFormValues>(fullInitialValues)
  const hiddenSubmitButtonRef = useRef<HTMLButtonElement>(null)

  const countryOptions = getCountryOptions('de')
  const isSubmissionComplete = isFundraisingboxIframeFinished(iframeStatus)

  const validateForm = useCallback(
    (values: DonationFormValues) => {
      const errors = validateDonationForm(values, {
        projectRequired: enableProjectSelection,
      })
      return mapValues(errors, (error) => {
        return error
          ? (T.translate(error.key, error.details) as string)
          : undefined
      })
    },
    [enableProjectSelection]
  )

  const forceValidation = () => {
    // Force react-final-form to validate all form values
    // by clicking a hidden submit button in the form.
    // This is to make the user aware of missing / invalid
    // data as they move to the Fundraisingbox iframe
    // (which displays the payment data section).
    hiddenSubmitButtonRef.current?.click()
  }

  return (
    <>
      {!isSubmissionComplete && (
        <Form<DonationFormValues>
          onSubmit={noop}
          decorators={decorators}
          initialValues={values}
          validate={validateForm}
          render={({ handleSubmit, values }) => (
            <>
              <FormSpy<DonationFormValues>
                subscription={{ values: true, valid: true }}
                onChange={(state) => {
                  if (state.valid) {
                    setValues(state.values)
                  }
                }}
              />

              <form onSubmit={handleSubmit} autoComplete="on">
                <FormContainer>
                  {enableProjectSelection && (
                    <ProjectFormSection
                      deProjectId={DE_PROJECT_ID}
                      fieldName={PROJECT_ID}
                      markdownDe={buttonProjectDeText ?? ''}
                      markdownSa={buttonProjectSaText ?? ''}
                      saProjectId={SA_PROJECT_ID}
                      title={projectHeadline ?? ''}
                    />
                  )}

                  {disableIntervalSelection || (
                    <IntervalFormSection
                      fieldName="interval"
                      title={intervalTitle}
                      intervals={intervals}
                    />
                  )}

                  <AmountFormSection
                    fieldName="amount"
                    title={amountTitle}
                    amounts={amounts}
                    enableOtherAmount={enableOtherAmount}
                    otherAmountPlaceholder={otherAmountPlaceholder}
                    interval={values[PAYMENT_INTERVAL]}
                    minimumYearlyAmount={minimumYearlyAmount}
                  />

                  <PageSection contained={false}>
                    <SubHeader>{formTitle}</SubHeader>

                    <SelectField
                      fieldName="salutation"
                      label="Anrede"
                      options={salutationOptions}
                      inputClassName="col-md-4 col-lg-3"
                      autoComplete="honorific-prefix"
                    />

                    <InputField fieldName="title" label="Titel (optional)" />

                    <InputField
                      fieldName="firstName"
                      label="Vorname"
                      autoComplete="given-name"
                    />

                    <InputField
                      fieldName="lastName"
                      label="Nachname"
                      autoComplete="family-name"
                    />

                    <InputField
                      fieldName="email"
                      label="Email"
                      type="email"
                      autoComplete="email"
                    />

                    <SelectField
                      fieldName="wantsReceipt"
                      label="Spendenquittung"
                      options={receiptOptions}
                    />

                    {values.wantsReceipt !== 'no_receipt' && (
                      <>
                        <InputField
                          fieldName="companyName"
                          label="Firma (optional)"
                          autoComplete="organization"
                        />

                        <InputField
                          fieldName="address"
                          label="Adresse"
                          autoComplete="street-address"
                        />

                        <MultipleInputField
                          fieldName1="postCode"
                          fieldName2="city"
                          autoComplete1="postal-code"
                          autoComplete2="address-level2"
                          label="PLZ / Ort"
                        />
                      </>
                    )}

                    <SelectField
                      fieldName="country"
                      label="Land"
                      options={countryOptions}
                      autoComplete="country"
                    />

                    <HiddenSubmitButton ref={hiddenSubmitButtonRef} />
                  </PageSection>
                </FormContainer>
              </form>
            </>
          )}
        />
      )}

      <FundraisingIframeContainer
        formTitle={fundraisingboxIframeTitle}
        onMouseHover={forceValidation}
        hash={fundraisingboxFormHash}
        scrollToIframe={isSubmissionComplete}
        fields={values}
      />
    </>
  )
}

export default DonationForm
