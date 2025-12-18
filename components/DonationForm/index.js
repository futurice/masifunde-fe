import { noop } from 'lodash'
import React, { Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'

import countries from '../../utils/countries'
import SubHeader from './SubHeader'
import PageSection from './PageSection'
import FormContainer from './FormContainer'
import FundraisingIframeContainer from './FundraisingIframeContainer'
import InputField from './InputField'
import SelectField from './SelectField'
import MultipleInputField from './MultipleInputField'
import ProjectFormSection from './ProjectFormSection'
import IntervalFormSection from './IntervalFormSection'
import AmountFormSection from './AmountFormSection'
import withFormState from './withFormState'
import {
  COUNTRY_GERMANY,
  DE_PROJECT_ID,
  NO_RECEIPT_OPTION_VALUE,
  RECEIPT_NOW_OPTION_VALUE,
  SA_PROJECT_ID,
} from './constants/formValues'
import {
  WANTS_RECEIPT,
  COUNTRY,
  PAYMENT_INTERVAL,
  AMOUNT,
  SALUTATION,
  TITLE,
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  COMPANY_NAME,
  ADDRESS,
  POST_CODE,
  CITY,
  PROJECT_ID,
} from './constants/fieldNames'

const HiddenButton = styled.button`
  display: none;
`

const DonationForm = ({
  formTitle,
  fundraisingboxIframeTitle,
  fundraisingboxFormHash,
  validateForm,
  decorators,
  fields,
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
  minimumYearlyAmount,
  iframeStatus,
  hideForm,
  disableIntervalSelection,
}) => {
  let formRef

  const submitForm = () => {
    if (formRef) {
      formRef.click()
    }
  }

  const countriesOptions = Object.entries(countries).map(
    ([countryKey, country]) => ({
      value: countryKey,
      text: country,
    })
  )
  const receiptOptions = [
    { value: RECEIPT_NOW_OPTION_VALUE, text: 'Ja, so schnell wie möglich' },
    {
      value: 'receipt_end_of_year',
      text: 'Ja, konsolidiert am Ende des Jahres',
    },
    {
      value: NO_RECEIPT_OPTION_VALUE,
      text: 'Nein, ich brauche keine Quittung',
    },
  ]
  const salutationOptions = [
    { value: 'Mrs.', text: 'Frau' },
    { value: 'Mr.', text: 'Herr' },
  ]
  const isIframeStatusFailureOrSuccess =
    iframeStatus === 'successful' || iframeStatus === 'failure'

  return (
    <Fragment>
      {!isIframeStatusFailureOrSuccess && !hideForm && (
        <Form
          onSubmit={noop}
          decorators={decorators}
          initialValues={{
            [WANTS_RECEIPT]: RECEIPT_NOW_OPTION_VALUE,
            [COUNTRY]: COUNTRY_GERMANY,
            // if the interval is disabled then assume the payment will be single
            ...(disableIntervalSelection && { [PAYMENT_INTERVAL]: '0' }),
            ...initialValues,
          }}
          validate={validateForm}
          render={({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit} autoComplete="on">
              <FormContainer>
                {enableProjectSelection && (
                  <ProjectFormSection
                    deProjectId={DE_PROJECT_ID}
                    fieldName={PROJECT_ID}
                    markdownDe={buttonProjectDeText}
                    markdownSa={buttonProjectSaText}
                    saProjectId={SA_PROJECT_ID}
                    title={projectHeadline}
                  />
                )}

                {disableIntervalSelection || (
                  <IntervalFormSection
                    fieldName={PAYMENT_INTERVAL}
                    title={intervalTitle}
                    intervals={intervals}
                  />
                )}

                <AmountFormSection
                  fieldName={AMOUNT}
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
                    fieldName={SALUTATION}
                    label="Anrede"
                    options={salutationOptions}
                    inputClassName="col-md-4 col-lg-3"
                    autoComplete="honorific-prefix"
                  />

                  <InputField fieldName={TITLE} label="Titel (optional)" />

                  <InputField
                    fieldName={FIRST_NAME}
                    label="Vorname"
                    autoComplete="given-name"
                  />

                  <InputField
                    fieldName={LAST_NAME}
                    label="Nachname"
                    autoComplete="family-name"
                  />

                  <InputField
                    fieldName={EMAIL}
                    label="Email"
                    type="email"
                    autoComplete="email"
                  />

                  <SelectField
                    fieldName={WANTS_RECEIPT}
                    label="Spendenquittung"
                    options={receiptOptions}
                  />

                  {values[WANTS_RECEIPT] !== NO_RECEIPT_OPTION_VALUE && (
                    <Fragment>
                      <InputField
                        fieldName={COMPANY_NAME}
                        label="Firma (optional)"
                        autoComplete="organization"
                      />

                      <InputField
                        fieldName={ADDRESS}
                        label="Adresse"
                        autoComplete="street-address"
                      />

                      <MultipleInputField
                        fieldName1={POST_CODE}
                        fieldName2={CITY}
                        autoComplete1="postal-code"
                        autoComplete2="address-level2"
                        label="PLZ / Ort"
                      />
                    </Fragment>
                  )}

                  <SelectField
                    fieldName={COUNTRY}
                    label="Land"
                    options={countriesOptions}
                    autoComplete="country"
                  />

                  <HiddenButton
                    innerRef={(form) => {
                      formRef = form
                    }}
                  >
                    Submit
                  </HiddenButton>
                </PageSection>
              </FormContainer>
            </form>
          )}
        />
      )}

      <FundraisingIframeContainer
        formTitle={fundraisingboxIframeTitle}
        onMouseHover={submitForm}
        hash={fundraisingboxFormHash}
        scrollToIframe={isIframeStatusFailureOrSuccess}
        fields={fields}
      />
    </Fragment>
  )
}

DonationForm.propTypes = {
  fundraisingboxIframeTitle: PropTypes.string.isRequired,
  fundraisingboxFormHash: PropTypes.string.isRequired,
  formTitle: PropTypes.string.isRequired,
  fields: PropTypes.shape().isRequired,
  projectHeadline: PropTypes.string,
  buttonProjectDeText: PropTypes.string,
  buttonProjectSaText: PropTypes.string,
  amountTitle: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  amounts: AmountFormSection.propTypes.amounts,
  // eslint-disable-next-line react/require-default-props
  intervals: IntervalFormSection.propTypes.intervals,
  intervalTitle: PropTypes.string,
  otherAmountPlaceholder: PropTypes.string,
  validateForm: PropTypes.func.isRequired,
  initialValues: PropTypes.shape(),
  enableProjectSelection: PropTypes.bool,
  enableOtherAmount: PropTypes.bool,
  decorators: PropTypes.arrayOf(PropTypes.func),
  minimumYearlyAmount: PropTypes.string,
  iframeStatus: PropTypes.oneOf(['successful', 'failure', undefined]),
  disableIntervalSelection: PropTypes.bool,
  hideForm: PropTypes.bool,
}

DonationForm.defaultProps = {
  projectHeadline: undefined,
  buttonProjectDeText: undefined,
  buttonProjectSaText: undefined,
  initialValues: {},
  enableProjectSelection: false,
  otherAmountPlaceholder: 'Other',
  enableOtherAmount: false,
  decorators: [],
  minimumYearlyAmount: '0',
  iframeStatus: undefined,
  disableIntervalSelection: false,
  intervals: IntervalFormSection.defaultProps.intervals,
  intervalTitle: '',
  hideForm: false,
}

export default withFormState(DonationForm)
