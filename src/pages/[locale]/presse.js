import PropTypes from 'prop-types'
import styled from 'styled-components'

import { getLayoutProps } from '../../components/Layout'
import PageSection from '../../components/shared/PageSection'
import CenteredText from '../../components/CenteredText'
import CenteredGrid from '../../components/CenteredGrid'
import Head from '../../components/Head'
import { fetchPressPage } from '../../content/presse-content'
import Banner from '../../components/Banner'
import DocumentsList from '../../components/DocumentsList'
import TextWithTeamMember from '../../components/TextWithTeamMember'
import Divider from '../../components/Divider'
import { smBreakpoint } from '../../styling/breakpoints'
import { subsectionTitleText } from '../../styling/typography'
import { largeSpacing } from '../../styling/sizes'
import teamMemberProps from '../../propTypes/teamMember'
import VideoList from '../../components/VideoList'

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

const Press = ({
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
      <PageSection contained={false}>
        <Heading>{pressKitHeading}</Heading>
        <DocumentsList documents={documentsList1} />
      </PageSection>

      <PageSection contained={false}>
        <Heading>{videosHeading}</Heading>
        <VideoList videos={videosList} />
      </PageSection>

      <PageSection contained={false}>
        <Heading>{pressReleaseHeading}</Heading>
        <DocumentsList documents={documentsList2} expandList />
      </PageSection>
      <ExtendedDivider color="orange" />
    </CenteredGrid>

    <PageSection>
      <TextWithTeamMember
        header={contactTextHeading}
        text={contactText}
        teamMemberTitle={teamMember.name}
        teamMemberSubtitle={teamMember.responsibilityArea}
        teamMember={teamMember}
      />
    </PageSection>

    <Banner
      headline={bannerTitle}
      buttonText={bannerButtonText}
      buttonLink={bannerButtonUrl}
    />
  </>
)

Press.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  introHeading: PropTypes.string.isRequired,
  introText: PropTypes.string.isRequired,
  pressKitHeading: PropTypes.string.isRequired,
  documentsList1: DocumentsList.propTypes.documents.isRequired,
  videosHeading: PropTypes.string.isRequired,
  videosList: VideoList.propTypes.videos.isRequired,
  pressReleaseHeading: PropTypes.string.isRequired,
  documentsList2: DocumentsList.propTypes.documents.isRequired,
  contactTextHeading: PropTypes.string.isRequired,
  contactText: PropTypes.string.isRequired,
  teamMember: PropTypes.shape(teamMemberProps).isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  bannerButtonUrl: PropTypes.string.isRequired,
}

Press.defaultProps = {
  metaDescription: '',
}

export async function getStaticProps({ params: { locale } }) {
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await fetchPressPage(locale)),
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

export default Press
