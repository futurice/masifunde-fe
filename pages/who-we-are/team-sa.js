import React from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Head from '../../components/Head'
import Banner from '../../components/Banner'
import Markdown from '../../components/Markdown'
import TeamMember from '../../components/TeamMember'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchTeamSaPage } from '../../api/whoWeAre'
import LayoutWrapper from '../../components/LayoutWrapper'
import imagePropTypes from '../../propTypes/image'

const Image = styled.img`
  width: 100%;
`

const CenteredMarkdown = styled(Markdown)`
  text-align: center;
`

const ImageContainer = styled.div`
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
    <Container>
      <h1>{introTitle}</h1>
      <CenteredMarkdown source={introMarkdown} />
      <ImageContainer className="d-flex justify-content-center align-items-center">
        <Image className="col-md-6" src={introImage.url} alt={introImage.title} />
      </ImageContainer>
      <div className="d-flex flex-wrap">
        {teamMembers.map(teamMember => (
          <TeamMember
            className="col-12 col-md-3 col-lg-2"
            key={`${teamMember.name} ${teamMember.image.title}`}
            imageUrl={teamMember.image.url}
            title={teamMember.name}
            subtitle={teamMember.responsibilityArea}
          />
        ))}
      </div>
    </Container>
    <Banner buttonLink="a" buttonText={bannerButtonText} headline={bannerTitle} />
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

