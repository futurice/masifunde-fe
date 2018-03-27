import React, { Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import withLayout from '../../components/withLayout'
import DocumentsList from '../../components/DocumentsList'
import PageSection from '../../components/PageSection'
import ContainedGrid from '../../components/ContainedGrid'
import CenteredText from '../../components/CenteredText'
import Divider from '../../components/Divider'
import TeamMember from '../../components/TeamMember'
import Banner from '../../components/Banner'
import { fetchDocumentPage } from '../../api/document'
import { getLocaleFromQuery } from '../../utils/locale'
import Head from '../../components/Head'
import { smBreakpoint } from '../../styling/breakpoints'
import teamMemberProps from '../../propTypes/teamMember'
import { subsectionTitleText } from '../../styling/typography'
import { largeSpacing } from '../../styling/sizes'

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

const ExtendedDivider = Divider.extend`
  margin-top: ${largeSpacing} !important;
`

const Documents = ({
  metaDescription,
  metaTitle,
  section1heading,
  documentsList1,
  section2heading,
  documentsList2,
  section3heading,
  documentsList3,
  bannerTitle,
  teamMember,
  bannerButtonText,
  bannerButtonUrl,
}) => (
  <Fragment>
    <Head title={metaTitle} description={metaDescription} />

    <PageSection>
      <h1>Test</h1>
      <CenteredText source="centered Text" />
    </PageSection>

    <ContainedGrid>
      <PageSection contained={false}>
        <Heading>{section1heading}</Heading>
        <DocumentsList documents={documentsList1} />
      </PageSection>

      <PageSection contained={false}>
        <Heading>{section2heading}</Heading>
        <DocumentsList documents={documentsList2} />
      </PageSection>


      <PageSection contained={false}>
        <Heading>{section3heading}</Heading>
        <DocumentsList documents={documentsList3} expandList />

        <ExtendedDivider color="orange" />
      </PageSection>

      <PageSection contained={false}>
        <TeamMemberContainer>
          <TeamMember
            imageUrl={teamMember.image.url}
            title={teamMember.name}
            email={teamMember.email}
          />
        </TeamMemberContainer>
      </PageSection>
    </ContainedGrid>


    <Banner
      headline={bannerTitle}
      buttonText={bannerButtonText}
      buttonLink={bannerButtonUrl}
    />

  </Fragment>
)

Documents.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  bannerButtonUrl: PropTypes.string.isRequired,
  section1heading: PropTypes.string.isRequired,
  documentsList1: DocumentsList.propTypes.documents.isRequired,
  section2heading: PropTypes.string.isRequired,
  documentsList2: DocumentsList.propTypes.documents.isRequired,
  section3heading: PropTypes.string.isRequired,
  documentsList3: DocumentsList.propTypes.documents.isRequired,
  teamMember: PropTypes.shape(teamMemberProps).isRequired,
}

Documents.defaultProps = {
  metaDescription: '',
}

Documents.getInitialProps = async function initialProps({ query }) {
  return fetchDocumentPage(getLocaleFromQuery(query))
}

export default withLayout(Documents)
