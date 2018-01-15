import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import _debounce from 'lodash/debounce'

import countries from '../../utils/countries'
import SubHeader from './SubHeader'
import PageSection from './FundraisingPageSection'
import FundraisingFormContainer from './FundraisingFormContainer'
import FundraisingIframeContainer from './FundraisingIframeContainer'
import DonationInputField from './DonationInputField'
import DonationSelectField from './DonationSelectField'
import DonationMultipleInputField from './DonationMultipleInputField'

const fieldName = {
  address: 'address',
  city: 'city',
  companyName: 'companyName',
  country: 'country',
  email: 'email',
  firstName: 'firstName',
  lastName: 'lastName',
  postCode: 'postCode',
  salutation: 'salutation',
  title: 'title',
  wantsReceipt: 'wantsReceipt',
}

const noReceiptOptionValue = 'no_receipt'
const receiptNowOptionValue = 'receipt_now'

class DonationPersonalDetailsForm extends Component {
  state = {
    fields: undefined,
  }

  shouldComponentUpdate = (nextProps, nextState) =>
    ((Object.keys(nextProps.hiddenFields).length > 0) && nextState.fields)

  debounceSetState = _debounce(this.setState, 500)

  submitForm = () => {
    this.formRef.click()
    this.props.onSubmit()
  }

  validateForm = (fields) => {
    const errors = {}
    const isRequired = (keysArray) => {
      keysArray.forEach((key) => {
        if (!fields[key]) {
          errors[key] = 'Pflichtfeld'
        }
      })
    }

    isRequired([
      fieldName.country,
      fieldName.email,
      fieldName.firstName,
      fieldName.lastName,
      fieldName.salutation,
      fieldName.wantsReceipt,
    ])

    if (fields[fieldName.wantsReceipt] !== noReceiptOptionValue) {
      isRequired([
        fieldName.address,
        fieldName.city,
        fieldName.postCode,
      ])
    }

    if (!Object.keys(errors).length) {
      this.debounceSetState({
        ...this.state,
        fields,
      })
    }
    return errors
  }

  render() {
    const {
      formTitle,
      pullLeft,
      hiddenFields,
      fundraisingboxIframeTitle,
    } = this.props

    const countriesOptions = Object.entries(countries).map(([countryKey, country]) => ({
      value: countryKey,
      text: country,
    }))
    const receiptOptions = [
      { value: receiptNowOptionValue, text: 'Ja, so schnell wie möglich' },
      { value: 'receipt_end_of_year', text: 'Ja, konsolidiert am Ende des Jahres' },
      { value: noReceiptOptionValue, text: 'Nein, ich brauche keine Quittung' },
    ]
    const salutationOptions = [
      { value: 'Mrs.', text: 'Frau' },
      { value: 'Mr.', text: 'Herr' },
    ]

    return (
      <Fragment>
        <FundraisingFormContainer pullLeft={pullLeft}>
          <PageSection contained={false}>
            <SubHeader>{formTitle}</SubHeader>
            <Form
              onSubmit={() => {}}
              initialValues={{
                [fieldName.wantsReceipt]: receiptNowOptionValue,
                [fieldName.country]: 'DE',
              }}
              validate={this.validateForm}
              render={({ handleSubmit, values }) => (
                <form
                  onSubmit={(e) => {
                  handleSubmit(e)
                  this.props.onSubmit()
                }}
                >
                  <DonationSelectField
                    fieldName={fieldName.salutation}
                    label="Anrede"
                    options={salutationOptions}
                    inputClassName="col-md-4 col-lg-3"
                  />

                  <DonationInputField
                    fieldName={fieldName.title}
                    label="Titel (optional)"
                  />

                  <DonationInputField
                    fieldName={fieldName.firstName}
                    label="Vorname"
                  />

                  <DonationInputField
                    fieldName={fieldName.lastName}
                    label="Nachname"
                  />

                  <DonationInputField
                    fieldName={fieldName.email}
                    label="Email"
                    type="email"
                  />

                  <DonationSelectField
                    fieldName={fieldName.wantsReceipt}
                    label="Spendenquittung"
                    options={receiptOptions}
                  />
                  {
                    (values[fieldName.wantsReceipt] !== noReceiptOptionValue)
                      && (
                        <Fragment>
                          <DonationInputField
                            fieldName={fieldName.companyName}
                            label="Firma (optional)"
                          />

                          <DonationInputField
                            fieldName={fieldName.address}
                            label="Adresse"
                          />

                          <DonationMultipleInputField
                            fieldName1={fieldName.postCode}
                            fieldName2={fieldName.city}
                            label="PLZ / Ort"
                          />
                        </Fragment>
                      )
                  }

                  <DonationSelectField
                    fieldName={fieldName.country}
                    label="Land"
                    options={countriesOptions}
                  />

                  <button
                    className="d-none"
                    ref={(form) => {
                    this.formRef = form
                  }}
                  >
                    Submit
                  </button>
                </form>
              )}
            />
          </PageSection>
        </FundraisingFormContainer>
        <FundraisingIframeContainer
          pullLeft={pullLeft}
          formTitle={fundraisingboxIframeTitle}
          onMouseHover={this.submitForm}
          hash="j3ip42zwp3mlewb9"
          fields={this.state.fields}
          hiddenFields={hiddenFields}
        />
      </Fragment>
    )
  }
}

DonationPersonalDetailsForm.propTypes = {
  hiddenFields: PropTypes.shape({
    projectId: PropTypes.number,
    amount: PropTypes.number,
    interval: PropTypes.oneOf([0, '0', 1, '1', 3, '3', 6, '6', 12, '12']),
  }),
  onSubmit: PropTypes.func,
  fundraisingboxIframeTitle: PropTypes.string.isRequired,
  formTitle: PropTypes.string.isRequired,
  pullLeft: PropTypes.bool,
}

DonationPersonalDetailsForm.defaultProps = {
  hiddenFields: undefined,
  pullLeft: false,
  onSubmit: () => {
  },
}

export default DonationPersonalDetailsForm
