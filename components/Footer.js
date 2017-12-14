/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'
import FaYoutubePlay from 'react-icons/lib/fa/youtube-play'
import FaFacebook from 'react-icons/lib/fa/facebook'
import styled from 'styled-components'

import { Link, RouteNames } from '../routes'

const containerStyle = {
  marginBottom: 20,
  borderTop: '1px solid #ddd',
  paddingTop: 60,
  paddingBottom: 0,
}

const LinksContainer = {
  fontSize: 14,
}

const copyrightStyle = {
  textAlign: 'center',
  marginTop: 50,
  marginBottom: 70,
}

const copyrightRowStyle = {
  textAlign: 'center',
  fontSize: 14,
  color: '#77695C',
}

const socialStyle = {
  marginLeft: 10,
  marginRight: 10,
  cursor: 'pointer',
}

const SocialLink = styled.a`
  color: #444444;
  opacity: 0.6;
  
  &:hover {
    color: #444444 !important;
    opacity: 1;
  }
`

function Footer({
  whatWeDoText,
  approachSaText,
  approachDeText,
  impactText,
  whoWeAreText,
  teamSaText,
  teamDeText,
  howToSupportText,
  donateText,
  becomeSponsorText,
  becomeVolunteerText,
  becomePartnerText,
  contactText,
  copyrightText,
  masifundeYouTubeUrl,
  masifundeFacebookUrl,
  impressumText,
}) {
  return (
    <Container className="footer">
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
              <SocialLink href={masifundeYouTubeUrl} target="_blank" rel="noopener noreferrer">
                <FaYoutubePlay style={socialStyle} />
              </SocialLink>
              <SocialLink href={masifundeFacebookUrl} target="_blank" rel="noopener noreferrer">
                <FaFacebook style={socialStyle} />
              </SocialLink>
            </h4>
          </Col>
        </Row>
        <Row>
          <Col style={copyrightRowStyle}>
            {copyrightText}
          </Col>
        </Row>
        <Row>
          <Col style={copyrightRowStyle}>
            <Link route={RouteNames.Contact} passHref>
              <a>{impressumText} </a>
            </Link>
            und
            <Link route={RouteNames.Datenschutz} passHref>
              <a> Datenschutz</a>
            </Link>
          </Col>
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
  howToSupportText: PropTypes.string.isRequired,
  donateText: PropTypes.string.isRequired,
  becomeSponsorText: PropTypes.string.isRequired,
  becomeVolunteerText: PropTypes.string.isRequired,
  becomePartnerText: PropTypes.string.isRequired,
  contactText: PropTypes.string.isRequired,
  copyrightText: PropTypes.string.isRequired,
  masifundeYouTubeUrl: PropTypes.string.isRequired,
  masifundeFacebookUrl: PropTypes.string.isRequired,
  impressumText: PropTypes.string.isRequired,
}

Footer.propTypes = propTypes

export default Footer
