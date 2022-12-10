import PropTypes from 'prop-types'
import Banner from '../../../components/Banner'
import CenteredText from '../../../components/CenteredText'
import Hero from '../../../components/Hero'
import { getLayoutProps } from '../../../components/Layout'
import TestimonialList from '../../../components/TestimonialList'
import VolunteerOpeningsList from '../../../components/VolunteerOpeningList'
import Divider from '../../../components/shared/Divider'
import Head from '../../../components/shared/Head'
import PageSection from '../../../components/shared/PageSection'
import TextWithPortraitPhoto from '../../../components/shared/TextWithPortraitPhoto'
import { fetchBecomeAVolunteerPage } from '../../../content/wie-sie-helfen-content'
import teamMemberProps from '../../../propTypes/teamMember'

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
      <TextWithPortraitPhoto
        header={deVolunteerContactHeading}
        text={deVolunteerContactText}
        portraitPhotoTitle={deVolunteerContact.name}
        portraitPhotoSubtitle={deVolunteerContact.responsibilityArea}
        portraitPhotoImageUrl={deVolunteerContact.image.url}
        portraitPhotoEmail={deVolunteerContact.email}
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
      <TextWithPortraitPhoto
        header={saVolunteerOpening1ContactHeading}
        text={saVolunteerOpening1ContactText}
        portraitPhotoTitle={saVolunteerOpening1Contact.name}
        portraitPhotoSubtitle={saVolunteerOpening1Contact.responsibilityArea}
        portraitPhotoImageUrl={saVolunteerOpening1Contact.image.url}
        portraitPhotoEmail={saVolunteerOpening1Contact.email}
      />
    </PageSection>

    <PageSection>
      <h2>{saVolunteerOpening2Heading}</h2>
      <CenteredText source={saVolunteerOpening2Text} />
    </PageSection>

    <PageSection>
      <TextWithPortraitPhoto
        header={saVolunteerOpening2ContactHeading}
        text={saVolunteerOpening2ContactText}
        portraitPhotoTitle={saVolunteerOpening2Contact.name}
        portraitPhotoSubtitle={saVolunteerOpening2Contact.responsibilityArea}
        portraitPhotoImageUrl={saVolunteerOpening2Contact.image.url}
        portraitPhotoEmail={saVolunteerOpening2Contact.email}
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
