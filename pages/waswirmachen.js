/* eslint-disable function-paren-newline */
import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

import { fetchWasWirMachen } from '../api/contentful'
import Layout from '../components/Layout'

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 54%; /* 16:9 */
  padding-top: 25px;
  height: 0;
  margin-bottom: 100px;
`

const Hero = styled.img`
  width: 100%;
  height: 700px;
  object-fit: cover;
  margin-bottom: 100px;
`

const H1 = styled.h1`
  margin-bottom: 100px;
  text-align: center;
  line-height: 1.36;
`

const BoldHeading = styled.h2`
  font-weight: 700;
  text-align: center;
  margin-bottom: 50px;
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

const Button = styled.a`
  background-color: white;
  border: 1px solid black;
`

const ProjectContainer = styled.div`
  margin-bottom: 80px;
`

const Number = styled.span`
  font-size: 44px;
`

const HowToHelp = ({
  centerHeading,
  heroImage,
  introHeading,
  metaDescription,
  metaTitle,
  outroHeading,
  outroText,
  programmes,
  stats,
  statsButton,
  statsHeading,
  title,
  youtubeVideo,
}) => (
  <Layout title={metaTitle} description={metaDescription}>
    <Hero src={heroImage.url} alt={heroImage.title} />
    <Container>
      <H1>{title}</H1>
      <VideoContainer>
        <VideoIframe
          title="Masifunde Video"
          src={`https://www.youtube.com/embed/${youtubeVideo}?rel=0&amp;showinfo=0`}
          frameBorder="0"
          allowFullScreen
        />
      </VideoContainer>
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
              <Button className="btn btn-primary">{program.button}</Button>
            </div>
          </ProjectContainer>
        ))}
      </div>

      <H1>{centerHeading}</H1>

      <ProjectContainer>
        <BoldHeading>{statsHeading}</BoldHeading>
        <div className="row justify-content-center">
          <div className="col col-md-10 col-lg-8">
            <div className="row">
              {stats.map(stat => (
                <div
                  className="col-sm d-flex flex-column align-items-center"
                  key={`${stat.number} ${stat.description}`}
                >
                  <Number>{stat.number}</Number>
                  <ProjectText>{stat.description}</ProjectText>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <Button className="btn btn-primary">{statsButton}</Button>
        </div>
      </ProjectContainer>

      <div className="row justify-content-center">
        <div className="col col-md-8 col-lg-6">
          <BoldHeading>{outroHeading}</BoldHeading>
          <ReactMarkdown source={outroText} />
        </div>
      </div>
    </Container>
  </Layout>
)

HowToHelp.propTypes = {
  centerHeading: PropTypes.string.isRequired,
  heroImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  introHeading: PropTypes.string.isRequired,
  metaDescription: PropTypes.string.isRequired,
  metaTitle: PropTypes.string.isRequired,
  outroHeading: PropTypes.string.isRequired,
  outroText: PropTypes.string.isRequired,
  programmes: PropTypes.arrayOf(
    PropTypes.shape({
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
  title: PropTypes.string.isRequired,
  youtubeVideo: PropTypes.string.isRequired,
}

HowToHelp.getInitialProps = async function initialProps() {
  return fetchWasWirMachen()
}

export default HowToHelp
