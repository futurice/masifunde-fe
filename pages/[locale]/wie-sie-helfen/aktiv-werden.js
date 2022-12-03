import PropTypes from 'prop-types'

import { fetchBecomeAVolunteerPage } from '../../../api/howToSupport'
import { getLayoutProps } from '../../../components/Layout'
import Head from '../../../components/Head'
import Hero from '../../../components/Hero'
import Banner from '../../../components/Banner'
import CenteredText from '../../../components/CenteredText'
import PageSection from '../../../components/PageSection'
import TextWithTeamMember from '../../../components/TextWithTeamMember'
import TestimonialList from '../../../components/TestimonialList'
import VolunteerOpeningsList from '../../../components/VolunteerOpeningList'
import teamMemberProps from '../../../propTypes/teamMember'
import Divider from '../../../components/Divider'

const BecomeVolunteer = ({
  metaTitle,
  metaDescription,
  introTitle,
  introMarkdown,

  deTestimonialsHeading,
  deTestimonials,
  deVolunteerOpeningsHeading,
  deVolunteerOpenings,
  deVolunteerContactHeading,
  deVolunteerContactText,
  deVolunteerContact,

  saVolunteerOpening1Heading,
  saVolunteerOpening1Text,
  saVolunteerOpening1ContactHeading,
  saVolunteerOpening1ContactText,
  saVolunteerOpening1Contact,
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
      imageUrl="/static/images/hero/hero-small-choir.jpg"
      heroSize="small"
      backgroundPositionX="55%"
    />

    <PageSection>
      <h1>{introTitle}</h1>
      <CenteredText source={introMarkdown} />
    </PageSection>

    <PageSection>
      <h2>{deTestimonialsHeading}</h2>
      <TestimonialList testimonials={deTestimonials} />
    </PageSection>

    <PageSection>
      <h2>{deVolunteerOpeningsHeading}</h2>
      <VolunteerOpeningsList volunteerOpenings={deVolunteerOpenings} />
    </PageSection>

    <PageSection>
      <TextWithTeamMember
        header={deVolunteerContactHeading}
        text={deVolunteerContactText}
        teamMember={deVolunteerContact}
        teamMemberTitle={deVolunteerContact.name}
        teamMemberSubtitle={deVolunteerContact.responsibilityArea}
      />
    </PageSection>

    <PageSection>
      <Divider color="orange" />
    </PageSection>

    <PageSection>
      <h2>{saVolunteerOpening1Heading}</h2>
      <CenteredText source={saVolunteerOpening1Text} />
    </PageSection>

    <PageSection>
      <TextWithTeamMember
        header={saVolunteerOpening1ContactHeading}
        text={saVolunteerOpening1ContactText}
        teamMember={saVolunteerOpening1Contact}
        teamMemberTitle={saVolunteerOpening1Contact.name}
        teamMemberSubtitle={saVolunteerOpening1Contact.responsibilityArea}
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

BecomeVolunteer.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  introTitle: PropTypes.string.isRequired,
  introMarkdown: PropTypes.string.isRequired,

  deVolunteerContactHeading: PropTypes.string.isRequired,
  deVolunteerContactText: PropTypes.string.isRequired,
  deVolunteerContact: PropTypes.shape(teamMemberProps).isRequired,
  deVolunteerOpeningsHeading: PropTypes.string.isRequired,
  deTestimonialsHeading: PropTypes.string.isRequired,
  deTestimonials: TestimonialList.propTypes.testimonials.isRequired,
  deVolunteerOpenings:
    VolunteerOpeningsList.propTypes.volunteerOpenings.isRequired,

  saVolunteerOpening1Heading: PropTypes.string.isRequired,
  saVolunteerOpening1Text: PropTypes.string.isRequired,
  saVolunteerOpening1ContactHeading: PropTypes.string.isRequired,
  saVolunteerOpening1ContactText: PropTypes.string.isRequired,
  saVolunteerOpening1Contact: PropTypes.shape(teamMemberProps).isRequired,
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

export async function getStaticProps({ params: { locale } }) {
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await fetchBecomeAVolunteerPage(locale)),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { locale: 'de' },
      },
      {
        params: { locale: 'en' },
      },
    ],
    fallback: false,
  }
}

export default BecomeVolunteer
