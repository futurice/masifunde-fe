import Link from 'next/link'
import { Container, Row, Col, Button } from 'reactstrap'

const linkStyle = {
  marginRight: 20,
  color: 'black',
}

const activeLinkStyle = {
  marginRight: 20,
  color: 'black',
  textDecoration: 'underline',
}

const linkContainerStyle = {
  float: "right,"
}

const containerStyle = {
  marginTop: "auto",
  marginBottom: "auto",
  marginTop: 20,
  marginBottom: 20,
}

const buttonStyle = {
  color: 'white',
  backgroundColor: 'black',
  border: 'none',
}

const homeImageStyle = {
  cursor: 'pointer',
}

export default function Navigation(props) {
  return (
    <Container style={containerStyle}>
      <Row >
        <Col xs="4" sm="4" md="4" lg="4" xl="4">
          <Link href="/"><img src="../static/Masifunde-Logo.png" style={homeImageStyle}/></Link>
        </Col>
        <Col xs="8" sm="8" md="8" lg="8" xl="8">
          <div style={linkContainerStyle}>
            <Link href="/waswirmachen"><a style={(props.activePage === "what") ? activeLinkStyle : linkStyle}>Was wir machen</a></Link>
            <Link href="/about"><a style={(props.activePage === "we") ? activeLinkStyle : linkStyle}>Wer wir sind</a></Link>
            <Link href="/howtohelp"><a style={(props.activePage === "you") ? activeLinkStyle : linkStyle}>Wie Sie helfen</a></Link>
            <Link href="/donate"><a><Button color='primary' style={buttonStyle}>Spenden</Button></a></Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}