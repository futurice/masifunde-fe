import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'
import styled from 'styled-components'
import _debounce from 'lodash/debounce'

import countries from '../../utils/countries'
import FundRaisingIframe from './FundRaisingIframe'
import ErrorMessage from './ErrorMessage'

const FundRaisingIfameContainer = styled.div`
  padding: 0;
`

const FormLabel = styled.span`
  text-align: left;
  padding-right: 0;

  @media screen and (min-width: 768px){
    text-align: right;
  }
`

const IframeTitle = styled.h3`
  margin-top: 1.5rem;
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

const formLabelBootstrapClasses = 'col-md-3 col-lg-2'

class FundRaisingForm extends Component {
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
      fieldName.address,
      fieldName.city,
      fieldName.country,
      fieldName.email,
      fieldName.firstName,
      fieldName.lastName,
      fieldName.postCode,
      fieldName.salutation,
      fieldName.wantsReceipt,
    ])

    if (!Object.keys(errors).length) {
      this.debounceSetState({ ...this.state, fields })
    }
    return errors
  }

  formInputClassFactory = meta => `form-control ${meta.error && meta.touched ? 'is-invalid' : ''}`

  render() {
    const {
      hiddenFields,
      fundraisingboxIframeTitle,
    } = this.props

    return (
      <Fragment>
        <Form
          onSubmit={() => {}}
          validate={this.validateForm}
          render={({ handleSubmit }) => (
            <form className="offset-md-1 offset-lg-1" onSubmit={(e) => { handleSubmit(e); this.props.onSubmit() }}>
              {/* Anrede */}
              <div className="form-group row">
                <FormLabel className={`${formLabelBootstrapClasses} col-form-label`} id="titleInputs">
                  Anrede
                </FormLabel>
                <div className="col-md-3 col-lg-2 d-flex">
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
                        {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
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
                    <div className="col-md-7 col-lg-6">
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
                <div className="col-md-7 col-lg-6">
                  <Field name={fieldName.firstName}>
                    {({ input, meta }) => (
                      <div>
                        <input
                          {...input}
                          type="text"
                          className={this.formInputClassFactory(meta)}
                          aria-labelledby="firstname-input"
                        />
                        {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
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
                <div className="col-md-7 col-lg-6">
                  <Field name={fieldName.lastName}>
                    {({ input, meta }) => (
                      <div>
                        <input
                          {...input}
                          type="text"
                          className={this.formInputClassFactory(meta)}
                          aria-labelledby="firstname-input"
                        />
                        {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
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
                    <div className="col-md-7 col-lg-6">
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
                <FormLabel className={`${formLabelBootstrapClasses} col-form-label`}>Spendequittung</FormLabel>
                <Field name={fieldName.wantsReceipt}>
                  {({ input, meta }) => (
                    <div className="col-md-7 col-lg-6">
                      <select
                        {...input}
                        id="receipt-input"
                        className={this.formInputClassFactory(meta)}
                      >
                        <option value={null} disabled hidden />
                        <option value="receipt_now">Ja, so schnell wie möglich</option>
                        <option value="receipt_end_of_year">Ja, konsolidiert am Ende des Jahres</option>
                        <option value="no_receipt">Nein, ich brauche keine Quittung</option>
                      </select>
                      {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
                    </div>
                  )}
                </Field>
              </label>
              {/* Firma */}
              <Field name={fieldName.companyName}>
                {({ input, meta }) => (
                  <label className="form-group row" htmlFor="company-input">
                    <FormLabel className={`${formLabelBootstrapClasses} col-form-label`}>Firma (optional)</FormLabel>
                    <div className="col-md-7 col-lg-6">
                      <input
                        {...input}
                        type="text"
                        className={this.formInputClassFactory(meta)}
                        id="company-input"
                      />
                      {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
                    </div>
                  </label>
                )}
              </Field>
              {/* Address */}
              <Field name={fieldName.address}>
                {({ input, meta }) => (
                  <label className="form-group row" htmlFor="address-input">
                    <FormLabel className={`${formLabelBootstrapClasses} col-form-label`}>Adresse</FormLabel>
                    <div className="col-md-7 col-lg-6">
                      <input
                        {...input}
                        type="text"
                        className={this.formInputClassFactory(meta)}
                        id="address-input"
                      />
                      {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
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
                    <div className="col-md-3 col-lg-2">
                      <input
                        {...input}
                        className={this.formInputClassFactory(meta)}
                        aria-labelledby="zip-code-city-inputs"
                      />
                      {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
                    </div>
                  )}
                </Field>
                <Field name={fieldName.city}>
                  {({ input, meta }) => (
                    <div className="col-md-4 pl-md-0 mt-1 mt-md-0">
                      <input
                        {...input}
                        className={this.formInputClassFactory(meta)}
                        aria-labelledby="zip-code-city-inputs"
                      />
                      {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
                    </div>
                  )}
                </Field>
              </div>
              {/* Land */}
              <label className="form-group row" htmlFor="country-input">
                <FormLabel className={`${formLabelBootstrapClasses} col-form-label`}>Land</FormLabel>
                <Field name={fieldName.country}>
                  {({ input, meta }) => (
                    <div className="col-md-7 col-lg-6">
                      <select
                        {...input}
                        id="country-input"
                        className={this.formInputClassFactory(meta)}
                      >
                        <option value={null} disabled hidden />
                        {Object.entries(countries).map(([countryKey, country]) => (
                          <option value={countryKey} key={countryKey}>{country}</option>
                        ))}
                      </select>
                      {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
                    </div>
                  )}
                </Field>
              </label>

              <button className="d-none" ref={(form) => { this.formRef = form }}>Submit</button>
            </form>
          )}
        />
        <IframeTitle>{fundraisingboxIframeTitle}</IframeTitle>
        <FundRaisingIfameContainer className="offset-md-4 offset-lg-3 col-md-9 col-lg-7">
          <FundRaisingIframe
            onMouseHover={this.submitForm}
            hash="j3ip42zwp3mlewb9"
            {...this.state.fields}
            {...hiddenFields}
          />
        </FundRaisingIfameContainer>
      </Fragment>
    )
  }
}

FundRaisingForm.propTypes = {
  hiddenFields: PropTypes.shape({
    projectId: PropTypes.number,
    amount: PropTypes.number,
    interval: PropTypes.oneOf([0, '0', 1, '1', 3, '3', 6, '6', 12, '12']),
  }),
  onSubmit: PropTypes.func,
  fundraisingboxIframeTitle: PropTypes.string.isRequired,
}

FundRaisingForm.defaultProps = {
  hiddenFields: undefined,
  onSubmit: () => {},
}

export default FundRaisingForm
