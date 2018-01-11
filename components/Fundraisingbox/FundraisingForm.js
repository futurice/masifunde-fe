import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'
import styled from 'styled-components'
import _debounce from 'lodash/debounce'

import countries from '../../utils/countries'
import ErrorMessage from './ErrorMessage'
import SubHeader from './SubHeader'
import { mdBreakpoint } from '../../styling/breakpoints'
import PageSection from './FundraisingboxPageSection'
import FundraisingFormContainer from './FundraisingFormContainer'
import FundraisingIframeForm from './FundraisingIframeForm'

const FormLabel = styled.span`
  text-align: left;
  padding-right: 0;

  @media screen and (min-width: ${mdBreakpoint}){
    text-align: right;
  }

  @media (max-width: 767.99px){
    padding-top: 0;
    padding-bottom: 0;
  }
`

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

const formLabelBootstrapClasses = 'col-md-3'
const formInputBootstrapClasses = 'col-md-8'

const noReceiptOptionValue = 'no_receipt'
const receiptNowOptionValue = 'receipt_now'

class FundraisingForm extends Component {
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

  formInputClassFactory = meta => `form-control ${meta.error && meta.touched ? 'is-invalid' : ''}`

  render() {
    const {
      formTitle,
      pullLeft,
      hiddenFields,
      fundraisingboxIframeTitle,
    } = this.props

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
                  {/* Anrede */}
                  <div className="form-group row">
                    <FormLabel className={`${formLabelBootstrapClasses} col-form-label`} id="titleInputs">
                      Anrede
                    </FormLabel>
                    <div className="col-md-4 col-lg-3 d-flex">
                      <Field name={fieldName.salutation}>
                        {({ input, meta }) => (
                          <div className="w-100">
                            <select
                              {...input}
                              className={`${this.formInputClassFactory(meta)}  w-100`}
                              aria-labelledby="titleInputs"
                            >
                              <option value={null} disabled hidden />
                              <option value="Mrs.">Frau</option>
                              <option value="Mr.">Herr</option>
                            </select>
                            {
                              meta.error && meta.touched &&
                              <ErrorMessage>{meta.error}</ErrorMessage>
                            }
                          </div>
                        )}
                      </Field>
                    </div>
                  </div>
                  {/* Titel */}
                  <div className="form-group row">
                    <FormLabel className={`${formLabelBootstrapClasses} col-form-label`} id="titleInputs">
                      Titel (optional)
                    </FormLabel>
                    <Field name={fieldName.title}>
                      {({ input, meta }) => (
                        <div className={formInputBootstrapClasses}>
                          <input
                            {...input}
                            type="text"
                            className={this.formInputClassFactory(meta)}
                            aria-labelledby="titleInputs"
                          />
                          {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
                        </div>
                      )}
                    </Field>
                  </div>
                  {/* Firstname */}
                  <div className="form-group row">
                    <FormLabel className={`${formLabelBootstrapClasses} col-form-label`} id="firstname-input">
                      Vorname
                    </FormLabel>
                    <div className={formInputBootstrapClasses}>
                      <Field name={fieldName.firstName}>
                        {({ input, meta }) => (
                          <div>
                            <input
                              {...input}
                              type="text"
                              className={this.formInputClassFactory(meta)}
                              aria-labelledby="firstname-input"
                            />
                            {
                              meta.error && meta.touched &&
                              <ErrorMessage>{meta.error}</ErrorMessage>
                            }
                          </div>
                        )}
                      </Field>
                    </div>
                  </div>
                  {/* Lastname */}
                  <div className="form-group row">
                    <FormLabel className={`${formLabelBootstrapClasses} col-form-label`} id="lastname-input">
                      Nachname
                    </FormLabel>
                    <div className={formInputBootstrapClasses}>
                      <Field name={fieldName.lastName}>
                        {({ input, meta }) => (
                          <div>
                            <input
                              {...input}
                              type="text"
                              className={this.formInputClassFactory(meta)}
                              aria-labelledby="firstname-input"
                            />
                            {
                              meta.error && meta.touched &&
                              <ErrorMessage>{meta.error}</ErrorMessage>
                            }
                          </div>
                        )}
                      </Field>
                    </div>
                  </div>
                  {/* Email */}
                  <Field name={fieldName.email}>
                    {({ input, meta }) => (
                      <label className="form-group row" htmlFor="inputEmail">
                        <FormLabel className={`${formLabelBootstrapClasses} col-form-label`}>E-mail</FormLabel>
                        <div className={formInputBootstrapClasses}>
                          <input
                            {...input}
                            type="email"
                            className={this.formInputClassFactory(meta)}
                            id="inputEmail"
                          />
                          {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
                        </div>
                      </label>
                    )}
                  </Field>
                  {/* receipt ? */}
                  <label className="form-group row" htmlFor="receipt-input">
                    <FormLabel className={`${formLabelBootstrapClasses} col-form-label`}>Spendenquittung</FormLabel>
                    <Field name={fieldName.wantsReceipt}>
                      {({ input, meta }) => (
                        <div className={formInputBootstrapClasses}>
                          <select
                            {...input}
                            id="receipt-input"
                            className={this.formInputClassFactory(meta)}
                          >
                            <option value={receiptNowOptionValue}>
                              Ja, so schnell wie möglich
                            </option>
                            <option value="receipt_end_of_year">Ja, konsolidiert am Ende des Jahres</option>
                            <option value={noReceiptOptionValue}>
                              Nein, ich brauche keine Quittung
                            </option>
                          </select>
                          {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
                        </div>
                      )}
                    </Field>
                  </label>
                  {
                    values[fieldName.wantsReceipt] !== noReceiptOptionValue
                      ? (
                        <Fragment>
                          {/* Firma */}
                          <Field name={fieldName.companyName}>
                            {({ input, meta }) => (
                              <label className="form-group row" htmlFor="company-input">
                                <FormLabel className={`${formLabelBootstrapClasses} col-form-label`}>Firma (optional)</FormLabel>
                                <div className={formInputBootstrapClasses}>
                                  <input
                                    {...input}
                                    type="text"
                                    className={this.formInputClassFactory(meta)}
                                    id="company-input"
                                  />
                                  {
                                    meta.error && meta.touched &&
                                    <ErrorMessage>{meta.error}</ErrorMessage>
                                  }
                                </div>
                              </label>
                            )}
                          </Field>
                          {/* Address */}
                          <Field name={fieldName.address}>
                            {({ input, meta }) => (
                              <label className="form-group row" htmlFor="address-input">
                                <FormLabel className={`${formLabelBootstrapClasses} col-form-label`}>Adresse</FormLabel>
                                <div className={formInputBootstrapClasses}>
                                  <input
                                    {...input}
                                    type="text"
                                    className={this.formInputClassFactory(meta)}
                                    id="address-input"
                                  />
                                  {
                                    meta.error && meta.touched &&
                                    <ErrorMessage>{meta.error}</ErrorMessage>
                                  }
                                </div>
                              </label>
                            )}
                          </Field>
                          {/* PLZ und Ort */}
                          <div className="form-group row">
                            <FormLabel className={`${formLabelBootstrapClasses} col-form-label`} id="zip-code-city-inputs">
                              PLZ / Ort
                            </FormLabel>
                            <Field name={fieldName.postCode}>
                              {({ input, meta }) => (
                                <div className="col-md-3">
                                  <input
                                    {...input}
                                    className={this.formInputClassFactory(meta)}
                                    aria-labelledby="zip-code-city-inputs"
                                  />
                                  {
                                    meta.error && meta.touched &&
                                    <ErrorMessage>{meta.error}</ErrorMessage>
                                  }
                                </div>
                              )}
                            </Field>
                            <Field name={fieldName.city}>
                              {({ input, meta }) => (
                                <div className="col-md-5 pl-md-0 mt-1 mt-md-0">
                                  <input
                                    {...input}
                                    className={this.formInputClassFactory(meta)}
                                    aria-labelledby="zip-code-city-inputs"
                                  />
                                  {
                                    meta.error && meta.touched &&
                                    <ErrorMessage>{meta.error}</ErrorMessage>
                                  }
                                </div>
                              )}
                            </Field>
                          </div>
                        </Fragment>
                      )
                      : null
                  }
                  {/* Land */}
                  <label className="form-group row" htmlFor="country-input">
                    <FormLabel className={`${formLabelBootstrapClasses} col-form-label`}>Land</FormLabel>
                    <Field name={fieldName.country}>
                      {({ input, meta }) => (
                        <div className={formInputBootstrapClasses}>
                          <select
                            {...input}
                            id="country-input"
                            className={this.formInputClassFactory(meta)}
                          >
                            {Object.entries(countries).map(([countryKey, country]) => (
                              <option value={countryKey} key={countryKey}>{country}</option>
                            ))}
                          </select>
                          {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
                        </div>
                      )}
                    </Field>
                  </label>

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
        <FundraisingIframeForm
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

FundraisingForm.propTypes = {
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

FundraisingForm.defaultProps = {
  hiddenFields: undefined,
  pullLeft: false,
  onSubmit: () => {
  },
}

export default FundraisingForm
