import React from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LayoutWrapper from '../../components/LayoutWrapper'
import Head from '../../components/Head'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchApproachDePage } from '../../api/whatWeDo'
import Banner from '../../components/Banner'
import Markdown from '../../components/Markdown'
import Hero from '../../components/Hero'
import HorizontalRuler from '../../components/HorizontalRuler'
import Project from '../../components/Project'
import { RouteNames } from '../../routes'

const H1 = styled.h1`
  text-align: center;
`

const H2 = styled.h2`
  margin-bottom: 1.5rem;
  color: ${props => props.theme.orange};
`

const CenteredMarkdown = styled(Markdown)`
  text-align: center;
`

const ProjectsContainer = styled.div`
  margin-top: 3rem;
`

const ApproachDe = ({
  metaTitle,
  metaDescription,
  title,
  introHeading,
  introText,
  projects,
  bannerTitle,
  bannerButtonText,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <Hero
      imageUrl="/static/images/hero/hero-small-library.jpg"
      heroSize="small"
    />
    <Container>
      <H2>{title}</H2>
      <HorizontalRuler />
      <H1>{introHeading}</H1>
      <CenteredMarkdown source={introText} />
      <ProjectsContainer className="row">
        {projects.map(project => (
          <Project
            key={`${project.name}${project.image}`}
            className="col-md"
            image={project.image}
            name={project.name}
            description={project.description}
          />
        ))}
      </ProjectsContainer>
    </Container>
    <Banner
      buttonLink={RouteNames.Contact}
      buttonText={bannerButtonText}
      headline={bannerTitle}
    />
  </div>
)

ApproachDe.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  title: PropTypes.string.isRequired,
  introHeading: PropTypes.string.isRequired,
  introText: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
}

ApproachDe.defaultProps = {
  metaDescription: undefined,
}

ApproachDe.getInitialProps = async function initialProps({ query }) {
  return fetchApproachDePage(getLocaleFromQuery(query))
}

export default LayoutWrapper(ApproachDe)

