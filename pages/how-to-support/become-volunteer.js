import React from 'react'
import PropTypes from 'prop-types'

import { getLocaleFromQuery } from '../../utils/locale'
import { fetchBecomeAVolunteerPage } from '../../api/howToSupport'
import withLayout from '../../components/withLayout'
import Head from '../../components/Head'
import Hero from '../../components/Hero'
import Banner from '../../components/Banner'
import CenteredText from '../../components/CenteredText'
import PageSection from '../../components/PageSection'
import TextWithTeamMember from '../../components/TextWithTeamMember'
import TestimonialList from '../../components/TestimonialList'
import VolunteerOpeningsList from '../../components/VolunteerOpeningList'
import teamMemberProps from '../../propTypes/teamMember'
import Divider from '../../components/Divider'

const BecomeVolunteer = ({
  metaTitle,
  metaDescription,
  introTitle,
  introMarkdown,
  section1Title,
  section1Markdown,
  section1TeamMember,
  section1ReferenceList,
  section2Title,
  section3Title,
  volunteerOpenings,
  section4Title,
  section4Markdown,
  section6Title,
  section6TeamMember,
  section6Markdown,
  saVolunteerOpening2Heading,
  saVolunteerOpening2Text,
  saVolunteerOpening2ContactHeading,
  saVolunteerOpening2ContactText,
  saVolunteerOpening2Contact,
  bannerTitle,
  bannerButtonText,
  bannerButtonUrl,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <Hero
      imageUrl="/static/images/hero/hero-small-aktiv-werden.jpg"
      heroSize="small"
      backgroundPositionX="55%"
    />

    <PageSection>
      <h1>{introTitle}</h1>
      <CenteredText source={introMarkdown} />
    </PageSection>

    <PageSection>
      <h2>{section3Title}</h2>
      <TestimonialList testimonials={section1ReferenceList} />
    </PageSection>

    <PageSection>
      <h2>{section2Title}</h2>
      <VolunteerOpeningsList volunteerOpenings={volunteerOpenings} />
    </PageSection>

    <PageSection>
      <TextWithTeamMember
        header={section1Title}
        text={section1Markdown}
        teamMember={section1TeamMember}
        teamMemberTitle={section1TeamMember.name}
        teamMemberSubtitle={section1TeamMember.responsibilityArea}
      />
    </PageSection>

    <PageSection>
      <Divider color="orange" />
    </PageSection>

    <PageSection>
      <h2>{section4Title}</h2>
      <CenteredText source={section4Markdown} />
    </PageSection>

    <PageSection>
      <TextWithTeamMember
        header={section6Title}
        text={section6Markdown}
        teamMember={section6TeamMember}
        teamMemberTitle={section6TeamMember.name}
        teamMemberSubtitle={section6TeamMember.responsibilityArea}
      />
    </PageSection>

    <PageSection>
      <h2>{saVolunteerOpening2Heading}</h2>
      <CenteredText source={saVolunteerOpening2Text} />
    </PageSection>

    <PageSection>
      <TextWithTeamMember
        header={saVolunteerOpening2ContactHeading}
        text={saVolunteerOpening2ContactText}
        teamMember={saVolunteerOpening2Contact}
        teamMemberTitle={saVolunteerOpening2Contact.name}
        teamMemberSubtitle={saVolunteerOpening2Contact.responsibilityArea}
      />
    </PageSection>

    <Banner
      headline={bannerTitle}
      buttonText={bannerButtonText}
      buttonLink={bannerButtonUrl}
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
  introMarkdown: PropTypes.string.isRequired,
  section1Title: PropTypes.string.isRequired,
  section1Markdown: PropTypes.string.isRequired,
  section1TeamMember: PropTypes.shape(teamMemberProps).isRequired,
  section2Title: PropTypes.string.isRequired,
  section3Title: PropTypes.string.isRequired,
  volunteerOpenings: VolunteerOpeningsList.propTypes.volunteerOpenings.isRequired,
  section4Title: PropTypes.string.isRequired,
  section4Markdown: PropTypes.string.isRequired,
  section6Title: PropTypes.string.isRequired,
  section6TeamMember: PropTypes.shape(teamMemberProps).isRequired,
  section6Markdown: PropTypes.string.isRequired,
  section1ReferenceList: TestimonialList.propTypes.testimonials.isRequired,
  saVolunteerOpening2Heading: PropTypes.string.isRequired,
  saVolunteerOpening2Text: PropTypes.string.isRequired,
  saVolunteerOpening2ContactHeading: PropTypes.string.isRequired,
  saVolunteerOpening2ContactText: PropTypes.string.isRequired,
  saVolunteerOpening2Contact: PropTypes.shape(teamMemberProps).isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  bannerButtonUrl: PropTypes.string.isRequired,
}

BecomeVolunteer.defaultProps = {
  metaDescription: undefined,
}

export default withLayout(BecomeVolunteer)
