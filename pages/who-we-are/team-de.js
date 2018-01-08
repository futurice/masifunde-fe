import React from 'react'
import PropTypes from 'prop-types'

import { fetchTeamDePage } from '../../api/whoWeAre'
import { getLocaleFromQuery } from '../../utils/locale'
import LayoutWrapper from '../../components/LayoutWrapper'
import Banner from '../../components/Banner'
import TeamMemberList from '../../components/TeamMemberList'
import Head from '../../components/Head'
import RegionalGroups from '../../components/RegionalGroups'
import imagePropTypes from '../../propTypes/image'
import { RouteNames } from '../../routes'
import PageSection from '../../components/PageSection'
import CenteredText from '../../components/CenteredText'

const TeamDe = ({
  title,
  pageDescription,
  bannerTitle,
  bannerButtonText,
  sectionOneTitle,
  sectionOneText,
  sectionTwoTitle,
  regionalGroups,
  teamMembers,
  metaTitle,
  metaDescription,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <PageSection>
      <h1>{title}</h1>
      <CenteredText source={pageDescription} />
    </PageSection>

    <PageSection>
      <h2>{sectionOneTitle}</h2>
      <CenteredText source={sectionOneText} />
      <RegionalGroups regionalGroups={regionalGroups} />
    </PageSection>

    <PageSection>
      <h2>{sectionTwoTitle}</h2>
      <TeamMemberList
        members={teamMembers}
        title={member => member.name}
        subtitle={member => member.responsibilityArea}
        imageUrl={member => member.image.url}
      />
    </PageSection>

    <Banner
      buttonLink={RouteNames.BecomeVolunteer}
      buttonText={bannerButtonText}
      headline={bannerTitle}
    />
  </div>
)

TeamDe.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  title: PropTypes.string.isRequired,
  pageDescription: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  bannerTitle: PropTypes.string.isRequired,
  sectionOneTitle: PropTypes.string.isRequired,
  sectionOneText: PropTypes.string.isRequired,
  sectionTwoTitle: PropTypes.string.isRequired,
  regionalGroups: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: imagePropTypes.isRequired,
    regions: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      contactPerson: PropTypes.string,
      email: PropTypes.string,
    }).isRequired).isRequired,
  }).isRequired,
  teamMembers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: imagePropTypes.isRequired,
    responsibilityArea: PropTypes.string.isRequired,
  }).isRequired).isRequired,
}

TeamDe.defaultProps = {
  metaDescription: undefined,
}

TeamDe.getInitialProps = async function initialProps({ query }) {
  return fetchTeamDePage(getLocaleFromQuery(query))
}

export default LayoutWrapper(TeamDe)
