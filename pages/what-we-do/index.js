/* eslint-disable function-paren-newline */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'
import styled from 'styled-components'

import LayoutWrapper from '../../components/LayoutWrapper'
import { fetchWhatWeDoPage } from '../../api/whatWeDo'
import { getLocaleFromQuery } from '../../utils/locale'
import Head from '../../components/Head'
import YouTubeVideo from '../../components/YouTubeVideo'
import Button from '../../components/Button'
import Stat from '../../components/Stat'
import { Link, RouteNames } from '../../routes'
import Hero from '../../components/Hero'
import Banner from '../../components/Banner'
import HorizontalRuler from '../../components/HorizontalRuler'
import { sectionTitle } from '../../styling/typography'
import Markdown from '../../components/Markdown'

const BoldHeading = styled.h2`
  text-align: center;
  margin-bottom: 1.625rem;
`

const H2 = styled.h2`
  text-align: center;
`

const ProjectImage = styled.img`
  height: 61px;
  width: 61px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProjectText = styled.p`
  text-align: center;
`

const ProjectDescriptionContainer = styled.div`
  flex-grow: 1;
  width: 100%;
`

const ProjectTitle = styled.h3`
  text-align: center;
  margin-bottom: 1.5rem;
`

const ProjectContainer = styled.div`
  margin-bottom: 50px;
`

const Paragraph = styled.p`
  ${sectionTitle};
  color: ${props => props.theme.orange};
  font-weight: bold;
  text-align: center;
  margin: 5rem 0;
`

const ProgramsContainer = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.2rem;
  width: 100%;
`

const ProgramContainer = styled.div`
  flex-grow: 1;
`

const LowerHorizontalRuler = HorizontalRuler.extend`
  margin-bottom: 7rem;
  @media (min-width: 576px) {
    margin-bottom: 7rem;
  }
`

const ImpactButton = styled.div`
  margin-top: 1.2rem;
`

const StyledMarkdown = styled(Markdown)`
  margin-bottom: 7rem;
`

const WhatWeDo = ({
  centerHeading,
  introHeading,
  metaDescription,
  metaTitle,
  outroHeading,
  outroText,
  programmes,
  stats,
  statsButton,
  statsHeading,
  heroTitle,
  youtubeVideo,
  bannerButtonText,
  bannerTitle,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <Hero
      imageUrl="/static/images/hero/hero-student.jpg"
      headline={heroTitle}
      headlineShadow
      headlinePlacement="bottom"
    />
    <YouTubeVideo youtubeVideo={youtubeVideo} />
    <Container>
      <BoldHeading>{introHeading}</BoldHeading>
      <div className="row">
        {programmes.map(program => (
          <ProjectContainer className="col-md d-flex flex-column align-items-center" key={program.title}>
            <ProjectTitle>{program.title}</ProjectTitle>
            <ProjectDescriptionContainer className="row justify-content-md-center">
              <div className="col-lg-10">
                <p>{program.description}</p>
              </div>
            </ProjectDescriptionContainer>
            <ProgramsContainer className="row justify-content-center">
              {program.projects.map(project => (
                <ProgramContainer
                  className="col-sm-6 d-flex flex-column align-items-center"
                  key={`${project.image.url} ${project.name}`}
                >
                  <ProjectImage src={project.image.url} alt={project.image.title} />
                  <ProjectText>{project.name}</ProjectText>
                </ProgramContainer>
                ))}
            </ProgramsContainer>
            <div className="justify-content-center">
              <Link route={program.buttonLink} passHref>
                <Button type="secondary">{program.button}</Button>
              </Link>
            </div>
          </ProjectContainer>
          ))}
      </div>

      <HorizontalRuler />
      <Paragraph>{centerHeading}</Paragraph>
      <LowerHorizontalRuler />

      <ProjectContainer>
        <H2>{statsHeading}</H2>
        <div className="row justify-content-center">
          <div className="col col-md-10 col-lg-8">
            <div className="row">
              {stats.map((stat, index) => (
                <Stat
                  className="col-sm"
                  key={`${stat.number} ${stat.description}`}
                  {...stat}
                  superscriptText={index + 1}
                  sourceId={`stat-${index}`}
                />
                ))}
            </div>
          </div>
        </div>
        <ImpactButton className="d-flex justify-content-center">
          <Link route={RouteNames.Impact} passHref>
            <Button type="secondary">{statsButton}</Button>
          </Link>
        </ImpactButton>
      </ProjectContainer>

      <div className="row justify-content-center">
        <div className="col col-md-8 col-lg-6">
          <BoldHeading>{outroHeading}</BoldHeading>
          <StyledMarkdown source={outroText} />
        </div>
      </div>
    </Container>
    <Banner
      headline={bannerTitle}
      buttonText={bannerButtonText}
      buttonLink={RouteNames.HowToSupport}
    />
  </div>
)


WhatWeDo.propTypes = {
  centerHeading: PropTypes.string.isRequired,
  heroTitle: PropTypes.string.isRequired,
  introHeading: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  metaTitle: PropTypes.string.isRequired,
  outroHeading: PropTypes.string.isRequired,
  outroText: PropTypes.string.isRequired,
  programmes: PropTypes.arrayOf(
    PropTypes.shape({
      buttonLink: PropTypes.any.isRequired,
      button: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      projects: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          image: PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  statsButton: PropTypes.string.isRequired,
  statsHeading: PropTypes.string.isRequired,
  youtubeVideo: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  bannerTitle: PropTypes.string.isRequired,
}

WhatWeDo.defaultProps = {
  metaDescription: undefined,
}

WhatWeDo.getInitialProps = async function initialProps({ query }) {
  return fetchWhatWeDoPage(getLocaleFromQuery(query))
}

export default LayoutWrapper(WhatWeDo)
