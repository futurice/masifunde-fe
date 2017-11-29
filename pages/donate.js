/* eslint-disable function-paren-newline */
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'
import styled, { css } from 'styled-components'

import { RouteNames } from '../routes'
import Banner from '../components/Banner'
import Head from '../components/Head'
import Button from '../components/Button'
import { getLocaleFromQuery } from '../utils/locale'
import { fetchDonatePage } from '../api/howToSupport'
import FundRaisingForm from '../components/FundRaisingForm'
import LayoutWrapper from '../components/LayoutWrapper'
import Markdown from '../components/Markdown'

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
  border: solid 3px #fe9933;
  color: #4f463f;
  padding: 20px;
  display: block !important;
  
  ${({ isActive }) => isActive && css`
    color: #fff;
    background-color: #fe9933;
  `}

  // Hide input (copied from boostrap)
  input {
    position: absolute;
    clip: rect(0,0,0,0);
    pointer-events: none;
  }
`

const Divider = styled.div`
  border: 0.5px solid #BBB;
  margin: 50px 0;
`

const ErrorMessage = styled.span`
  display: inline-block;
  margin-left: 0.4rem;
  color: #dc3545;
`

class Donate extends Component {
  state = {}

  submitForm = () => {
    this.formRef.click()
  }
  validateForm = (values) => {
    const errors = {}
    const isRequired = (key) => {
      if (!values[key]) {
        errors[key] = 'Required'
      }
    }
    isRequired('anrede')
    isRequired('tittel')
    isRequired('firstName')
    isRequired('lastName')
    isRequired('company')
    isRequired('email')
    isRequired('address')
    isRequired('lz')
    isRequired('ort')
    isRequired('receipt')
    isRequired('country')
    if (!Object.keys(errors).length) {
      this.setState({ ...this.state, values })
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

          <div className="row">
            <div className="col offset-lg-3">
              <div className="row">
                <div className="col" data-toggle="buttons">
                  <CountryLabel htmlFor="countryInputDe" isActive>
                    <input
                      type="radio"
                      name="country"
                      value="de"
                      selected
                      id="countryInputDe"
                      autoComplete="off"
                    />
                    <Markdown source={section1MarkdownDe} />
                  </CountryLabel>
                </div>
                <div className="col" data-toggle="buttons">
                  <CountryLabel htmlFor="countryInputSa">
                    <input
                      type="radio"
                      name="country"
                      value="sa"
                      id="countryInputSa"
                      autoComplete="off"
                    />
                    <Markdown source={section1MarkdownSa} />
                  </CountryLabel>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          <h3>{section2title}</h3>
          <div className="row">
            <div className="col offset-lg-3">
              {section2ReferenceList.map(({ value, name }) => (
                <LabelButton
                  className="btn"
                  key={value}
                  htmlFor={`frequencyInputOption${value}`}
                >
                  <input
                    type="radio"
                    name="value"
                    value={value}
                    id={`frequencyInputOption${value}`}
                    autoComplete="off"
                  />
                  {name}
                </LabelButton>
              ))}
            </div>
          </div>

          <h3>{section3Title}</h3>
          <div className="row">
            <div className="col offset-lg-3">
              {section3ReferenceList.map(({ text, value }) => (
                <LabelButton
                  className="btn"
                  key={value}
                  htmlFor={`amountInputOption${value}`}
                >
                  <input
                    type="radio"
                    name="frequency"
                    value={value}
                    id={`amountInputOption${value}`}
                    autoComplete="off"
                  />
                  {text}
                </LabelButton>
              ))}
              <input
                name="otherAmount"
                className="form-control col-sm-3"
                type="text"
                placeholder={section3Text}
              />
            </div>
          </div>

          <Divider />
          <Form
            onSubmit={() => {}}
            validate={this.validateForm}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <h2>{section4Title}</h2>
                {/* Anrede und Titel */}
                <div className="form-group row">
                  <span className="col-sm-3 col-form-label" id="titleInputs">
                    Anrede und Titel
                  </span>
                  <div className="col-sm-2">
                    <Field name="anrede">
                      {({ input, meta }) => (
                        <div className="d-flex align-items-center">
                          <select
                            {...input}
                            className={this.formInputClassFactory(meta)}
                            aria-labelledby="titleInputs"
                          >
                            <option value={null} />
                            <option value="Frau">Frau</option>
                            <option value="Herr">Herr</option>
                          </select>
                          {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
                        </div>
                      )}
                    </Field>
                  </div>
                  <Field name="tittel">
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
                <Field name="email">
                  {({ input, meta }) => (
                    <label className="form-group row" htmlFor="inputEmail">
                      <span className="col-sm-3 col-form-label">Email</span>
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
                  <span className="col-sm-3 col-form-label" id="name-inputs">
                    Name
                  </span>
                  <div className="col-sm-3">
                    <Field name="firstName">
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
                    <Field name="lastName">
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
                {/* TO GET ALL COUNTRIES: https://restcountries.eu/rest/v2/all?fields=name;alpha2Code */}
                {/* receipt ? */}
                <label className="form-group row" htmlFor="receipt-input">
                  <span className="col-sm-3 col-form-label">Spendequittung?</span>
                  <Field name="receipt">
                    {({ input, meta }) => (
                      <div className="col-sm-6 d-flex align-items-center">
                        <select
                          {...input}
                          id="receipt-input"
                          className={this.formInputClassFactory(meta)}
                        >
                          <option value={null} />
                          <option value="once">Once</option>
                          <option value="twice">Twice</option>
                        </select>
                        {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
                      </div>
                    )}
                  </Field>
                </label>
                {/* Firma */}
                <Field name="company">
                  {({ input, meta }) => (
                    <label className="form-group row" htmlFor="company-input">
                      <span className="col-sm-3 col-form-label">Firma</span>
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
                <Field name="address">
                  {({ input, meta }) => (
                    <label className="form-group row" htmlFor="address-input">
                      <span className="col-sm-3 col-form-label">Adresse</span>
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
                  <span className="col-sm-3 col-form-label" id="zip-code-city-inputs">
                    LZ und Ort
                  </span>
                  <Field name="lz">
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
                  <Field name="ort">
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
                  <span className="col-sm-3 col-form-label">Country</span>
                  <Field name="country">
                    {({ input, meta }) => (
                      <div className="col-sm-6 d-flex align-items-center">
                        <select
                          {...input}
                          id="country-input"
                          className={this.formInputClassFactory(meta)}
                        >
                          <option value={null} />
                          <option value="once">Once</option>
                          <option value="twice">Twice</option>
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
          <FundRaisingForm
            onMouseHover={this.submitForm}
            hash="j3ip42zwp3mlewb9"
            {...this.state.values}
          />
        </div>
        <Banner
          headline={bannerTitle}
          buttonText={bannerButtonText}
          buttonLink={RouteNames.Index}
        />
      </Fragment>
    )
  }
}

Donate.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string.isRequired,
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

Donate.getInitialProps = async function initialProps({ query }) {
  return fetchDonatePage(getLocaleFromQuery(query))
}

export default LayoutWrapper(Donate)
