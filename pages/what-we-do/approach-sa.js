import React from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Markdown from 'react-markdown'

import { fetchApproachSaPage } from '../../api/whatWeDo'
import { getLocaleFromQuery } from '../../utils/locale'
import LayoutWrapper from '../../components/LayoutWrapper'
import Hero from '../../components/Hero'
import Head from '../../components/Head'
import Banner from '../../components/Banner'
import YouTubeVideo from '../../components/YouTubeVideo'
import Project from '../../components/Project'
import HorizontalRuler from '../../components/HorizontalRuler'
import { RouteNames } from '../../routes'

const H1 = styled.h1`
  text-align: center;
  color: ${props => props.theme.orange};
`

const CenteredMarkdown = styled(Markdown)`
  text-align: center;
`

const StyledYouTubeVideo = YouTubeVideo.extend`
  margin-top: 9rem;
  margin-bottom: 4.5rem;
`

const ProjectsContainer = styled.div`
  margin-bottom: 4.5rem;
`

const ApproachSa = ({
  metaTitle,
  metaDescription,
  title,
  introTitle,
  introMarkdown,
  projects,
  youTubeVideo,
  bannerTitle,
  bannerButtonText,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <Hero
      imageUrl="/static/images/hero/hero-small-classroom.jpg"
      heroSize="small"
      backgroundPositionX="80%"
    />
    <Container>
      <H1>{title}</H1>
      <HorizontalRuler />
      <h2>{introTitle}</h2>
      <CenteredMarkdown source={introMarkdown} />
      <ProjectsContainer className="row">
        {projects.map(project => (
          <Project
            key={`${project.name}${project.image}`}
            className="col-12 col-md-6"
            image={project.image}
            name={project.name}
            description={project.description}
          />
        ))}
      </ProjectsContainer>
      <StyledYouTubeVideo youtubeVideo={youTubeVideo} />
    </Container>
    <Banner
      headline={bannerTitle}
      buttonText={bannerButtonText}
      buttonLink={RouteNames.HowToSupport}
    />
  </div>
)

ApproachSa.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  title: PropTypes.string.isRequired,
  introTitle: PropTypes.string.isRequired,
  introMarkdown: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  youTubeVideo: PropTypes.string.isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
}

ApproachSa.defaultProps = {
  metaDescription: undefined,
}

ApproachSa.getInitialProps = async function initialProps({ query }) {
  return fetchApproachSaPage(getLocaleFromQuery(query))
}

export default LayoutWrapper(ApproachSa)

