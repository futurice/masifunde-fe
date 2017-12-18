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

const H1 = styled.h1`
  text-align: center;
`

const Tagline = styled.p`
  color: ${props => props.theme.orange};
  margin-top: 4.5rem;
  text-align: center;
  font-size: 38px;
  font-weight: bold;
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
    <Hero imageUrl="//via.placeholder.com/350x150/555" />
    <Container>
      <Tagline>{title}</Tagline>
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
    <Banner buttonLink="a" buttonText={bannerButtonText} headline={bannerTitle} />
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

