import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import styled from 'styled-components'
import Banner from '../../../components/Banner'
import Hero from '../../../components/Hero'
import {
  LayoutPageProps,
  getLayoutProps,
} from '../../../components/layout/Layout'
import Button, { Props as ButtonProps } from '../../../components/shared/Button'
import CenteredText from '../../../components/shared/CenteredText'
import Divider from '../../../components/shared/Divider'
import Head from '../../../components/shared/Head'
import Link from '../../../components/shared/Link'
import Markdown from '../../../components/shared/Markdown'
import PageSection from '../../../components/shared/PageSection'
import RoundedImage from '../../../components/shared/RoundedImage'
import {
  HowToHelpContent,
  getHowToHelpContent,
} from '../../../content/wie-sie-helfen-content'
import * as pages from '../../../routes/pages'
import { smBreakpoint } from '../../../styling/breakpoints'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps & HowToHelpContent

// Helpers
// =======

const SectionContainer = styled(PageSection)`
  display: flex;
`

const SectionImageContainer = styled.a`
  display: none;

  @media (min-width: ${smBreakpoint}) {
    display: block;
  }
`

const SectionImage = styled(RoundedImage)`
  max-width: 100%;
  max-height: 240px;
`

type SectionProps = {
  imageUrl: string
  imageTitle: string
  title: string
  markdown: string
  buttonText: string
  buttonVariant: ButtonProps['variant']
  buttonLink: string
}

const Section: FC<SectionProps> = ({
  imageUrl,
  imageTitle,
  title,
  markdown,
  buttonText,
  buttonVariant: buttonType,
  buttonLink,
}) => (
  <SectionContainer>
    <Link href={buttonLink} passHref>
      <SectionImageContainer className="col-md-4 offset-lg-1 col-lg-3">
        <SectionImage src={imageUrl} alt={imageTitle} />
      </SectionImageContainer>
    </Link>
    <div className="col-md-8 col-lg-7">
      <h3>{title}</h3>
      <Markdown source={markdown} />
      <Link href={buttonLink} passHref>
        <Button variant={buttonType}>{buttonText}</Button>
      </Link>
    </div>
  </SectionContainer>
)

// Component
// =========

const HowToHelp: FC<Props> = ({
  metaTitle,
  metaDescription,
  heroTitle,
  introHeading,
  introMarkdown,
  section1Image,
  section1Title,
  section1Markdown,
  section1ButtonText,
  section2Image,
  section2Title,
  section2Markdown,
  section2ButtonText,
  section3Image,
  section3Title,
  section3Markdown,
  section3ButtonText,
  section4Image,
  section4Title,
  section4Markdown,
  section4ButtonText,
  campaign,
}) => (
  <>
    <Head title={metaTitle} description={metaDescription} />

    <Hero
      backgroundPositionX="80%"
      headline={heroTitle}
      imageUrl="/static/images/hero/hero-pool.jpg"
      headlinePlacement="bottom"
      headlineShadow
    />

    <PageSection>
      <h1>{introHeading}</h1>
      <CenteredText source={introMarkdown} />
    </PageSection>

    <Section
      buttonText={section1ButtonText}
      title={section1Title}
      markdown={section1Markdown}
      imageUrl={section1Image.file.url}
      imageTitle={section1Image.title}
      buttonVariant="primary"
      buttonLink={pages.donate}
    />

    <Section
      buttonText={section2ButtonText}
      title={section2Title}
      markdown={section2Markdown}
      imageUrl={section2Image.file.url}
      imageTitle={section2Image.title}
      buttonVariant="secondary"
      buttonLink={pages.becomeSponsor}
    />

    <PageSection>
      <Divider color="orange" />
    </PageSection>

    <Section
      buttonText={section3ButtonText}
      title={section3Title}
      markdown={section3Markdown}
      imageUrl={section3Image.file.url}
      imageTitle={section3Image.title}
      buttonVariant="secondary"
      buttonLink={pages.becomeVolunteer}
    />

    <Section
      buttonText={section4ButtonText}
      title={section4Title}
      markdown={section4Markdown}
      imageUrl={section4Image.file.url}
      imageTitle={section4Image.title}
      buttonVariant="secondary"
      buttonLink={pages.becomePartner}
    />

    <PageSection>
      {campaign?.isActive && (
        <Banner
          subHeadline={campaign.bannerSmallTitle}
          headline={campaign.introHeading}
          description={campaign.introMarkdown}
          image={campaign.imageList[0]?.file.url}
          buttonLink={pages.campaign}
          buttonText={campaign.bannerButtonText}
        />
      )}
    </PageSection>
  </>
)

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { locale } = ctx.params!
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await getHowToHelpContent(locale)),
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

export default HowToHelp
