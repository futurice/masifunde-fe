import React, { Component } from 'react'
import { Button, Input } from 'reactstrap'
import { Form, Field } from 'react-final-form'
import styled from 'styled-components'

import FundRaisingForm from '../components/FundRaisingForm'
import LayoutWrapper from '../components/LayoutWrapper'

const contactStyle = {
  fontSize: 16,
  position: 'relative',
  width: '100%',
  background: '#d8d8d8',
  paddingTop: 50,
  paddingBottom: 50,
  paddingLeft: 200,
  paddingRight: 200,
  height: 200,
  marginTop: 80,
  textAlign: 'center',
  verticalAlign: 'middle',
}

const contactTextStyle = {
  fontSize: 32,
}

const leftCol = {
  float: 'left',
  width: '59%',
  textAlign: 'left',
  verticalAlign: 'center',
  display: 'inline-block',
}

const rightCol = {
  float: 'left',
  width: '39%',
  textAlign: 'left',
  paddingLeft: 50,
  verticalAlign: 'center',
  display: 'inline-block',
}

const phoneIconStyle = {
  height: 20,
  width: 20,
  margin: 10,
}

const countryInfoStyle = {
  border: '1px solid #BBB',
}

const sectionTitleStyle = {
  marginBottom: 20,
}

const sectionDividerStyle = {
  border: '0.5px solid #BBB',
  marginTop: 80,
  marginBottom: 80,
}

const amountButtonStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 40,
  paddingRight: 40,
  minWidth: 20,
  color: 'white',
  backgroundColor: 'gray',
  border: 'none',
  width: '100%',
}

const lightGreyButtonStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 40,
  paddingRight: 40,
  color: 'black',
  backgroundColor: '#d8d8d8',
  border: 'none',
  width: '100%',
}

const ErrorMessage = styled.span`
  display: inline-block;
  margin-left: 0.4rem;
  color: #dc3545;
`

// eslint-disable-next-line react/prefer-stateless-function
class Donate extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.submitForm = this.submitForm.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }
  submitForm() {
    this.formRef.click()
  }
  validateForm(values) {
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
    return (
      <div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1>Durch Bildung Chancen ermöglichen</h1>
              <p>
                Da wir in Deutschland rein ehrenamtlich arbeiten, garantieren wir Ihnen, dass 100
                Prozent der Spenden für unsere Arbeit vor Ort eingesetzt werden. Transparenz ist ein
                Grundsatz unserer Mittelverwendung.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col" style={sectionTitleStyle}>
              <h3>Where do you want to give?</h3>
            </div>
            <div className="col-sm" style={countryInfoStyle}>
              <h3>Germany</h3>
              <br />
              <a href="#url">Description of the masifunde work in the destination</a>
            </div>
            <div className="col-sm" style={countryInfoStyle}>
              <h3>South Africa</h3>
              <br />
              <a href="#url">Description of the masifunde work in the destination</a>
            </div>
          </div>

          <div className="row" style={sectionDividerStyle} />

          <div className="row">
            <div className="col-sm-3" style={sectionTitleStyle}>
              <h3>Choose an amount</h3>
            </div>
            <div className="col">
              <div className="row" style={sectionTitleStyle}>
                <div className="col">
                  <Button style={amountButtonStyle}>5€</Button>
                </div>
                <div className="col">
                  <Button style={amountButtonStyle}>10€</Button>
                </div>
                <div className="col">
                  <Button style={amountButtonStyle}>20€</Button>
                </div>
                <div className="col">
                  <Button style={amountButtonStyle}>50€</Button>
                </div>
              </div>
              <div className="row" style={sectionTitleStyle}>
                <div className="col">
                  <Button style={amountButtonStyle}>100€</Button>
                </div>
                <div className="col">
                  <Button style={amountButtonStyle}>200€</Button>
                </div>
                <div className="col">
                  <Input placeholder="Other amount €" />
                </div>
              </div>
              <div className="row" style={sectionTitleStyle}>
                <div className="col">
                  <Button style={lightGreyButtonStyle}>
                    Your impact with 50€: 15 schoolbooks for a student
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="row" style={sectionDividerStyle} />

          <Form
            onSubmit={() => {}}
            validate={this.validateForm}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <h2>Enter personal details</h2>
                {/* Anrede und Titel */}
                <div className="form-group row">
                  <span className="col-sm-3 col-form-label" id="titleInputs">
                    Anrede und Titel
                  </span>
                  <div className="col-sm-2">
                    <Field name="anrede">
                      {({ input, meta }) => (
                        <div className="d-flex align-items-center" >
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
                      <div className="col-sm-6 d-flex align-items-center" >
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
                      <div className="col-sm-6 d-flex align-items-center" >
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
                <FundRaisingForm onClick={this.submitForm} hash="j3ip42zwp3mlewb9" {...this.state.values} />
              </form>
            )
            }
          />

        </div>

        <div style={contactStyle}>
          <div style={leftCol}>
            <b style={contactTextStyle}>
              Have something to ask? We are happy to answer your questions
            </b>
          </div>
          <div style={rightCol}>
            <div>
              <img src="../static/phone-2.svg" style={phoneIconStyle} alt="" />
              <a href="#url">+49 303 303 303</a>
            </div>
            <div>
              <img src="../static/at-sign.svg" style={phoneIconStyle} alt="" />
              <a href="#url">contact@masifunde.de</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LayoutWrapper(Donate)
