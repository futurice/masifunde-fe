/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'
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

function Footer({
  whatWeDoText,
  approachSaText,
  approachDeText,
  impactText,
  whoWeAreText,
  teamSaText,
  teamDeText,
  partnersText,
  howToSupportText,
  donateText,
  becomeSponsorText,
  becomeVolunteerText,
  becomePartnerText,
  contactText,
  copyrightText,
}) {
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
                      <a>{whatWeDoText}</a>
                    </Link>
                  </li>
                  <li>
                    <Link route={RouteNames.ApproachSA} passHref>
                      <a>{approachSaText}</a>
                    </Link>
                  </li>
                  <li>
                    <Link route={RouteNames.ApproachDE} passHref>
                      <a>{approachDeText}</a>
                    </Link>
                  </li>
                  <li>
                    <Link route={RouteNames.Impact} passHref>
                      <a>{impactText}</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col">
                <ul className="list-unstyled">
                  <li>
                    <Link route={RouteNames.WhoWeAre} passHref>
                      <a>{whoWeAreText}</a>
                    </Link>
                  </li>
                  <li>
                    <Link route={RouteNames.TeamSA} passHref>
                      <a>{teamSaText}</a>
                    </Link>
                  </li>
                  <li>
                    <Link route={RouteNames.TeamDE} passHref>
                      <a>{teamDeText}</a>
                    </Link>
                  </li>
                  <li>
                    <Link route={RouteNames.Partners} passHref>
                      <a>{partnersText}</a>
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
                      <a>{howToSupportText}</a>
                    </Link>
                  </li>
                  <li>
                    <Link route={RouteNames.Donate} passHref>
                      <a>{donateText}</a>
                    </Link>
                  </li>
                  <li>
                    <Link route={RouteNames.BecomeSponsor} passHref>
                      <a>{becomeSponsorText}</a>
                    </Link>
                  </li>
                  <li>
                    <Link route={RouteNames.BecomeVolunteer} passHref>
                      <a>{becomeVolunteerText}</a>
                    </Link>
                  </li>
                  <li>
                    <Link route={RouteNames.BecomePartner} passHref>
                      <a>{becomePartnerText}</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col">
                <ul className="list-unstyled">
                  <li>
                    <Link route={RouteNames.Contact} passHref>
                      <a>{contactText}</a>
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
            {copyrightText}
          </Col>
        </Row>
        <Row>
          <Col style={copyrightRowStyle}>Impressum und Datenschutzt</Col>
        </Row>
      </Container>
    </Container>
  )
}

export const propTypes = {
  whatWeDoText: PropTypes.string.isRequired,
  approachSaText: PropTypes.string.isRequired,
  approachDeText: PropTypes.string.isRequired,
  impactText: PropTypes.string.isRequired,
  whoWeAreText: PropTypes.string.isRequired,
  teamSaText: PropTypes.string.isRequired,
  teamDeText: PropTypes.string.isRequired,
  partnersText: PropTypes.string.isRequired,
  howToSupportText: PropTypes.string.isRequired,
  donateText: PropTypes.string.isRequired,
  becomeSponsorText: PropTypes.string.isRequired,
  becomeVolunteerText: PropTypes.string.isRequired,
  becomePartnerText: PropTypes.string.isRequired,
  contactText: PropTypes.string.isRequired,
  copyrightText: PropTypes.string.isRequired,
}

Footer.propTypes = propTypes

export default Footer
