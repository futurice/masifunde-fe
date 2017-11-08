/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Link from 'next/link'
import { Container, Row, Col } from 'reactstrap'
import FaTwitter from 'react-icons/lib/fa/twitter'
import FaYoutubePlay from 'react-icons/lib/fa/youtube-play'
import FaFacebook from 'react-icons/lib/fa/facebook'

const containerStyle = {
  marginTop: 20,
  marginBottom: 20,
  borderBottom: '1px solid #BBB',
  borderTop: '1px solid #BBB',
  paddingTop: 20,
  paddingBottom: 20,
}

const LinksContainer = {
  fontSize: 14,
}

const copyrightStyle = {
  fontSize: 10,
  textAlign: 'center',
  marginTop: 50,
  marginBottom: 50,
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
        <div className="row" style={LinksContainer}>

          <div className="col-sm">
            <div className="row">
              <div className="col">
                <ul className="list-unstyled">
                  <li>Was wir machen</li>
                  <li>Approach</li>
                  <li>Impact</li>
                </ul>
              </div>
              <div className="col">
                <ul className="list-unstyled">
                  <li>Wer sind wir</li>
                  <li>Team South Africa</li>
                  <li>Team Deutschland</li>
                  <li>Partners</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-sm">
            <div className="row">
              <div className="col">
                <ul className="list-unstyled">
                  <li>Wie Sie helfen</li>
                  <li>Spenden</li>
                  <li>Become volunteer</li>
                  <li>Open positions</li>
                </ul>
              </div>
              <div className="col">
                <ul className="list-unstyled">
                  <li>Blog</li>
                  <li>
                    <Link href="/contact">
                      <a>Kontakt</a>
                    </Link>
                  </li>
                  <li>Presse</li>
                  <li>Newsletter</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </Container>
      <Container style={copyrightStyle}>
        <Row>
          <Col>
            <h4>
              <FaTwitter style={socialStyle} />
              <FaYoutubePlay style={socialStyle} />
              <FaFacebook style={socialStyle} />
            </h4>
          </Col>
        </Row>
        <Row>
          <Col style={copyrightRowStyle}>
            Copyright 2017 Masifunde Learner Development
          </Col>
        </Row>
        <Row>
          <Col style={copyrightRowStyle}>Impressum und Datenschutzt</Col>
        </Row>
      </Container>
    </Container>
  )
}
