import React from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Markdown from '../../components/Markdown'
import { fetchTeamDePage } from '../../api/whoWeAre'
import { getLocaleFromQuery } from '../../utils/locale'
import LayoutWrapper from '../../components/LayoutWrapper'
import Banner from '../../components/Banner'
import TeamMember from '../../components/TeamMember'
import Head from '../../components/Head'

const LocationsList = styled.ul`
  column-count: 2;
  list-style-type: none;  
  margin-bottom: 0;
`

const LocationListItem = styled.li`
  padding: 0.6rem 2rem;
  padding-left: 0;  
`

const TeamMemberList = styled.div`
  margin: 2rem 0 2.5rem 0;
`

const ImageContainer = styled.div`
  margin: 3rem 0 4.5rem 0;
`

const Paragraph = styled(Markdown)`
  text-align: center;
`

const TeamDe = ({
  title,
  pageDescription,
  bannerTitle,
  bannerButtonText,
  sectionOneTitle,
  sectionOneText,
  sectionTwoTitle,
  regionalGroups,
  teamMembers,
  metaTitle,
  metaDescription,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <Container>
      <h1>{title}</h1>
      <Paragraph source={pageDescription} />
      <section>
        <h2>{sectionOneTitle}</h2>
        <Paragraph source={sectionOneText} />
        <ImageContainer className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center">
          <img className="col-sm-12 col-md-6" src={regionalGroups.image.url} alt={regionalGroups.image.title} />
          <LocationsList className="list-unstyled">
            {regionalGroups.regions.map(place => (
              <LocationListItem key={place}>{place}</LocationListItem>
            ))}
          </LocationsList>
        </ImageContainer>
      </section>
      <section>
        <h2>{sectionTwoTitle}</h2>
        <TeamMemberList className="d-flex flex-wrap">
          {teamMembers.map(teamMember => (
            <TeamMember
              key={teamMember.name}
              imageUrl={teamMember.image.url}
              title={teamMember.name}
              subtitle={teamMember.region}
            />))
          }
        </TeamMemberList>
      </section>
    </Container>
    <Banner buttonLink="a" buttonText={bannerButtonText} headline={bannerTitle} />
  </div>
)

TeamDe.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  title: PropTypes.string.isRequired,
  pageDescription: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  bannerTitle: PropTypes.string.isRequired,
  sectionOneTitle: PropTypes.string.isRequired,
  sectionOneText: PropTypes.string.isRequired,
  sectionTwoTitle: PropTypes.string.isRequired,
  regionalGroups: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    regions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  teamMembers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired).isRequired,
}

TeamDe.defaultProps = {
  metaDescription: undefined,
}

TeamDe.getInitialProps = async function initialProps({ query }) {
  return fetchTeamDePage(getLocaleFromQuery(query))
}

export default LayoutWrapper(TeamDe)

