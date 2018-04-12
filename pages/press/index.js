import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import withLayout from '../../components/withLayout'
import PageSection from '../../components/PageSection'
import CenteredText from '../../components/CenteredText'
import CenteredGrid from '../../components/CenteredGrid'
import Head from '../../components/Head'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchPressPage } from '../../api/press'
import Banner from '../../components/Banner'
import DocumentsList from '../../components/DocumentsList'
import TextWithTeamMember from '../../components/TextWithTeamMember'
import Divider from '../../components/Divider'
import { smBreakpoint } from '../../styling/breakpoints'
import { subsectionTitleText, titleText, rem } from '../../styling/typography'
import { largeSpacing } from '../../styling/sizes'
import teamMemberProps from '../../propTypes/teamMember'
import VideoList from '../../components/VideoList'
import theme from '../../styling/theme'


const Heading = styled.h2`
  ${subsectionTitleText};
  text-align: center;

  @media (min-width: ${smBreakpoint}) {
    text-align: left;
  }
`

const SubHeading = styled.h3`
  ${titleText};
  color: ${theme.pineCone};
  font-size: ${rem('20px')};
  font-weight: 500;
  line-height: 1.39;
  text-align: center;

  @media (min-width: ${smBreakpoint}) {
    text-align: left;
    font-size: ${rem('22px')};
  }
`

const ExtendedDivider = Divider.extend`
  margin-top: ${largeSpacing} !important;
`

const Press = ({
  metaTitle,
  metaDescription,
  introHeading,
  introText,
  section1heading,
  documentsSubHeading,
  documentsList1,
  videosSubHeading,
  videosList,
  section2heading,
  documentsList2,
  teamMember,
  contactTextHeading,
  contactText,
  bannerTitle,
  bannerButtonText,
  bannerButtonUrl,
}) => (
  <Fragment>
    <Head title={metaTitle} description={metaDescription} />
    <PageSection>
      <h1>{introHeading}</h1>
      <CenteredText source={introText} />
    </PageSection>

    <CenteredGrid>
      <PageSection contained={false}>
        <Heading>{section1heading}</Heading>
        <SubHeading>{documentsSubHeading}</SubHeading>
        <DocumentsList documents={documentsList1} />
      </PageSection>
      <PageSection contained={false}>
        <SubHeading>{videosSubHeading}</SubHeading>
        <VideoList videos={videosList} />
      </PageSection>

      <PageSection contained={false}>
        <Heading>{section2heading}</Heading>
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
  </Fragment>
)

Press.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  introHeading: PropTypes.string.isRequired,
  introText: PropTypes.string.isRequired,
  section1heading: PropTypes.string.isRequired,
  documentsSubHeading: PropTypes.string.isRequired,
  documentsList1: DocumentsList.propTypes.documents.isRequired,
  videosSubHeading: PropTypes.string.isRequired,
  videosList: VideoList.propTypes.videos.isRequired,
  section2heading: PropTypes.string.isRequired,
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

Press.getInitialProps = async function initialProps({ query }) {
  return fetchPressPage(getLocaleFromQuery(query))
}

export default withLayout(Press)
