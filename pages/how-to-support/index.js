import React from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { fetchHowToSupportPage } from '../../api/howToSupport'
import { getLocaleFromQuery } from '../../utils/locale'
import LayoutWrapper from '../../components/LayoutWrapper'
import Head from '../../components/Head'
import Hero from '../../components/Hero'
import Markdown from '../../components/Markdown'

const Paragraph = styled(Markdown)`
  text-align: center;
`

const H2 = styled.h2`
  text-align: left;
`

const Section = ({
  image, title, markdown, buttonText,
}) => (
  <SectionContainer>
    <img src={image.url} alt={image.tile} />
    <SectionContentContainer>
      <H2>{title}</H2>
      <Markdown source={markdown} />
      <button>{buttonText}</button>
    </SectionContentContainer>
  </SectionContainer>
)

const SectionContainer = styled.div`
  display: flex;
  padding: 3rem 0;
`

const SectionContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.4rem;
`

Section.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  markdown: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
}

const HowToSupport = ({
  metaTitle,
  metaDescription,
  heroTitle,
  introHeading,
  introMarkdown,
  section1Image,
  section1Title,
  section1Markdown,
  section1ButtonText,
  section2Image,
  section2Title,
  section2Markdown,
  section2ButtonText,
  section3Image,
  section3Title,
  section3Markdown,
  section3ButtonText,
  section4Image,
  section4Title,
  section4Markdown,
  section4ButtonText,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <Hero headline={heroTitle} imageUrl="//via.placeholder.com/350x150/555" />
    <Container>
      <h1>{introHeading}</h1>
      <Paragraph source={introMarkdown} />
      <Section
        buttonText={section1ButtonText}
        title={section1Title}
        markdown={section1Markdown}
        image={section1Image}
      />
      <Section
        buttonText={section2ButtonText}
        title={section2Title}
        markdown={section2Markdown}
        image={section2Image}
      />
      <hr />
      <Section
        buttonText={section3ButtonText}
        title={section3Title}
        markdown={section3Markdown}
        image={section3Image}
      />
      <Section
        buttonText={section4ButtonText}
        title={section4Title}
        markdown={section4Markdown}
        image={section4Image}
      />
    </Container>
  </div>
)

HowToSupport.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  heroTitle: PropTypes.string.isRequired,
  introHeading: PropTypes.string.isRequired,
  introMarkdown: PropTypes.string.isRequired,
  section1Image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  section1Title: PropTypes.string.isRequired,
  section1Markdown: PropTypes.string.isRequired,
  section1ButtonText: PropTypes.string.isRequired,
  section2Image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  section2Title: PropTypes.string.isRequired,
  section2Markdown: PropTypes.string.isRequired,
  section2ButtonText: PropTypes.string.isRequired,
  section3Image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  section3Title: PropTypes.string.isRequired,
  section3Markdown: PropTypes.string.isRequired,
  section3ButtonText: PropTypes.string.isRequired,
  section4Image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  section4Title: PropTypes.string.isRequired,
  section4Markdown: PropTypes.string.isRequired,
  section4ButtonText: PropTypes.string.isRequired,
}

HowToSupport.defaultProps = {
  metaDescription: undefined,
}

HowToSupport.getInitialProps = async function getInitialProps({ query }) {
  return fetchHowToSupportPage(getLocaleFromQuery(query))
}

export default LayoutWrapper(HowToSupport)
