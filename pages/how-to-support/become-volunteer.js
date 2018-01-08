import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { getLocaleFromQuery } from '../../utils/locale'
import { fetchBecomeAVolunteerPage } from '../../api/howToSupport'
import LayoutWrapper from '../../components/LayoutWrapper'
import Head from '../../components/Head'
import Hero from '../../components/Hero'
import Banner from '../../components/Banner'
import Markdown from '../../components/Markdown'
import RegionalGroups from '../../components/RegionalGroups'
import { RouteNames } from '../../routes'
import IntroText from '../../components/IntroText'
import PageSection from '../../components/PageSection'
import TextWithTeamMember from '../../components/TextWithTeamMember'
import { smallFontSize } from '../../styling/typography'

const VolunteerOpeningsContainer = styled.div`
  font-size: ${smallFontSize};
`

const BecomeVolunteer = ({
  metaTitle,
  metaDescription,
  introTitle,
  section1Markdown,
  section1TeamMember,
  section2Title,
  volunteerOpenings,
  section3Title,
  section3Markdown,
  regionalGroups,
  bannerTitle,
  bannerButtonText,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <Hero
      imageUrl="/static/images/hero/hero-small-choir.jpg"
      heroSize="small"
      backgroundPositionX="55%"
    />

    <PageSection>
      <h1>{introTitle}</h1>
      <TextWithTeamMember
        text={section1Markdown}
        teamMember={section1TeamMember}
      />
    </PageSection>

    <PageSection>
      <h2>{section2Title}</h2>
      <VolunteerOpeningsContainer className="row">
        {volunteerOpenings.map(opening => (
          <div className="col-md-4" key={opening.description}>
            <h3>{opening.title}</h3>
            <Markdown source={opening.description} />
          </div>
        ))}
      </VolunteerOpeningsContainer>
    </PageSection>

    <PageSection>
      <h2>{section3Title}</h2>
      <IntroText source={section3Markdown} />
      <RegionalGroups regionalGroups={regionalGroups} />
    </PageSection>

    <Banner
      headline={bannerTitle}
      buttonText={bannerButtonText}
      buttonLink={RouteNames.Contact}
    />
  </div>
)

BecomeVolunteer.getInitialProps = async function getInitialProps({ query }) {
  return fetchBecomeAVolunteerPage(getLocaleFromQuery(query))
}

BecomeVolunteer.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  introTitle: PropTypes.string.isRequired,
  section1Markdown: PropTypes.string.isRequired,
  section1TeamMember: PropTypes.shape().isRequired,
  section2Title: PropTypes.string.isRequired,
  volunteerOpenings: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  section3Title: PropTypes.string.isRequired,
  section3Markdown: PropTypes.string.isRequired,
  regionalGroups: PropTypes.shape().isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
}

BecomeVolunteer.defaultProps = {
  metaDescription: undefined,
}

export default LayoutWrapper(BecomeVolunteer)

