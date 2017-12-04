/* eslint-disable function-paren-newline */
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'
import styled, { css } from 'styled-components'
import _debaunce from 'lodash/debounce'

import countries from '../../utils/countries'
import { RouteNames } from '../../routes'
import Banner from '../../components/Banner'
import Head from '../../components/Head'
import Button from '../../components/Button'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchDonatePage } from '../../api/howToSupport'
import FundRaisingIframe from '../../components/FundRaisingIframe'
import LayoutWrapper from '../../components/LayoutWrapper'
import Markdown from '../../components/Markdown'

const LabelButton = Button.withComponent('label').extend`
  // Hide input (copied from boostrap)
  input {
    position: absolute;
    clip: rect(0,0,0,0);
    pointer-events: none;
  }
`

const CountryLabel = styled.label`
  border-radius: 8px;
  border: solid 3px ${props => props.theme.orange};
  color: #4f463f;
  padding: 20px;
  display: block !important;

  ${({ isActive }) => isActive && css`
    color: #fff;
    background-color: ${props => props.theme.orange};
  `} 
  
  input {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    pointer-events: none;
  }
`

const Divider = styled.div`
  border: 0.5px solid #bbb;
  margin: 50px 0;
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

const DeProjectId = '3522'
const SaProjectId = '3523'
const fieldName = {
  projectId: 'projectId',
  salutation: 'salutation',
  title: 'title',
  firstName: 'firstName',
  lastName: 'lastName',
  companyName: 'companyName',
  address: 'address',
  postCode: 'postCode',
  city: 'city',
  country: 'country',
  email: 'email',
  amount: 'amount',
  paymentInterval: 'interval',
  wantsReceipt: 'wantsReceipt',
}

class Donate extends Component {
  state = {}
  debaunceSetState = _debaunce(this.setState, 500)

  submitForm = () => {
    this.formRef.click()
  }
  validateForm = (values) => {
    const errors = {}
    const isRequired = (key) => {
      if (!values[key]) {
        errors[key] = '*'
      }
    }
    isRequired(fieldName.projectId)
    isRequired(fieldName.amount)
    isRequired(fieldName.paymentInterval)
    isRequired(fieldName.salutation)
    isRequired(fieldName.title)
    isRequired(fieldName.firstName)
    isRequired(fieldName.lastName)
    isRequired(fieldName.email)
    isRequired(fieldName.address)
    isRequired(fieldName.postCode)
    isRequired(fieldName.city)
    isRequired(fieldName.wantsReceipt)
    isRequired(fieldName.country)
    if (!Object.keys(errors).length) {
      this.debaunceSetState({
        ...this.state,
        values: {
          ...values,
          // Cast to integer
          [fieldName.amount]: Number(values[fieldName.amount]),
          [fieldName.projectId]: Number([fieldName.projectId]),
        },
      })
    }
    return errors
  }
  formInputClassFactory = meta => `form-control ${meta.error && meta.touched ? 'is-invalid' : ''}`
  render() {
    const {
      metaTitle,
      metaDescription,
      introHeading,
      introMarkdown,
      section1title,
      section1MarkdownDe,
      section1MarkdownSa,
      section2title,
      section2ReferenceList,
      section3Title,
      section3ReferenceList,
      section3Text,
      section4Title,
      bannerTitle,
      bannerButtonText,
    } = this.props

    return (
      <Fragment>
        <Head title={metaTitle} description={metaDescription} />
        <div className="container">
          <h1>{introHeading}</h1>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <Markdown source={introMarkdown} />
            </div>
          </div>
          <h3>{section1title}</h3>

          <Form
            onSubmit={() => {}}
            validate={this.validateForm}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col offset-lg-3">
                    <Field name={fieldName.projectId}>
                      {({ input }) => (
                        <div className="row">
                          <div className="col">
                            <CountryLabel
                              htmlFor="countryInputDe"
                              isActive={input.value === DeProjectId}
                            >
                              <input
                                {...input}
                                type="radio"
                                value={DeProjectId}
                                id="countryInputDe"
                                autoComplete="off"
                              />
                              <Markdown source={section1MarkdownDe} />
                            </CountryLabel>
                          </div>
                          <div className="col" data-toggle="buttons">
                            <CountryLabel
                              htmlFor="countryInputSa"
                              isActive={input.value === SaProjectId}
                            >
                              <input
                                {...input}
                                type="radio"
                                value={SaProjectId}
                                id="countryInputSa"
                                autoComplete="off"
                              />
                              <Markdown source={section1MarkdownSa} />
                            </CountryLabel>
                          </div>
                        </div>
                      )}
                    </Field>
                  </div>
                </div>

                <Divider />

                <h3>{section2title}</h3>
                <div className="row">
                  <div className="col offset-lg-3">
                    <Field name={fieldName.paymentInterval}>
                      {({ input }) =>
                        section2ReferenceList.map(({ value, name }) => (
                          <LabelButton
                            className="btn"
                            isActive={input.value === value}
                            key={value}
                            htmlFor={`frequencyInputOption${value}`}
                          >
                            <input
                              {...input}
                              type="radio"
                              value={value}
                              id={`frequencyInputOption${value}`}
                              autoComplete="off"
                            />
                            {name}
                          </LabelButton>
                        ))
                      }
                    </Field>
                  </div>
                </div>

                <h3>{section3Title}</h3>
                <div className="row">
                  <div className="col offset-lg-3">
                    <Field name={fieldName.amount}>
                      {({ input }) =>
                        section3ReferenceList.map(({ text, value }) => (
                          <LabelButton
                            className="btn"
                            isActive={Number(input.value) === value}
                            key={value}
                            htmlFor={`amountInputOption${value}`}
                          >
                            <input
                              {...input}
                              type="radio"
                              value={value}
                              id={`amountInputOption${value}`}
                              autoComplete="off"
                            />
                            {text}
                          </LabelButton>
                        ))}
                    </Field>

                    <Field name={fieldName.amount}>
                      {({ input }) => (
                        <input
                          {...input}
                          className="form-control col-sm-3"
                          type="text"
                          placeholder={section3Text}
                        />
                      )}
                    </Field>
                  </div>
                </div>

                <Divider />

                <h2>{section4Title}</h2>
                {/* Anrede und Titel */}
                <div className="form-group row">
                  <FormLabel className="col-sm-3 col-form-label" id="titleInputs">
                    Anrede* / Titel
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
                {/* Email */}
                <Field name={fieldName.email}>
                  {({ input, meta }) => (
                    <label className="form-group row" htmlFor="inputEmail">
                      <FormLabel className="col-sm-3 col-form-label">Email*</FormLabel>
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
                {/* Name */}
                <div className="form-group row">
                  <FormLabel className="col-sm-3 col-form-label" id="name-inputs">
                    Name*
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
                {/* receipt ? */}
                <label className="form-group row" htmlFor="receipt-input">
                  <FormLabel className="col-sm-3 col-form-label">Spendequittung*</FormLabel>
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
                      <FormLabel className="col-sm-3 col-form-label">Adresse*</FormLabel>
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
                    PLZ* / Ort*
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
                {/* TO GET ALL COUNTRIES: https://restcountries.eu/rest/v2/all?fields=name;alpha2Code */}
                <label className="form-group row" htmlFor="country-input">
                  <FormLabel className="col-sm-3 col-form-label">Country*</FormLabel>
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
          <FundRaisingIframe
            onMouseHover={this.submitForm}
            hash="j3ip42zwp3mlewb9"
            {...this.state.values}
          />
        </div>
        <Banner
          headline={bannerTitle}
          buttonText={bannerButtonText}
          buttonLink={RouteNames.Contact}
        />
      </Fragment>
    )
  }
}

Donate.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  introHeading: PropTypes.string.isRequired,
  introMarkdown: PropTypes.string.isRequired,
  section1title: PropTypes.string.isRequired,
  section1MarkdownDe: PropTypes.string.isRequired,
  section1MarkdownSa: PropTypes.string.isRequired,
  section2title: PropTypes.string.isRequired,
  section2ReferenceList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  section3Title: PropTypes.string.isRequired,
  section3Text: PropTypes.string.isRequired,
  section3ReferenceList: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  section4Title: PropTypes.string.isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
}

Donate.defaultProps = {
  metaDescription: undefined,
}

Donate.getInitialProps = async function initialProps({ query }) {
  return fetchDonatePage(getLocaleFromQuery(query))
}

export default LayoutWrapper(Donate)
