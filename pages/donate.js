import React from 'react'
import { Button, Container, Row, Col, FormGroup, Label, Input } from 'reactstrap'

import LayoutWrapper from '../components/LayoutWrapper'

const containerStyle = {
  paddingLeft: 30,
  paddingRight: 30,
}

const titleStyle = {
  textAlign: 'center',
  marginTop: 30,
  marginBottom: 30,
}

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
  margintTop: 45,
  marginRight: 15,
  padding: 20,
}

const sectionTitleStyle = {
  marginTop: 20,
}

const sectionDividerStyle = {
  border: '0.5px solid #BBB',
  marginTop: 80,
  marginBottom: 80,
}

const radioGroupStyle = {
  float: 'left',
  marginLeft: 30,
}

const amountButtonStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 40,
  paddingRight: 40,
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

const labelStyle = {
  textAlign: 'right',
  fontSize: 18,
}

const Donate = () => (
  <div>
    <Container style={containerStyle}>
      <script
        type="text/javascript"
        src="https://secure.fundraisingbox.com/app/paymentJS?hash=7vznwvrggwrjsufu"
      />
      <a href="http://www.fundraisingbox.com">
        <img
          border="0"
          src="https://secure.fundraisingbox.com/images/FundraisingBox-Logo-Widget.png"
          alt="FundraisingBox Logo"
        />
      </a>
      <Row>
        <Col xs="2" sm="2" md="2" lg="2" xl="2" />
        <Col xs="8" sm="8" md="8" lg="8" xl="8" style={titleStyle}>
          <h1>Durch Bildung Chancen ermöglichen</h1>
          <p>
            When donating to Masifunde, you have the option to choose whether you want your money to
            go towards our work in South Africa or in Germany.
          </p>
        </Col>
        <Col xs="2" sm="2" md="2" lg="2" xl="2" />
      </Row>
      <Row>
        <Col style={sectionTitleStyle}>
          <h3>Pick a destination</h3>
        </Col>
        <Col style={countryInfoStyle}>
          <h3>Germany</h3>
          <br />
          <a href="#url">Description of the masifunde work in the destination</a>
        </Col>
        <Col style={countryInfoStyle}>
          <h3>South Africa</h3>
          <br />
          <a href="#url">Description of the masifunde work in the destination</a>
        </Col>
      </Row>

      <Row style={sectionDividerStyle} />

      <Row>
        <Col xs="4" sm="4" md="4" lg="4" xl="4" style={sectionTitleStyle}>
          <h3>Choose an amount</h3>
        </Col>
        <Col xs="8" sm="8" md="8" lg="8" xl="8">
          <Row>
            I want to donate:
            <FormGroup tag="fieldset">
              <FormGroup check style={radioGroupStyle}>
                <Label check>
                  <Input type="radio" name="radio1" /> Once
                </Label>
              </FormGroup>
              <FormGroup check style={radioGroupStyle}>
                <Label check>
                  <Input type="radio" name="radio1" /> Monthly
                </Label>
              </FormGroup>
              <FormGroup check style={radioGroupStyle}>
                <Label check>
                  <Input type="radio" name="radio1" /> Annually
                </Label>
              </FormGroup>
            </FormGroup>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs="4" sm="4" md="4" lg="4" xl="4" />
        <Col xs="2" sm="2" md="2" lg="2" xl="2">
          <Button style={amountButtonStyle}>5€</Button>
        </Col>
        <Col xs="2" sm="2" md="2" lg="2" xl="2">
          <Button style={amountButtonStyle}>10€</Button>
        </Col>
        <Col xs="2" sm="2" md="2" lg="2" xl="2">
          <Button style={amountButtonStyle}>20€</Button>
        </Col>
        <Col xs="2" sm="2" md="2" lg="2" xl="2">
          <Button style={amountButtonStyle}>50€</Button>
        </Col>
      </Row>
      <Row style={sectionTitleStyle}>
        <Col xs="4" sm="4" md="4" lg="4" xl="4" />
        <Col xs="2" sm="2" md="2" lg="2" xl="2">
          <Button style={amountButtonStyle}>100€</Button>
        </Col>
        <Col xs="2" sm="2" md="2" lg="2" xl="2">
          <Button style={amountButtonStyle}>200€</Button>
        </Col>
        <Col xs="4" sm="4" md="4" lg="4" xl="4">
          <Input placeholder="Other amount €" />
        </Col>
      </Row>
      <Row style={sectionTitleStyle}>
        <Col xs="4" sm="4" md="4" lg="4" xl="4" />
        <Col xs="8" sm="8" md="8" lg="8" xl="8">
          <Button style={lightGreyButtonStyle}>
            Your impact with 50€: 15 schoolbooks for a student
          </Button>
        </Col>
      </Row>

      <Row style={sectionDividerStyle} />

      <Row>
        <Col xs="4" sm="4" md="4" lg="4" xl="4" style={sectionTitleStyle}>
          <h3>Enter personal details</h3>
        </Col>
        <Col xs="8" sm="8" md="8" lg="8" xl="8">
          <FormGroup check>
            <Label check>
              <Input type="checkbox" /> I want to gift this donation
            </Label>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs="4" sm="4" md="4" lg="4" xl="4" />
        <Col xs="2" sm="2" md="2" lg="2" xl="2" style={labelStyle}>
          Anrede und Titel
        </Col>
        <Col xs="2" sm="2" md="2" lg="2" xl="2">
          <FormGroup>
            <Input type="select" name="select" id="exampleSelect">
              <option>Mrs.</option>
              <option>Miss</option>
              <option>Mr.</option>
            </Input>
          </FormGroup>
        </Col>
        <Col xs="2" sm="2" md="2" lg="2" xl="2">
          <FormGroup>
            <Input type="select" name="select" id="exampleSelect">
              <option>Dr.</option>
              <option>Ing.</option>
            </Input>
          </FormGroup>
        </Col>
        <Col xs="2" sm="2" md="2" lg="2" xl="2" />
      </Row>
      <Row>
        <Col xs="4" sm="4" md="4" lg="4" xl="4" />
        <Col xs="2" sm="2" md="2" lg="2" xl="2" style={labelStyle}>
          Name
        </Col>
        <Col xs="5" sm="5" md="5" lg="5" xl="5">
          <FormGroup>
            <Input type="text" name="name" id="name" placeholder="Vorname Nachname" />
          </FormGroup>
        </Col>
        <Col xs="1" sm="1" md="1" lg="1" xl="1" />
      </Row>

      <Row>
        <Col xs="4" sm="4" md="4" lg="4" xl="4" />
        <Col xs="2" sm="2" md="2" lg="2" xl="2" style={labelStyle}>
          Firma(Optional)
        </Col>
        <Col xs="5" sm="5" md="5" lg="5" xl="5">
          <FormGroup>
            <Input type="text" name="firma" id="firma" />
          </FormGroup>
        </Col>
        <Col xs="1" sm="1" md="1" lg="1" xl="1" />
      </Row>
      <FormGroup tag="fieldset">
        <Row>
          <Col xs="4" sm="4" md="4" lg="4" xl="4" />
          <Col xs="2" sm="2" md="2" lg="2" xl="2" style={labelStyle}>
            Donation certificate
          </Col>
          <Col xs="5" sm="5" md="5" lg="5" xl="5">
            <FormGroup check style={radioGroupStyle}>
              <Label check>
                <Input type="radio" name="radio1" /> PDF file via e-mail
              </Label>
            </FormGroup>
          </Col>
          <Col xs="1" sm="1" md="1" lg="1" xl="1" />
        </Row>
        <Row>
          <Col xs="4" sm="4" md="4" lg="4" xl="4" />
          <Col xs="2" sm="2" md="2" lg="2" xl="2" />
          <Col xs="5" sm="5" md="5" lg="5" xl="5">
            <FormGroup check style={radioGroupStyle}>
              <Label check>
                <Input type="radio" name="radio1" /> Printed document via post
              </Label>
            </FormGroup>
          </Col>
          <Col xs="1" sm="1" md="1" lg="1" xl="1" />
        </Row>
      </FormGroup>

      <Row>
        <Col xs="4" sm="4" md="4" lg="4" xl="4" />
        <Col xs="2" sm="2" md="2" lg="2" xl="2" style={labelStyle}>
          Email
        </Col>
        <Col xs="5" sm="5" md="5" lg="5" xl="5">
          <FormGroup>
            <Input type="email" name="email" id="email" />
          </FormGroup>
        </Col>
        <Col xs="1" sm="1" md="1" lg="1" xl="1" />
      </Row>
    </Container>

    <div style={contactStyle}>
      <div style={leftCol}>
        <b style={contactTextStyle}>Have something to ask? We are happy to answer your questions</b>
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

export default LayoutWrapper(Donate)
