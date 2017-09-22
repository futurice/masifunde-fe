import Link from 'next/link';
import { Button, Container, Row, Col } from 'reactstrap';
import * as texts from '../text/home-strings';


import Layout from '../components/Layout';
import * as api from '../api/contentful';

const containerStyle = {
  paddingLeft: 30,
  paddingRight: 30,
}

const titleStyle = {
  textAlign: "center",
  marginTop: 30,
  marginBottom: 30,
}

const pickDestinationStyle ={
  borderBottom: '1px solid #BBB',
  marginBottom: 10,
  borderRight: '35px solid white'
}

const contactStyle = {
  fontSize: 16,
}

const phoneIconStyle ={
  height: 20,
  width: 20,
  margin: 10,
}

const divStyle = {
  border: '1px solid #BBB',
  margintTop: 45,
  marginRight: 15,
  padding: 20,
}

const Donate = (props) => (
  <Layout activePage="we">
    <Container style={containerStyle}>
      <Row>
        <Col xs="2" sm="2" md="2" lg="2" xl="2"/>
        <Col xs="8" sm="8" md="8" lg="8" xl="8" style={titleStyle}>
          <h1>Durch Bildung Chancen ermöglichen</h1>
          <p>When donating to Masifunde, you have the option to choose whether you want your money to go towards our work in South Africa or in Germany.</p>
        </Col>
        <Col xs="2" sm="2" md="2" lg="2" xl="2"/>
      </Row>
      <Row>
        <Col xs="9" sm="9" md="9" lg="9" xl="9" style={pickDestinationStyle}>
          Pick a destination
        </Col>
        <Col xs="3" sm="3" md="3" lg="3" xl="3"/>
      </Row>
      <Row>
        <Col style={divStyle}>
          <h3>Germany</h3>
          <br />
          <a>Description of the masifunde work in the destination</a>
        </Col>
        <Col style={divStyle}>
          <h3>South Africa</h3>
          <br />
          <a>Description of the masifunde work in the destination</a>
        </Col>
        <Col style={divStyle}>
          <h3>Monthly project</h3>
          <br />
          <a>Description of the masifunde work in the destination</a>
        </Col>
        <Col>
          <Row>
            <Col>
              <b style={contactStyle}>Have something to ask? We are happy to answer your questions</b>
              <br/>
            </Col>
          </Row>
          <Row>
            <Col>
              <img src="../static/phone-2.svg" style={phoneIconStyle}/><a style={contactStyle}>+49 303 303 303</a>
            </Col>
          </Row>
          <Row>
            <Col>
            <img src="../static/at-sign.svg" style={phoneIconStyle}/><a style={contactStyle}>contact@masifunde.de</a>
            </Col>
          </Row>
        </Col>
      </Row>


    </Container>
  </Layout>
);

export default Donate;