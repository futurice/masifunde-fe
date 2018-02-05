/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import FaYoutubePlay from 'react-icons/lib/fa/youtube-play'
import FaFacebook from 'react-icons/lib/fa/facebook'
import styled from 'styled-components'

import { Link, RouteNames } from '../routes'
import PageSection from './PageSection'
import { largeSpacing, extraSmallSpacing } from '../styling/sizes'

const Sitemap = styled.div`
  font-size: 14px;
`

const CopyrightColumn = styled.div`
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.pineCone};
`

const SocialLink = styled.a`
  color: #444444;
  opacity: 0.6;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;

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
  margin-bottom: ${extraSmallSpacing};
`

const FooterSection = styled(PageSection)`
  margin-top: ${largeSpacing};

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
  font-size: 1.5rem;
`

const PoweredBySection = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
`

const PoweredByLink = styled.a.attrs({
  rel: 'noopener noreferrer nofollow',
  target: '_blank',
})`
  flex: 1;
  max-width: 100px;
  margin: 0 0.5rem;
`

const PoweredByImage = styled.img`
  width: 100%;
  max-height: 32px;
`

const ContentfulImage = PoweredByImage.extend`
  padding-bottom: 2px;
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
    <FooterSection>
      <footer>

        <Sitemap className="row">
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
        </Sitemap>

        <CopyrightSocialSection>
          <div className="row">
            <div className="col">
              <SocialLink href={masifundeYouTubeUrl} target="_blank" rel="noopener noreferrer">
                <FaYoutubePlay />
              </SocialLink>
              <SocialLink href={masifundeFacebookUrl} target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </SocialLink>
            </div>
          </div>
          <div className="row">
            <CopyrightColumn className="col">
              {copyrightText}
            </CopyrightColumn>
          </div>
          <FooterImpressumContainer className="row">
            <CopyrightColumn className="col">
              <Link route={RouteNames.Impressum} passHref>
                <Anchor>{impressumText} </Anchor>
              </Link>
              &
              <Link route={RouteNames.Datenschutz} passHref>
                <Anchor> {datenschutzText}</Anchor>
              </Link>
            </CopyrightColumn>
          </FooterImpressumContainer>
        </CopyrightSocialSection>

        <PoweredBySection>
          <PoweredByLink href="https://contentful.com/">
            <ContentfulImage
              src="/static/images/PoweredByContentful_LightBackground.svg"
              alt="Powered by Contentful"
            />
          </PoweredByLink>

          <PoweredByLink href="https://spiceprogram.org/">
            <PoweredByImage
              src="/static/images/chilicorn.svg"
              alt="Supported through the Chilicorn Fund"
            />
          </PoweredByLink>

          <PoweredByLink href="https://futurice.com/">
            <PoweredByImage
              src="/static/images/built-by-futurice.svg"
              alt="Built by Futurice"
            />
          </PoweredByLink>

        </PoweredBySection>

      </footer>
    </FooterSection>
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
