import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'
import styled from 'styled-components'
import _debounce from 'lodash/debounce'

import countries from '../../utils/countries'
import FundRaisingIframe from './FundRaisingIframe'

const FundRaisingIfameContainer = styled.div`
  padding: 0;
`

const ErrorMessage = styled.span`
  display: inline-block;
  margin-left: 0.4rem;
  color: #dc3545;
`

const FormLabel = styled.span`
  text-align: left;
  
  @media screen and (min-width: 576px){
    text-align: right;
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
          errors[key] = '*'
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
    } = this.props

    return (
      <Fragment>
        <Form
          onSubmit={() => {}}
          validate={this.validateForm}
          render={({ handleSubmit }) => (
            <form onSubmit={(e) => { handleSubmit(e); this.props.onSubmit() }}>
              {/* Anrede und Titel */}
              <div className="form-group row">
                <FormLabel className="col-sm-3 col-form-label" id="titleInputs">
                  Anrede * / Titel
                </FormLabel>
                <div className="col-sm-2">
                  <Field name={fieldName.salutation}>
                    {({ input, meta }) => (
                      <div className="d-flex align-items-center">
                        <select
                          {...input}
                          className={this.formInputClassFactory(meta)}
                          aria-labelledby="titleInputs"
                        >
                          <option value={null} />
                          <option value="Mrs.">Frau</option>
                          <option value="Mr.">Herr</option>
                        </select>
                        {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
                      </div>
                    )}
                  </Field>
                </div>
                <Field name={fieldName.title}>
                  {({ input, meta }) => (
                    <div className="col-sm-4 d-flex align-items-center">
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
              {/* Name */}
              <div className="form-group row">
                <FormLabel className="col-sm-3 col-form-label" id="name-inputs">
                  Name *
                </FormLabel>
                <div className="col-sm-3">
                  <Field name={fieldName.firstName}>
                    {({ input, meta }) => (
                      <div className="d-flex align-items-center">
                        <input
                          {...input}
                          type="text"
                          className={this.formInputClassFactory(meta)}
                          aria-labelledby="name-inputs"
                        />
                        {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
                      </div>
                    )}
                  </Field>
                </div>
                <div className="col-sm-3">
                  <Field name={fieldName.lastName}>
                    {({ input, meta }) => (
                      <div className="d-flex align-items-center">
                        <input
                          {...input}
                          type="text"
                          className={this.formInputClassFactory(meta)}
                          aria-labelledby="name-inputs"
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
                    <FormLabel className="col-sm-3 col-form-label">Email *</FormLabel>
                    <div className="col-sm-6 d-flex align-items-center">
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
                <FormLabel className="col-sm-3 col-form-label">Spendequittung *</FormLabel>
                <Field name={fieldName.wantsReceipt}>
                  {({ input, meta }) => (
                    <div className="col-sm-6 d-flex align-items-center">
                      <select
                        {...input}
                        id="receipt-input"
                        className={this.formInputClassFactory(meta)}
                      >
                        <option value={null} />
                        {/* <option value="no_receipt">no receipt</option> */}
                        <option value="receipt_now">Ja, so schnell wie möglich</option>
                        <option value="receipt_end_of_year">Ja, konsolidiert am Ende des Jahresr</option>
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
                    <FormLabel className="col-sm-3 col-form-label">Firma</FormLabel>
                    <div className="col-sm-6 d-flex align-items-center">
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
                    <FormLabel className="col-sm-3 col-form-label">Adresse *</FormLabel>
                    <div className="col-sm-6 d-flex align-items-center">
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
                <FormLabel className="col-sm-3 col-form-label" id="zip-code-city-inputs">
                  PLZ * / Ort *
                </FormLabel>
                <Field name={fieldName.postCode}>
                  {({ input, meta }) => (
                    <div className="col-sm-3 d-flex align-items-center">
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
                    <div className="col-sm-3 d-flex align-items-center">
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
                <FormLabel className="col-sm-3 col-form-label">Country *</FormLabel>
                <Field name={fieldName.country}>
                  {({ input, meta }) => (
                    <div className="col-sm-6 d-flex align-items-center">
                      <select
                        {...input}
                        id="country-input"
                        className={this.formInputClassFactory(meta)}
                      >
                        <option value={null} />
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
        <FundRaisingIfameContainer className="col-sm-9">
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
}

FundRaisingForm.defaultProps = {
  hiddenFields: undefined,
  onSubmit: () => {},
}

export default FundRaisingForm
