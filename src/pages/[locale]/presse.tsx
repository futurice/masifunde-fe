import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import styled from 'styled-components'
import Banner from '../../components/Banner'
import CenteredGrid from '../../components/CenteredGrid'
import CenteredText from '../../components/CenteredText'
import { LayoutPageProps, getLayoutProps } from '../../components/Layout'
import VideoList from '../../components/VideoList'
import DocumentsList from '../../components/dokumente/DocumentsList'
import Divider from '../../components/shared/Divider'
import Head from '../../components/shared/Head'
import PageSection from '../../components/shared/PageSection'
import TextWithPortraitPhoto from '../../components/shared/TextWithPortraitPhoto'
import { PressContent, getPressContent } from '../../content/presse-content'
import { smBreakpoint } from '../../styling/breakpoints'
import { largeSpacing } from '../../styling/sizes'
import { subsectionTitleText } from '../../styling/typography'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps & PressContent

// Helpers
// =======

const Heading = styled.h2`
  ${subsectionTitleText};
  text-align: center;

  @media (min-width: ${smBreakpoint}) {
    text-align: left;
  }
`

const ExtendedDivider = styled(Divider)`
  margin-top: ${largeSpacing} !important;
`

// Component
// =========

const Press: FC<Props> = ({
  metaTitle,
  metaDescription,
  introHeading,
  introText,
  pressKitHeading,
  documentsList1,
  videosHeading,
  videosList,
  pressReleaseHeading,
  documentsList2,
  teamMember,
  contactTextHeading,
  contactText,
  bannerTitle,
  bannerButtonText,
  bannerButtonUrl,
}) => (
  <>
    <Head title={metaTitle} description={metaDescription} />

    <PageSection>
      <h1>{introHeading}</h1>
      <CenteredText source={introText} />
    </PageSection>

    <CenteredGrid>
      {pressKitHeading && (
        <PageSection contained={false}>
          <Heading>{pressKitHeading}</Heading>
          <DocumentsList documents={documentsList1} />
        </PageSection>
      )}

      {videosHeading && (
        <PageSection contained={false}>
          <Heading>{videosHeading}</Heading>
          <VideoList videos={videosList} />
        </PageSection>
      )}

      {pressReleaseHeading && (
        <PageSection contained={false}>
          <Heading>{pressReleaseHeading}</Heading>
          <DocumentsList documents={documentsList2} expandList />
        </PageSection>
      )}

      <ExtendedDivider color="orange" />
    </CenteredGrid>

    {contactTextHeading && (
      <PageSection>
        <TextWithPortraitPhoto
          header={contactTextHeading}
          text={contactText ?? ''}
          portraitPhotoTitle={teamMember.name}
          portraitPhotoSubtitle={teamMember.responsibilityArea}
          portraitPhotoImageUrl={teamMember.profileImage.file.url}
          portraitPhotoEmail={teamMember.email}
        />
      </PageSection>
    )}

    <Banner
      headline={bannerTitle}
      buttonText={bannerButtonText}
      buttonLink={bannerButtonUrl}
    />
  </>
)

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { locale } = ctx.params!
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await getPressContent(locale)),
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

export default Press
