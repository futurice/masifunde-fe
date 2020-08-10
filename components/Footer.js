import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import FaYoutubePlay from 'react-icons/lib/fa/youtube-play'
import FaFacebook from 'react-icons/lib/fa/facebook'
import styled from 'styled-components'
import T from 'i18n-react'

import { RouteNames } from '../routes'
import Link from './Link'
import PageSection from './PageSection'
import { largeSpacing, extraSmallSpacing, smallSpacing } from '../styling/sizes'
import { footerText, rem } from '../styling/typography'
import SocialLink from './SocialLink'

const Text = styled.div`
  text-align: center;
`

const Anchor = styled.a`
  color: ${props => props.theme.pineCone};
  &:visited {
    color: ${props => props.theme.pineCone};
  }
`

const FooterSection = styled(PageSection)`
  ${footerText};
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

const InformationSection = styled.div`
  text-align: center;
  margin: ${smallSpacing} auto;
`

const PoweredBySection = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
`

const PoweredByLink = styled.a.attrs({
  rel: 'noopener noreferrer nofollow',
  target: '_blank',
})`
  width: 100%;
  max-width: 100px;
  margin: 0 0.5rem;
`

const PoweredByImage = styled.img`
  max-height: 40px;
`

const BankDetails = styled.div`
  margin: 0.5rem auto;
`

const SocialLinksContainer = styled.div`
  text-align: center;
  font-size: ${rem('27px')};
  margin-top: ${extraSmallSpacing};
`

const BankDetailDescription = styled.span`
  font-weight: bold;
`

const FooterLink = ({
  route, text, className, ...rest
}) => (
  <li className={className}>
    <Link route={route} passHref {...rest} >
      <a>{text}</a>
    </Link>
  </li>
)

FooterLink.propTypes = {
  route: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
}

FooterLink.defaultProps = {
  className: undefined,
}

const ContactLink = styled(FooterLink)`
  font-weight: inherit !important;
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
  blogText,
  documentsText,
  podcastText,
  copyrightText,
  masifundeYouTubeUrl,
  masifundeFacebookUrl,
  ibanText,
  bicText,
  impressumText,
  datenschutzText,
}) {
  return (
    <FooterSection>
      <footer>

        <div className="row">

          <div className="col-md">
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

          <div className="col-md">
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
                  <ContactLink route={RouteNames.Contact} text={contactText} />
                  <Fragment>
                    <FooterLink route={RouteNames.Blog} params={{ page: '1' }} text={blogText} />
                    <FooterLink route={RouteNames.Documents} text={documentsText} />
                    <FooterLink route={RouteNames.Podcast} text={podcastText} />
                  </Fragment>
                </ul>
              </div>
            </div>
          </div>

        </div>

        <SocialLinksContainer>
          <div className="row">
            <div className="col">
              <SocialLink
                aria-label={T.translate('footer.visitYouTube')}
                href={masifundeYouTubeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutubePlay />
              </SocialLink>
              <SocialLink
                aria-label={T.translate('footer.visitFacebook')}
                href={masifundeFacebookUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </SocialLink>
            </div>
          </div>
        </SocialLinksContainer>

        <InformationSection>
          <div className="row">
            <Text className="col">
              {copyrightText}
            </Text>
          </div>

          <BankDetails>
            <div className="row">
              <Text className="col">
                <BankDetailDescription>IBAN</BankDetailDescription>{' '}{ibanText}
              </Text>
            </div>
            <div className="row">
              <Text className="col">
                <BankDetailDescription>BIC</BankDetailDescription>{' '}{bicText}
              </Text>
            </div>
          </BankDetails>

          <div className="row">
            <Text className="col">
              <Link route={RouteNames.Impressum} passHref>
                <Anchor>{impressumText} </Anchor>
              </Link>
              &
              <Link route={RouteNames.Datenschutz} passHref>
                <Anchor> {datenschutzText}</Anchor>
              </Link>
            </Text>
          </div>
        </InformationSection>

        <PoweredBySection>
          <PoweredByLink href="https://contentful.com/">
            <PoweredByImage
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
  blogText: PropTypes.string.isRequired,
  documentsText: PropTypes.string.isRequired,
  podcastText: PropTypes.string.isRequired,
  copyrightText: PropTypes.string.isRequired,
  masifundeYouTubeUrl: PropTypes.string.isRequired,
  masifundeFacebookUrl: PropTypes.string.isRequired,
  ibanText: PropTypes.string.isRequired,
  bicText: PropTypes.string.isRequired,
  impressumText: PropTypes.string.isRequired,
  datenschutzText: PropTypes.string.isRequired,
}

Footer.propTypes = propTypes

export default Footer
