import React, { Fragment } from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { getLocaleFromQuery } from '../../utils/locale'
import { fetchImpactPage } from '../../api/whatWeDo'
import LayoutWrapper from '../../components/LayoutWrapper'
import Head from '../../components/Head'
import Hero from '../../components/Hero'
import HorizontalRuler from '../../components/HorizontalRuler'
import Banner from '../../components/Banner'
import Markdown from '../../components/Markdown'
import Carousel from '../../components/Carousel'

const CenteredSpan = styled.span`
  text-align: center;
`

const CenteredMarkdown = styled(Markdown)`
  text-align: center;
`

const Stat = ({
  description, icon, number,
}) => (
  <div className="col-md d-flex flex-column align-items-center">
    <img src={icon.url} alt={icon.title} />
    <CenteredSpan>{number}</CenteredSpan>
    <CenteredSpan>{description}</CenteredSpan>
  </div>
)

Stat.propTypes = {
  icon: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  number: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

const StatsSection = ({ title, stats }) => (
  <Fragment>
    <h2>{title}</h2>
    <div className="row justify-content-center">
      {stats.map(stat => (
        <Stat
          key={stat.description}
          description={stat.description}
          icon={stat.icon}
          number={stat.number}
        />
      ))}
    </div>
  </Fragment>
)

StatsSection.propTypes = {
  title: PropTypes.string.isRequired,
  stats: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

const mapPortraitToCarouselItems = (portrait) => {
  const item1 = {
    image: portrait.page1Image,
    heading: portrait.page1Heading,
    text: portrait.page1Text,
    src: `${portrait.page1Heading} ${portrait.page1Image.url}`,
  }
  const item2 = {
    image: portrait.page2Image,
    heading: portrait.page2Heading,
    text: portrait.page2Text,
    src: `${portrait.page2Heading} ${portrait.page2Image.url}`,
  }
  const item3 = {
    image: portrait.page3Image,
    heading: portrait.page3Heading,
    text: portrait.page3Text,
    src: `${portrait.page3Heading} ${portrait.page3Image.url}`,
  }
  return [item1, item2, item3]
}

const Impact = ({
  metaTitle,
  metaDescription,
  title,
  stats1Title,
  stats1,
  stats2Title,
  stats2,
  portrait1,
  portrait2,
  outroTitle,
  outroMarkdown,
  bannerText,
  bannerButtonText,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <Hero imageUrl="//via.placeholder.com/350x150/555" />
    <Container>
      <h1>{title}</h1>
      <HorizontalRuler />
      <StatsSection title={stats1Title} stats={stats1} />
      <StatsSection title={stats2Title} stats={stats2} />
    </Container>
    <Carousel items={mapPortraitToCarouselItems(portrait1)} />
    <Carousel items={mapPortraitToCarouselItems(portrait2)} />
    <Container>
      <h2>{outroTitle}</h2>
      <CenteredMarkdown source={outroMarkdown} />
    </Container>
    <Banner headline={bannerText} buttonText={bannerButtonText} buttonLink="a" />
  </div>
)

Impact.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  title: PropTypes.string.isRequired,
  stats1Title: PropTypes.string.isRequired,
  stats1: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  stats2Title: PropTypes.string.isRequired,
  stats2: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  portrait1: PropTypes.shape().isRequired,
  portrait2: PropTypes.shape().isRequired,
  outroTitle: PropTypes.string.isRequired,
  outroMarkdown: PropTypes.string.isRequired,
  bannerText: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
}

Impact.defaultProps = {
  metaDescription: undefined,
}

Impact.getInitialProps = async function initialProps({ query }) {
  return fetchImpactPage(getLocaleFromQuery(query))
}

export default LayoutWrapper(Impact)
