import React, { Component } from 'react'
import { Button, Input } from 'reactstrap'

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

// eslint-disable-next-line react/prefer-stateless-function
class Donate extends Component {
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

          <div>
            <h2>Enter personal details</h2>
            {/* Anrede und Titel */}
            <div className="form-group row">
              <span className="col-sm-3 col-form-label" id="titleInputs">
                Anrede und Titel
              </span>
              <div className="col-sm-2">
                <select aria-labelledby="titleInputs" className="form-control">
                  <option selected>Choose...</option>
                  <option>Frau</option>
                  <option>Herr</option>
                </select>
              </div>
              <div className="col-sm-4">
                <input type="email" className="form-control" aria-labelledby="titleInputs" />
              </div>
            </div>
            {/* Email */}
            <label className="form-group row" htmlFor="inputEmail">
              <span className="col-sm-3 col-form-label">Email</span>
              <div className="col-sm-6">
                <input type="email" className="form-control" id="inputEmail" />
              </div>
            </label>
            {/* Name */}
            <div className="form-group row">
              <span className="col-sm-3 col-form-label" id="name-inputs">
                Name
              </span>
              <div className="col-sm-3">
                <input className="form-control" aria-labelledby="name-inputs" />
              </div>
              <div className="col-sm-3">
                <input className="form-control" aria-labelledby="name-inputs" />
              </div>
            </div>
            {/* TO GET ALL COUNTRIES: https://restcountries.eu/rest/v2/all?fields=name;alpha2Code */}
            {/* receipt ? */}
            <label className="form-group row" htmlFor="receipt-input">
              <span className="col-sm-3 col-form-label">Spendequittung?</span>
              <div className="col-sm-6">
                <select id="receipt-input" className="form-control">
                  <option selected>Choose...</option>
                  <option>Once</option>
                  <option>Twice</option>
                </select>
              </div>
            </label>
            {/* Firma */}
            <label className="form-group row" htmlFor="company-input">
              <span className="col-sm-3 col-form-label">Firma</span>
              <div className="col-sm-6">
                <input type="email" className="form-control" id="company-input" />
              </div>
            </label>
            {/* Address */}
            <label className="form-group row" htmlFor="address-input">
              <span className="col-sm-3 col-form-label">Adresse</span>
              <div className="col-sm-6">
                <input type="email" className="form-control" id="address-input" />
              </div>
            </label>
            {/* PLZ und Ort */}
            <div className="form-group row">
              <span className="col-sm-3 col-form-label" id="zip-code-city-inputs">
                LZ und Ort
              </span>
              <div className="col-sm-3">
                <input className="form-control" aria-labelledby="zip-code-city-inputs" />
              </div>
              <div className="col-sm-3">
                <input className="form-control" aria-labelledby="zip-code-city-inputs" />
              </div>
            </div>
            {/* Land */}
            <label className="form-group row" htmlFor="country-input">
              <span className="col-sm-3 col-form-label">Country</span>
              <div className="col-sm-6">
                <select id="country-input" className="form-control">
                  <option selected>Choose...</option>
                  <option>Once</option>
                  <option>Twice</option>
                </select>
              </div>
            </label>

            <FundRaisingForm hash="j3ip42zwp3mlewb9" />
          </div>

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
