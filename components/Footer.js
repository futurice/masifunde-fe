/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import FaYoutubePlay from 'react-icons/lib/fa/youtube-play'
import FaFacebook from 'react-icons/lib/fa/facebook'

import { Link, RouteNames } from '../routes'

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
                  <li>
                    <Link route={RouteNames.WhatWeDo} passHref>
                      <a>Was wir machen</a>
                    </Link>
                  </li>
                  <li>
                    <Link route={RouteNames.ApproachSA} passHref>
                      <a>Approach South Africa</a>
                    </Link>
                  </li>
                  <li>
                    <Link route={RouteNames.ApproachDE} passHref>
                      <a>Approach Deutchland</a>
                    </Link>
                  </li>
                  <li>
                    <Link route={RouteNames.Impact} passHref>
                      <a>Impact</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col">
                <ul className="list-unstyled">
                  <li>
                    <Link route={RouteNames.WhoWeAre} passHref>
                      <a>Wer sind wir</a>
                    </Link>
                  </li>
                  <li>
                    <Link route={RouteNames.TeamSA} passHref>
                      <a>Team South Africa</a>
                    </Link>
                  </li>
                  <li>
                    <Link route={RouteNames.TeamDE} passHref>
                      <a>Team Deutschland</a>
                    </Link>
                  </li>
                  <li>
                    <Link route={RouteNames.Partners} passHref>
                      <a>Partners</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-sm">
            <div className="row">
              <div className="col">
                <ul className="list-unstyled">
                  <li>
                    <Link route={RouteNames.HowToSupport} passHref>
                      <a>Wie Sie helfen</a>
                    </Link>
                  </li>
                  <li>
                    <Link route={RouteNames.Donate} passHref>
                      <a>Spenden</a>
                    </Link>
                  </li>
                  <li>
                    <Link route={RouteNames.BecomeSponsor} passHref>
                      <a>Sponsor</a>
                    </Link>
                  </li>
                  <li>
                    <Link route={RouteNames.BecomeVolunteer} passHref>
                      <a>Volunteer</a>
                    </Link>
                  </li>
                  <li>
                    <Link route={RouteNames.BecomePartner} passHref>
                      <a>Open Partner</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col">
                <ul className="list-unstyled">
                  <li>
                    <Link route={RouteNames.Contact} passHref>
                      <a>Kontakt</a>
                    </Link>
                  </li>
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
              <FaYoutubePlay style={socialStyle} />
              <FaFacebook style={socialStyle} />
            </h4>
          </Col>
        </Row>
        <Row>
          <Col style={copyrightRowStyle}>
            © 2017 Masifunde Learner Development
          </Col>
        </Row>
        <Row>
          <Col style={copyrightRowStyle}>Impressum und Datenschutzt</Col>
        </Row>
      </Container>
    </Container>
  )
}
