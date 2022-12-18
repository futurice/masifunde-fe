import T from 'i18n-react'
import { FC } from 'react'
import { FaFacebook, FaYoutube } from 'react-icons/fa'
import styled from 'styled-components'
import { FooterContent } from '../../content/layout-content'
import * as pages from '../../routes/pages'
import { HrefObject } from '../../routes/utils'
import {
  extraSmallSpacing,
  largeSpacing,
  smallSpacing,
} from '../../styling/sizes'
import { footerText, rem } from '../../styling/typography'
import Link from '../Link'
import PageSection from '../shared/PageSection'
import SocialLink from '../shared/SocialLink'

// Helpers
// =======

const Text = styled.div`
  text-align: center;
`

const Anchor = styled.a`
  color: ${(props) => props.theme.pineCone};
  &:visited {
    color: ${(props) => props.theme.pineCone};
  }
`

const FooterSection = styled(PageSection)`
  ${footerText};
  margin-top: ${largeSpacing};

  a,
  a:visited {
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
  display: flex;
  justify-content: center;
  font-size: ${rem('27px')};
  margin-top: ${extraSmallSpacing};
`

const SocialLinksRow = styled.div.attrs({ className: 'col' })`
  display: flex;
  justify-content: center;
`

const BankDetailDescription = styled.span`
  font-weight: bold;
`

type FooterLinkProps = {
  href: string | HrefObject
  text: string
  className?: string
  rel?: string
  target?: string
}

const FooterLink: FC<FooterLinkProps> = ({
  href,
  text,
  className,
  rel,
  target,
}) => (
  <li className={className}>
    <Link href={href} passHref>
      <a rel={rel} target={target}>
        {text}
      </a>
    </Link>
  </li>
)

const ContactLink = styled(FooterLink)`
  font-weight: inherit !important;
`

// Component
// =========

const Footer: FC<FooterContent> = ({
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
  masifundeInstagramUrl,
  ibanText,
  bicText,
  impressumText,
  datenschutzText,
}) => {
  return (
    <FooterSection>
      <footer>
        <div className="row">
          <div className="col-md">
            <div className="row">
              <div className="col">
                <ul className="list-unstyled">
                  <FooterLink href={pages.whatWeDo} text={whatWeDoText} />
                  <FooterLink href={pages.approachSA} text={approachSaText} />
                  <FooterLink href={pages.approachDE} text={approachDeText} />
                  <FooterLink href={pages.impact} text={impactText} />
                </ul>
              </div>
              <div className="col">
                <ul className="list-unstyled">
                  <FooterLink href={pages.whoWeAre} text={whoWeAreText} />
                  <FooterLink href={pages.teamSA} text={teamSaText} />
                  <FooterLink href={pages.teamDE} text={teamDeText} />
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md">
            <div className="row">
              <div className="col">
                <ul className="list-unstyled">
                  <FooterLink
                    href={pages.howToSupport}
                    text={howToSupportText}
                  />
                  <FooterLink href={pages.donate} text={donateText} />
                  <FooterLink
                    href={pages.becomeSponsor}
                    text={becomeSponsorText}
                  />
                  <FooterLink
                    href={pages.becomeVolunteer}
                    text={becomeVolunteerText}
                  />
                  <FooterLink
                    href={pages.becomePartner}
                    text={becomePartnerText}
                  />
                </ul>
              </div>
              <div className="col">
                <ul className="list-unstyled">
                  <ContactLink href={pages.contact} text={contactText} />
                  <>
                    <FooterLink
                      href={{
                        pathname: pages.blog,
                        query: { page: '1' },
                      }}
                      text={blogText}
                    />
                    <FooterLink href={pages.documents} text={documentsText} />
                    <FooterLink
                      href={{
                        pathname: pages.podcast,
                        query: { page: '1' },
                      }}
                      text={podcastText}
                    />
                  </>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <SocialLinksContainer>
          <div className="row">
            <SocialLinksRow>
              <SocialLink
                aria-label={T.translate('footer.visitYouTube') as string}
                href={masifundeYouTubeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </SocialLink>
              <SocialLink
                aria-label={T.translate('footer.visitFacebook') as string}
                href={masifundeFacebookUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </SocialLink>
              <SocialLink
                aria-label={T.translate('footer.visitInstagram') as string}
                href={masifundeInstagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/static/images/Icon-instagram.svg" alt="" />
              </SocialLink>
            </SocialLinksRow>
          </div>
        </SocialLinksContainer>

        <InformationSection>
          <div className="row">
            <Text className="col">{copyrightText}</Text>
          </div>

          <BankDetails>
            <div className="row">
              <Text className="col">
                <BankDetailDescription>IBAN</BankDetailDescription> {ibanText}
              </Text>
            </div>
            <div className="row">
              <Text className="col">
                <BankDetailDescription>BIC</BankDetailDescription> {bicText}
              </Text>
            </div>
          </BankDetails>

          <div className="row">
            <Text className="col">
              <Link href={pages.impressum} passHref>
                <Anchor>{impressumText} </Anchor>
              </Link>
              &
              <Link href={pages.datenschutz} passHref>
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

export default Footer
