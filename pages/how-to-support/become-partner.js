import React from 'react'
import PropTypes from 'prop-types'

import LayoutWrapper from '../../components/LayoutWrapper'
import Banner from '../../components/Banner'
import Head from '../../components/Head'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchBecomeAPartnerPage } from '../../api/howToSupport'
import { propTypes as partnerPropTypes } from '../../components/PartnersList/Partner'
import { RouteNames } from '../../routes'
import imagePropTypes from '../../propTypes/image'
import PageSection from '../../components/PageSection'
import PartnersList from '../../components/PartnersList'
import CenteredText from '../../components/CenteredText'
import TextWithTeamMember from '../../components/TextWithTeamMember'

const BecomePartner = ({
  metaTitle,
  metaDescription,
  introTitle,
  introMarkdown,
  partners,
  section1Title,
  section1Markdown,
  teamMember,
  bannerTitle,
  bannerButtonText,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <PageSection>
      <h1>{introTitle}</h1>
      <CenteredText source={introMarkdown} />
      <PartnersList partnersList={partners} />
    </PageSection>

    <PageSection>
      <h2>{section1Title}</h2>
      <TextWithTeamMember
        text={section1Markdown}
        teamMember={teamMember}
      />
    </PageSection>

    <Banner
      headline={bannerTitle}
      buttonText={bannerButtonText}
      buttonLink={RouteNames.Contact}
    />
  </div>
)

BecomePartner.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  introTitle: PropTypes.string.isRequired,
  introMarkdown: PropTypes.string.isRequired,
  section1Title: PropTypes.string.isRequired,
  section1Markdown: PropTypes.string.isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  partners: PropTypes.arrayOf(PropTypes.shape(partnerPropTypes)).isRequired,
  teamMember: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: imagePropTypes.isRequired,
    responsibilityArea: PropTypes.string.isRequired,
  }).isRequired,
}

BecomePartner.defaultProps = {
  metaDescription: undefined,
}

BecomePartner.getInitialProps = async function getInitialProps({ query }) {
  return fetchBecomeAPartnerPage(getLocaleFromQuery(query))
}

export default LayoutWrapper(BecomePartner)
