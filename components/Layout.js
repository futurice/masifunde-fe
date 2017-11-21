import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { injectGlobal } from 'styled-components'

import Header, { propTypes as headerPropTypes } from './Header'
import Footer, { propTypes as footerPropTypes } from './Footer'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  body {
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    color: #333333;
  }
  
  h1, h2 {
    text-align: center;
    line-height: 1.36;
  }
  
  h1 {
    margin-bottom: 2.2rem;
  }
  
  h2 {
    margin-bottom: 0.6rem;
  }
`

function createTitle(title) {
  if (title === '') {
    return 'Masifunde'
  }

  return `${title} - Masifunde`
}

const Layout = ({
  title, metaDescription, headerData, children, footerData,
}) => (
  <div>
    <Head>
      <title>{createTitle(title)}</title>
      {/* If the content is undefined then it doesn't render the description */}
      <meta name="description" content={metaDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0-beta.2/dist/css/bootstrap.min.css"
      />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700" />
    </Head>
    <Header
      whatWeDoText={headerData.whatWeDoText}
      whoWeAreText={headerData.whoWeAreText}
      howToSupportText={headerData.howToSupportText}
      donateText={headerData.donateText}
    />
    {children}
    <Footer
      whatWeDoText={footerData.whatWeDoText}
      approachSaText={footerData.approachSaText}
      approachDeText={footerData.approachDeText}
      impactText={footerData.impactText}
      whoWeAreText={footerData.whoWeAreText}
      teamSaText={footerData.teamSaText}
      teamDeText={footerData.teamDeText}
      partnersText={footerData.partnersText}
      howToSupportText={footerData.howToSupportText}
      donateText={footerData.donateText}
      becomeSponsorText={footerData.becomeSponsorText}
      becomeVolunteerText={footerData.becomeVolunteerText}
      becomePartnerText={footerData.becomePartnerText}
      contactText={footerData.contactText}
      copyrightText={footerData.copyrightText}
    />
  </div>
)

Layout.propTypes = {
  title: PropTypes.string,
  metaDescription: PropTypes.string,
  children: PropTypes.node.isRequired,
  headerData: PropTypes.shape(headerPropTypes),
  footerData: PropTypes.shape(footerPropTypes),
}

Layout.defaultProps = {
  title: '',
  metaDescription: undefined,
  headerData: {
    whatWeDoText: 'Was wir machen',
    whoWeAreText: 'Who we are',
    howToSupportText: 'Wie Sie helfen',
    donateText: 'Spenden',
  },
  footerData: {
    whatWeDoText: 'Was wir machen',
    approachSaText: 'Approach South Africa',
    approachDeText: 'Approach Deutschland',
    impactText: 'Impact',
    whoWeAreText: 'Wer sind wir',
    teamSaText: 'Team South Africa',
    teamDeText: 'Team Deutschland',
    partnersText: 'Partners',
    howToSupportText: 'Wie Sie helfen',
    donateText: 'Spenden',
    becomeSponsorText: 'Sponsor',
    becomeVolunteerText: 'Volunteer',
    becomePartnerText: 'Open Partner',
    contactText: 'Kontakt',
    copyrightText: '© 2017 Masifunde Bildungsförderung e.V.',
  },
}

export default Layout
