import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import withLayout from '../../components/withLayout'
import PageSection from '../../components/PageSection'
import CenteredText from '../../components/CenteredText'
import ContainedGrid from '../../components/ContainedGrid'
import Head from '../../components/Head'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchPressPage } from '../../api/press'
import Banner from '../../components/Banner'
import DocumentsList from '../../components/DocumentsList'
import TextWithTeamMember from '../../components/TextWithTeamMember'
import Divider from '../../components/Divider'
import { smBreakpoint } from '../../styling/breakpoints'
import { subsectionTitleText } from '../../styling/typography'
import { largeSpacing } from '../../styling/sizes'
import teamMemberProps from '../../propTypes/teamMember'


const Heading = styled.h2`
  ${subsectionTitleText};
  text-align: center;

  @media (min-width: ${smBreakpoint}) {
    text-align: left;
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
  documentsList1,
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

    <ContainedGrid>
      <PageSection contained={false}>
        <Heading>{section1heading}</Heading>
        <DocumentsList documents={documentsList1} />
      </PageSection>

      <PageSection contained={false}>
        <Heading>{section2heading}</Heading>
        <DocumentsList documents={documentsList2} expandList />
      </PageSection>
      <ExtendedDivider color="orange" />
    </ContainedGrid>

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
  documentsList1: DocumentsList.propTypes.documents.isRequired,
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
