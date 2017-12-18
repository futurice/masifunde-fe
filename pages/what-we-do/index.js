/* eslint-disable function-paren-newline */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

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

const BoldHeading = styled.h2`
  font-weight: 700;
  text-align: center;
`

const ProjectImage = styled.img`
  border-radius: 50%;
  height: 61px;
  width: 61px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProjectText = styled.p`
  text-align: center;
`

const ProjectDescription = styled.p`
  text-align: center;
`

const ProjectDescriptionContainer = styled.div`
  flex-grow: 1;
`

const ProjectTitle = styled.h3`
  text-align: center;
`

const ProjectContainer = styled.div`
  margin-bottom: 80px;
`

const StyledYouTubeVideo = YouTubeVideo.extend`
  margin-bottom: 100px;
`

const Paragraph = styled.p`
  ${sectionTitle};
  color: ${props => props.theme.orange};
  font-weight: bold;
  text-align: center;
  margin: 5rem 0;
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
    <Hero imageUrl="//via.placeholder.com/350x150/555" headline={heroTitle} />
    <Container>
      <StyledYouTubeVideo youtubeVideo={youtubeVideo} />
      <BoldHeading>{introHeading}</BoldHeading>
      <div className="row">
        {programmes.map(program => (
          <ProjectContainer className="col-md d-flex flex-column" key={program.title}>
            <ProjectTitle>{program.title}</ProjectTitle>

            <ProjectDescriptionContainer className="row justify-content-md-center">
              <div className="col-lg-10">
                <ProjectDescription>{program.description}</ProjectDescription>
              </div>
            </ProjectDescriptionContainer>
            <div className="row">
              {program.projects.map(project => (
                <div
                  className="col-sm d-flex flex-column align-items-center"
                  key={`${project.image.url} ${project.name}`}
                >
                  <ProjectImage src={project.image.url} alt={project.image.title} />
                  <ProjectText>{project.name}</ProjectText>
                </div>
                ))}
            </div>
            <div className="row justify-content-center">
              <Link route={program.buttonLink} passHref>
                <Button type="secondary">{program.button}</Button>
              </Link>
            </div>
          </ProjectContainer>
          ))}
      </div>

      <HorizontalRuler />
      <Paragraph>{centerHeading}</Paragraph>
      <HorizontalRuler />

      <ProjectContainer>
        <BoldHeading>{statsHeading}</BoldHeading>
        <div className="row justify-content-center">
          <div className="col col-md-10 col-lg-8">
            <div className="row">
              {stats.map(stat => (
                <Stat
                  className="col-sm"
                  key={`${stat.number} ${stat.description}`}
                  {...stat}
                />
                ))}
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <Link route={RouteNames.Impact} passHref>
            <Button type="secondary">{statsButton}</Button>
          </Link>
        </div>
      </ProjectContainer>

      <div className="row justify-content-center">
        <div className="col col-md-8 col-lg-6">
          <BoldHeading>{outroHeading}</BoldHeading>
          <ReactMarkdown source={outroText} />
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
