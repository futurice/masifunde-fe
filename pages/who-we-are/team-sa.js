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

const Image = styled.img`
  width: 100%;
`

const CenteredMarkdown = styled(Markdown)`
  text-align: center;
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
      <div className="d-flex justify-content-center align-items-center">
        <Image src={introImage.url} alt={introImage.title} />
      </div>
      <div className="d-flex flex-wrap">
        {teamMembers.map(teamMember => (
          <TeamMember
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
  introImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  teamMembers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
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

