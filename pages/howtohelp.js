/* eslint-disable react/prop-types */
import React from 'react'
import { Button, Container, Row, Col } from 'reactstrap'
import { getWieSieHelfenFields } from '../api/contentGetter'
import Layout from '../components/Layout'

const buttonStyle = {
  color: 'white',
  backgroundColor: 'black',
  border: 'none',
  cursor: 'pointer',
}

const ovalStyle = {
  width: '100',
  height: '100',
}

const rowStyle = {
  marginTop: '10',
  marginBottom: '100',
}

const topRowStyle = {
  marginBottom: '100',
  backgroundColor: 'Gainsboro',
}

const colOvalStyle = {
  textAlign: 'right',
}

const titleStyle = {
  marginTop: '50',
  marginBottom: '50',
}

const Howtohelp = props => (
  <Layout activePage="you">
    <Container>
      <Row style={topRowStyle}>
        {/* Section intro part */}
        <Col xs="1" sm="1" md="1" lg="1" xl="1" />
        <Col xs="6" sm="6" md="6" lg="6" xl="6" style={titleStyle}>
          <h2>{props.title}</h2>
        </Col>
        <Col xs="5" sm="5" md="5" lg="5" xl="5" />
      </Row>
      <Row style={rowStyle}>
        {/* Financial support part */}
        <Col xs="3" sm="3" md="3" lg="3" xl="3" style={colOvalStyle}>
          <img src="../static/oval4.svg" style={ovalStyle} alt="" />
        </Col>
        <Col xs="7" sm="7" md="7" lg="7" xl="7">
          <h1>{props.paragraphOneTitle}</h1>
          <p>{props.paragraphOneText}</p>
          <Button color="primary" style={buttonStyle}>
            Spenden
          </Button>
        </Col>
        <Col xs="2" sm="2" md="2" lg="2" xl="2" />
      </Row>
      <Row style={rowStyle}>
        {/* Volunteer support part */}
        <Col xs="3" sm="3" md="3" lg="3" xl="3" style={colOvalStyle}>
          <img src="../static/oval4.svg" style={ovalStyle} alt="" />
        </Col>
        <Col xs="7" sm="7" md="7" lg="7" xl="7">
          <h1>{props.paragraphTwoTitle}</h1>
          <p>{props.paragraphTwoText}</p>
          <Button color="primary" style={buttonStyle}>
            Learn about becoming a volunteer
          </Button>
        </Col>
        <Col xs="2" sm="2" md="2" lg="2" xl="2" />
      </Row>
      <Row style={rowStyle}>
        {/* Institutional support part */}
        <Col xs="3" sm="3" md="3" lg="3" xl="3" style={colOvalStyle}>
          <img src="../static/oval4.svg" style={ovalStyle} alt="" />
        </Col>
        <Col xs="7" sm="7" md="7" lg="7" xl="7">
          <h1>{props.paragraphThreeTitle}</h1>
          <p>{props.paragraphThreeText}</p>
          <Button color="primary" style={buttonStyle}>
            Unternehmenspartner werden
          </Button>
        </Col>
        <Col xs="2" sm="2" md="2" lg="2" xl="2" />
      </Row>
      <Row>
        <Col>
          <img src={props.partnersImageUrl} alt="" />
        </Col>
      </Row>
    </Container>
  </Layout>
)

Howtohelp.getInitialProps = async function getInitialProps() {
  const resultJSON = await getWieSieHelfenFields()
  console.log('Result:', resultJSON)
  return resultJSON
}

export default Howtohelp
