/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Col } from 'reactstrap'
import PropTypes from 'prop-types'
import FaYoutubePlay from 'react-icons/lib/fa/youtube-play'
import FaFacebook from 'react-icons/lib/fa/facebook'
import styled from 'styled-components'

import { Link, RouteNames } from '../routes'
import PageSection from './PageSection'

const LinksContainer = {
  fontSize: 14,
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

const Anchor = styled.a`
  color: ${props => props.theme.pineCone};

  &:visited {
    color: ${props => props.theme.pineCone};
  }
`

const FooterImpressumContainer = styled.div`
  margin-bottom: 1rem;
`

const ContentfulImage = styled.img`
  max-width: 100px;
  width: 100%;
`

const FooterContainer = styled(PageSection)`
  margin-top: 3rem;

  a, a:visited {
    color: ${({ theme }) => theme.pineCone};
  }

  li {
    padding: 0.3rem 0;
    color: #77695c;
  }

  ul li:first-of-type {
    font-weight: 700;
  }
`

const CopyrightSocialSection = styled.div`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const FooterLink = ({ route, text }) => (
  <li>
    <Link route={route} passHref>
      <a>{text}</a>
    </Link>
  </li>
)

FooterLink.propTypes = {
  route: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

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
  datenschutzText,
}) {
  return (
    <FooterContainer>
      <div className="row" style={LinksContainer}>
        <div className="col-sm">
          <div className="row">
            <div className="col">
              <ul className="list-unstyled">
                <FooterLink route={RouteNames.WhatWeDo} text={whatWeDoText} />
                <FooterLink route={RouteNames.ApproachSA} text={approachSaText} />
                <FooterLink route={RouteNames.ApproachDE} text={approachDeText} />
                <FooterLink route={RouteNames.Impact} text={impactText} />
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <FooterLink route={RouteNames.WhoWeAre} text={whoWeAreText} />
                <FooterLink route={RouteNames.TeamSA} text={teamSaText} />
                <FooterLink route={RouteNames.TeamDE} text={teamDeText} />
              </ul>
            </div>
          </div>
        </div>

        <div className="col-sm">
          <div className="row">
            <div className="col">
              <ul className="list-unstyled">
                <FooterLink route={RouteNames.HowToSupport} text={howToSupportText} />
                <FooterLink route={RouteNames.Donate} text={donateText} />
                <FooterLink route={RouteNames.BecomeSponsor} text={becomeSponsorText} />
                <FooterLink route={RouteNames.BecomeVolunteer} text={becomeVolunteerText} />
                <FooterLink route={RouteNames.BecomePartner} text={becomePartnerText} />
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <FooterLink route={RouteNames.Contact} text={contactText} />
              </ul>
            </div>
          </div>
        </div>

      </div>
      <CopyrightSocialSection>
        <div className="row">
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
        </div>
        <div className="row">
          <Col style={copyrightRowStyle}>
            {copyrightText}
          </Col>
        </div>
        <FooterImpressumContainer className="row">
          <Col style={copyrightRowStyle}>
            <Link route={RouteNames.Impressum} passHref>
              <Anchor>{impressumText} </Anchor>
            </Link>
            &
            <Link route={RouteNames.Datenschutz} passHref>
              <Anchor> {datenschutzText}</Anchor>
            </Link>
          </Col>
        </FooterImpressumContainer>
        <div className="row">
          <Col>
            <a href="https://www.contentful.com/" rel="noopener noreferrer nofollow" target="_blank">
              <ContentfulImage
                src="/static/images/PoweredByContentful_LightBackground.svg"
                alt="Powered by Contentful"
              />
            </a>
          </Col>
        </div>
      </CopyrightSocialSection>
    </FooterContainer>
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
  datenschutzText: PropTypes.string.isRequired,
}

Footer.propTypes = propTypes

export default Footer
