import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import Banner from '../../../components/Banner'
import Hero from '../../../components/Hero'
import {
  LayoutPageProps,
  getLayoutProps,
} from '../../../components/layout/Layout'
import CenteredText from '../../../components/shared/CenteredText'
import Divider from '../../../components/shared/Divider'
import Head from '../../../components/shared/Head'
import PageSection from '../../../components/shared/PageSection'
import TextWithPortraitPhoto from '../../../components/shared/TextWithPortraitPhoto'
import TestimonialList from '../../../components/wer-wir-sind/TestimonialList'
import VolunteerOpeningsList from '../../../components/wie-sie-helfen/VolunteerOpeningList'
import {
  BecomeVolunteerContent,
  getBecomeVolunteerContent,
} from '../../../content/wie-sie-helfen-content'

type Params = {
  locale: string
}

type Props = LayoutPageProps & BecomeVolunteerContent

const BecomeVolunteer: FC<Props> = ({
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
        portraitPhotoImageUrl={deVolunteerContact.profileImage.file.url}
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
        portraitPhotoImageUrl={saVolunteerOpening1Contact.profileImage.file.url}
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
        portraitPhotoImageUrl={saVolunteerOpening2Contact.profileImage.file.url}
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

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { locale } = ctx.params!
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await getBecomeVolunteerContent(locale)),
    },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = () => {
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
