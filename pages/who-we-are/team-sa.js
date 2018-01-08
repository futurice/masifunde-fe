import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Head from '../../components/Head'
import Banner from '../../components/Banner'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchTeamSaPage } from '../../api/whoWeAre'
import LayoutWrapper from '../../components/LayoutWrapper'
import imagePropTypes from '../../propTypes/image'
import { RouteNames } from '../../routes'
import PageSection from '../../components/PageSection'
import CenteredText from '../../components/CenteredText'
import TeamMemberList from '../../components/TeamMemberList'

const Image = styled.img`
  width: 100%;
`

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`

const TeamSa = ({
  metaTitle,
  metaDescription,
  introTitle,
  introMarkdown,
  introImage,
  teamMembers,
  bannerButtonText,
  bannerTitle,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <PageSection>
      <h1>{introTitle}</h1>
      <CenteredText source={introMarkdown} />
      <ImageContainer>
        <Image className="col-sm-7 col-md-6 col-lg-5" src={introImage.url} alt={introImage.title} />
      </ImageContainer>
    </PageSection>

    <PageSection>
      <TeamMemberList
        members={teamMembers}
        title={member => member.name}
        subtitle={member => member.responsibilityArea}
        imageUrl={member => member.image.url}
      />
    </PageSection>

    <Banner
      buttonLink={RouteNames.BecomeVolunteer}
      buttonText={bannerButtonText}
      headline={bannerTitle}
    />
  </div>
)

TeamSa.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  introTitle: PropTypes.string.isRequired,
  introMarkdown: PropTypes.string.isRequired,
  introImage: PropTypes.shape(imagePropTypes).isRequired,
  teamMembers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.shape(imagePropTypes).isRequired,
    responsibilityArea: PropTypes.string,
  })).isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
}

TeamSa.defaultProps = {
  metaDescription: undefined,
}

TeamSa.getInitialProps = async function initialProps({ query }) {
  return fetchTeamSaPage(getLocaleFromQuery(query))
}

export default LayoutWrapper(TeamSa)

