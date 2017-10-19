import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'
import styled from 'styled-components'

import { fetchSingleEntry } from '../api/contentfulService'
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
  padding-bottom: 56.25%; /* 16:9 */
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

const Paragraph = styled.p`
  white-space: pre-line;
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
  title,
  introHeading,
  outroHeading,
  outroText,
  metaTitle,
  metaDescription,
  heroImage,
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
      <ProjectContainer className="row">
        <ProjectContainer className="col-md-6">
          <ProjectTitle>Project title</ProjectTitle>

          <ProjectDescriptionContainer className="row justify-content-md-center">
            <div className="col-lg-10">
              <ProjectDescription>
                We focus on the creation of holistic and qualitative educational opportunities in We
                focus on the creation of holistic and qualitative educational opportunities in We
                focus on the creation of holistic and qualitative educational opportunities in
              </ProjectDescription>
            </div>
          </ProjectDescriptionContainer>
          <div className="row">
            <div className="col-sm-3 d-flex flex-column align-items-center">
              <ProjectImage src="http://via.placeholder.com/61x61" />
              <ProjectText>Scholarships and Stipends</ProjectText>
            </div>
            <div className="col-sm-3 d-flex flex-column align-items-center">
              <ProjectImage src="http://via.placeholder.com/61x61" />
              <ProjectText>Educational Centre</ProjectText>
            </div>
            <div className="col-sm-3 d-flex flex-column align-items-center">
              <ProjectImage src="http://via.placeholder.com/61x61" />
              <ProjectText>Scholarships and Stipends</ProjectText>
            </div>
            <div className="col-sm-3 d-flex flex-column align-items-center">
              <ProjectImage src="http://via.placeholder.com/61x61" />
              <ProjectText>Scholarships and Stipends</ProjectText>
            </div>
          </div>
          <div className="row justify-content-center">
            <Button className="btn btn-primary">Mehr über unseren pädagogischen Ansatz</Button>
          </div>
        </ProjectContainer>

        <ProjectContainer className="col-md-6 d-flex flex-column">
          <ProjectTitle>Project title</ProjectTitle>

          <ProjectDescriptionContainer className="row justify-content-md-center">
            <div className="col-lg-10">
              <ProjectDescription>
                We focus on the creation of holistic and qualitative educational opportunities in
                Walmer .
              </ProjectDescription>
            </div>
          </ProjectDescriptionContainer>
          <div className="row">
            <div className="col-sm-3 d-flex flex-column align-items-center">
              <ProjectImage src="http://via.placeholder.com/61x61" />
              <ProjectText>Scholarships and Stipends</ProjectText>
            </div>
            <div className="col-sm-3 d-flex flex-column align-items-center">
              <ProjectImage src="http://via.placeholder.com/61x61" />
              <ProjectText>Educational Centre</ProjectText>
            </div>
            <div className="col-sm-3 d-flex flex-column align-items-center">
              <ProjectImage src="http://via.placeholder.com/61x61" />
              <ProjectText>Scholarships and Stipends</ProjectText>
            </div>
            <div className="col-sm-3 d-flex flex-column align-items-center">
              <ProjectImage src="http://via.placeholder.com/61x61" />
              <ProjectText>Scholarships and Stipends</ProjectText>
            </div>
          </div>
          <div className="row justify-content-center">
            <Button className="btn btn-primary">Mehr über unseren pädagogischen Ansatz</Button>
          </div>
        </ProjectContainer>
      </ProjectContainer>

      <H1>
        Our programmes are designed to use resources sparingly to achieve the most sustainable
        dissemination of educational content possible.
      </H1>

      <ProjectContainer>
        <BoldHeading>Our Impact in South Africa in 2017</BoldHeading>
        <div className="row justify-content-center">
          <div className="col col-md-10 col-lg-8">
            <div className="row">
              <div className="col-sm-3 d-flex flex-column align-items-center">
                <Number>270</Number>
                <ProjectText>Scholarships and Stipends</ProjectText>
              </div>
              <div className="col-sm-3 d-flex flex-column align-items-center">
                <Number>270</Number>
                <ProjectText>Scholarships and Stipends</ProjectText>
              </div>
              <div className="col-sm-3 d-flex flex-column align-items-center">
                <Number>270</Number>
                <ProjectText>Scholarships and Stipends</ProjectText>
              </div>
              <div className="col-sm-3 d-flex flex-column align-items-center">
                <Number>270</Number>
                <ProjectText>Scholarships and Stipends</ProjectText>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <Button className="btn btn-primary">Mehr darüber, was wir bewirken</Button>
        </div>
      </ProjectContainer>

      <div className="row justify-content-center">
        <div className="col col-md-8 col-lg-6">
          <BoldHeading>{outroHeading}</BoldHeading>
          <Paragraph>{outroText}</Paragraph>
        </div>
      </div>
    </Container>
  </Layout>
)

HowToHelp.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  introHeading: PropTypes.string.isRequired,
  outroHeading: PropTypes.string.isRequired,
  outroText: PropTypes.string.isRequired,
  youtubeVideo: PropTypes.string.isRequired,
  heroImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}

HowToHelp.getInitialProps = async function initialProps() {
  const content = await fetchSingleEntry('pageApproachDE')
  const projects = content.projects.map(({ fields }) => ({ ...fields, image: fields.image.fields }))

  const formattedContent = {
    ...content,
    heroImage: {
      ...content.heroImage.fields,
      url: content.heroImage.fields.file.url,
    },
    projects,
  }

  console.log(formattedContent)

  return formattedContent
}

export default HowToHelp
