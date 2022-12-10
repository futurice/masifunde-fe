import styled from 'styled-components'
import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import DocumentsList from '../../components/dokumente/DocumentsList'
import { getLayoutProps, LayoutPageProps } from '../../components/Layout'
import PageSection from '../../components/shared/PageSection'
import CenteredGrid from '../../components/CenteredGrid'
import CenteredText from '../../components/CenteredText'
import Divider from '../../components/shared/Divider'
import Banner from '../../components/Banner'
import {
  DocumentsContent,
  getDocumentsContent,
} from '../../content/dokumente-content'
import Head from '../../components/shared/Head'
import { smBreakpoint } from '../../styling/breakpoints'
import { subsectionTitleText } from '../../styling/typography'
import { largeSpacing } from '../../styling/sizes'
import TextWithPortraitPhoto from '../../components/shared/TextWithPortraitPhoto'
import VideoList from '../../components/VideoList'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps & DocumentsContent

// Helpers
// =======

const Heading = styled.h2`
  ${subsectionTitleText};
  text-align: center;
  @media (min-width: ${smBreakpoint}) {
    text-align: left;
  }
`

const TeamMemberContainer = styled.div`
  display: flex;
  justify-content: center;
  @media (min-width: ${smBreakpoint}) {
    display: block;
  }
`

const ExtendedDivider = styled(Divider)`
  margin-top: ${largeSpacing} !important;
`

// Component
// =========

const Documents: FC<Props> = ({
  metaDescription,
  metaTitle,
  introHeading,
  introMarkdown,
  section1heading,
  documentsList1,
  section2heading,
  documentsList2,
  section3heading,
  documentsList3,
  bannerTitle,
  contactTextHeading,
  contactText,
  teamMember,
  bannerButtonText,
  bannerButtonUrl,
  videosHeading,
  videosList,
  pressKitHeading,
  pressKitList,
  pressReleaseHeading,
  pressReleaseList,
}) => (
  <>
    <Head title={metaTitle} description={metaDescription} />

    <PageSection>
      <h1>{introHeading}</h1>
      <CenteredText source={introMarkdown} />
    </PageSection>

    <CenteredGrid>
      {section1heading && (
        <PageSection contained={false}>
          <Heading>{section1heading}</Heading>
          <DocumentsList documents={documentsList1} />
        </PageSection>
      )}

      {section2heading && (
        <PageSection contained={false}>
          <Heading>{section2heading}</Heading>
          <DocumentsList documents={documentsList2} />
        </PageSection>
      )}

      {section3heading && (
        <PageSection contained={false}>
          <Heading>{section3heading}</Heading>
          <DocumentsList documents={documentsList3} expandList />
        </PageSection>
      )}

      {pressKitHeading && (
        <PageSection contained={false}>
          <Heading>{pressKitHeading}</Heading>
          <DocumentsList documents={pressKitList} />
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
          <DocumentsList documents={pressReleaseList} expandList />
        </PageSection>
      )}
    </CenteredGrid>

    <ExtendedDivider color="orange" />
    <PageSection>
      <TeamMemberContainer>
        <TextWithPortraitPhoto
          header={contactTextHeading}
          text={contactText}
          portraitPhotoTitle={teamMember.name}
          portraitPhotoSubtitle={teamMember.responsibilityArea}
          portraitPhotoImageUrl={teamMember.profileImage.file.url}
          portraitPhotoEmail={teamMember.email}
        />
      </TeamMemberContainer>
    </PageSection>

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
      ...(await getDocumentsContent(locale)),
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

export default Documents
