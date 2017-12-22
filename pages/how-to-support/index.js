/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { fetchHowToSupportPage } from '../../api/howToSupport'
import { getLocaleFromQuery } from '../../utils/locale'
import LayoutWrapper from '../../components/LayoutWrapper'
import { Link, RouteNames } from '../../routes'
import Head from '../../components/Head'
import Hero from '../../components/Hero'
import Markdown from '../../components/Markdown'
import Button from '../../components/Button'
import HorizontalRuler from '../../components/HorizontalRuler'
import { h3 } from '../../styling/typography'

const Paragraph = styled(Markdown)`
  text-align: center;
`

const H3 = styled.h3`
  ${h3};
  text-align: left;
  margin: 0 0 8px;
`

const Image = styled.img`
  border-radius: ${props => props.theme.roundedImageBorderRadius};
`

const Section = ({
  image, title, markdown, buttonText, buttonType, buttonLink,
}) => (
  <SectionContainer className="row">
    <div className="col-md-3 ">
      <Image className="img-fluid" src={image.url} alt={image.title} />
    </div>
    <div className="col-md-9">
      <H3>{title}</H3>
      <Markdown source={markdown} />
      <Link route={buttonLink} passHref>
        <Button type={buttonType}>{buttonText}</Button>
      </Link>
    </div>
  </SectionContainer>
)

const SectionContainer = styled.div`
  padding: 3rem 0;
`

Section.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  markdown: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
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
    <Hero
      backgroundPositionX="80%"
      headline={heroTitle}
      imageUrl="/static/images/hero/hero-pool.jpg"
      headlinePlacement="bottom"
      headlineShadow
    />
    <Container>
      <h1>{introHeading}</h1>
      <Paragraph source={introMarkdown} />
      <Section
        buttonText={section1ButtonText}
        title={section1Title}
        markdown={section1Markdown}
        image={section1Image}
        buttonType="primary"
        buttonLink={RouteNames.Donate}
      />
      <Section
        buttonText={section2ButtonText}
        title={section2Title}
        markdown={section2Markdown}
        image={section2Image}
        buttonType="secondary"
        buttonLink={RouteNames.BecomeSponsor}
      />
      <HorizontalRuler />
      <Section
        buttonText={section3ButtonText}
        title={section3Title}
        markdown={section3Markdown}
        image={section3Image}
        buttonType="secondary"
        buttonLink={RouteNames.BecomeVolunteer}
      />
      <Section
        buttonText={section4ButtonText}
        title={section4Title}
        markdown={section4Markdown}
        image={section4Image}
        buttonType="secondary"
        buttonLink={RouteNames.BecomePartner}
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
