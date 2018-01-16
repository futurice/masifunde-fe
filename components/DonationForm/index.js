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
import ProjectField from './ProjectField'
import IntervalField from './IntervalField'
import AmountField from './AmountField'
import withFormState from './withFormState'
import {
  deProjectId,
  noReceiptOptionValue,
  receiptNowOptionValue,
  saProjectId,
} from './constants'

const HiddenButton = styled.button`
  display: none;
`

const DonationForm = ({
  formTitle,
  pullLeft,
  fundraisingboxIframeTitle,
  fieldName,
  validateForm,
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
  showProjects,
}) => {
  let formRef

  const submitForm = () => {
    formRef.click()
  }

  const countriesOptions = Object.entries(countries).map(([countryKey, country]) => ({
    value: countryKey,
    text: country,
  }))
  const receiptOptions = [
    { value: receiptNowOptionValue, text: 'Ja, so schnell wie möglich' },
    { value: 'receipt_end_of_year', text: 'Ja, konsolidiert am Ende des Jahres' },
    { value: noReceiptOptionValue, text: 'Nein, ich brauche keine Quittung' },
  ]
  const salutationOptions = [{ value: 'Mrs.', text: 'Frau' }, { value: 'Mr.', text: 'Herr' }]

  return (
    <Fragment>
      <Form
        onSubmit={() => {}}
        initialValues={{
          [fieldName.wantsReceipt]: receiptNowOptionValue,
          [fieldName.country]: 'DE',
          ...initialValues,
        }}
        validate={validateForm}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <FormContainer pullLeft={pullLeft}>
              {showProjects && (
                <ProjectField
                  deProjectId={deProjectId}
                  fieldName={fieldName.projectId}
                  markdownDe={buttonProjectDeText}
                  markdownSa={buttonProjectSaText}
                  saProjectId={saProjectId}
                  title={projectHeadline}
                />
              )}

              <IntervalField
                fieldName={fieldName.paymentInterval}
                title={intervalTitle}
                intervals={intervals}
              />

              <AmountField
                fieldName={fieldName.amount}
                title={amountTitle}
                amounts={amounts}
                enableOtherAmount
                otherAmountPlaceholder={otherAmountPlaceholder}
              />

              <PageSection contained={false}>
                <SubHeader>{formTitle}</SubHeader>

                <SelectField
                  fieldName={fieldName.salutation}
                  label="Anrede"
                  options={salutationOptions}
                  inputClassName="col-md-4 col-lg-3"
                />

                <InputField
                  fieldName={fieldName.title}
                  label="Titel (optional)"
                />

                <InputField
                  fieldName={fieldName.firstName}
                  label="Vorname"
                />

                <InputField
                  fieldName={fieldName.lastName}
                  label="Nachname"
                />

                <InputField
                  fieldName={fieldName.email}
                  label="Email"
                  type="email"
                />

                <SelectField
                  fieldName={fieldName.wantsReceipt}
                  label="Spendenquittung"
                  options={receiptOptions}
                />

                {values[fieldName.wantsReceipt] !== noReceiptOptionValue && (
                  <Fragment>
                    <InputField
                      fieldName={fieldName.companyName}
                      label="Firma (optional)"
                    />

                    <InputField
                      fieldName={fieldName.address}
                      label="Adresse"
                    />

                    <MultipleInputField
                      fieldName1={fieldName.postCode}
                      fieldName2={fieldName.city}
                      label="PLZ / Ort"
                    />
                  </Fragment>
                )}

                <SelectField
                  fieldName={fieldName.country}
                  label="Land"
                  options={countriesOptions}
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

      <FundraisingIframeContainer
        pullLeft={pullLeft}
        formTitle={fundraisingboxIframeTitle}
        onMouseHover={submitForm}
        hash="j3ip42zwp3mlewb9"
        fields={fields}
      />
    </Fragment>
  )
}

DonationForm.propTypes = {
  fundraisingboxIframeTitle: PropTypes.string.isRequired,
  formTitle: PropTypes.string.isRequired,
  pullLeft: PropTypes.bool,
  fields: PropTypes.shape().isRequired,
  projectHeadline: PropTypes.string,
  buttonProjectDeText: PropTypes.string,
  buttonProjectSaText: PropTypes.string,
  amountTitle: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  amounts: AmountField.propTypes.amounts,
  // eslint-disable-next-line react/require-default-props
  intervals: IntervalField.propTypes.intervals,
  intervalTitle: PropTypes.string.isRequired,
  otherAmountPlaceholder: PropTypes.string,
  validateForm: PropTypes.func.isRequired,
  fieldName: PropTypes.shape().isRequired,
  initialValues: PropTypes.shape(),
  showProjects: PropTypes.bool,
}

DonationForm.defaultProps = {
  pullLeft: false,
  projectHeadline: undefined,
  buttonProjectDeText: undefined,
  buttonProjectSaText: undefined,
  initialValues: {},
  showProjects: false,
  otherAmountPlaceholder: 'Other',
}

export default withFormState(DonationForm)
