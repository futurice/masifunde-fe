import { Container, Row, Col } from 'reactstrap'
import Link from 'next/link'
import FaTwitter from 'react-icons/lib/fa/twitter'
import FaYoutubePlay from 'react-icons/lib/fa/youtube-play'
import FaFacebook from 'react-icons/lib/fa/facebook'


const containerStyle = {
  marginTop: "auto",
  marginBottom: "auto",
  marginTop: 20,
  marginBottom: 20,
  borderBottom: '1px solid #BBB',
  borderTop: '1px solid #BBB',
  paddingTop: 20,
  paddingBottom: 20,
}

const colStyle = {
  textAlign: 'center',
  fontSize: 14,
  marginBottom: 5,
}

const copyrightStyle = {
  fontSize: 10,
  textAlign: 'center',
  marginTop: 50,
}

const copyrightRowStyle = {
  textAlign: 'center',
}

const socialStyle = {
  marginLeft: 5,
  marginRight: 5,
}

export default function Footer() {
  return (
    <Container>
      <Container style={containerStyle}>
        <Row>
          <Col style={colStyle}>Was wir machen</Col>
          <Col style={colStyle}>Wer sind wir</Col>
          <Col style={colStyle}>Wie Sie helfen</Col>
          <Col style={colStyle}>Blog</Col>
        </Row>
        <Row>
          <Col style={colStyle}>Approach</Col>
          <Col style={colStyle}>Team South Africa</Col>
          <Col style={colStyle}>Spenden</Col>
          <Col style={colStyle}>Kontakt</Col>
        </Row>
        <Row>
          <Col style={colStyle}>Impact</Col>
          <Col style={colStyle}>Team Deutschland</Col>
          <Col style={colStyle}>Become a volunteer</Col>
          <Col style={colStyle}>Presse</Col>
        </Row>
        <Row>
          <Col style={colStyle}></Col>
          <Col style={colStyle}>Partners</Col>
          <Col style={colStyle}>Open positions</Col>
          <Col style={colStyle}>Newsletter</Col>
        </Row>
      </Container>
      <Container style={copyrightStyle}>
        <Row>
          <Col>
            <h4><FaTwitter style={socialStyle} /><FaYoutubePlay style={socialStyle} /><FaFacebook style={socialStyle} /></h4>
          </Col>
        </Row>
        <Row><Col style={copyrightRowStyle}>Copyright 2017 Masifunde Learner Development</Col></Row>
        <Row><Col style={copyrightRowStyle}>Impressum und Datenschutzt</Col></Row>
      </Container>
    </Container>
  );
}