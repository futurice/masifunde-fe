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
import Stat from '../../components/Stat'
import { RouteNames } from '../../routes'
import portraitPropTypes from '../../propTypes/portrait'

const CenteredMarkdown = styled(Markdown)`
  text-align: center;
`

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
  stats: PropTypes.arrayOf(PropTypes.shape(Stat.propTypes)).isRequired,
}

const mapPortraitToCarouselItems = (portrait) => {
  const item1 = {
    image: portrait.page1Image,
    heading: portrait.page1Heading,
    text: portrait.page1Text,
  }
  const item2 = {
    image: portrait.page2Image,
    heading: portrait.page2Heading,
    text: portrait.page2Text,
  }
  const item3 = {
    image: portrait.page3Image,
    heading: portrait.page3Heading,
    text: portrait.page3Text,
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
    <Banner
      headline={bannerText}
      buttonText={bannerButtonText}
      buttonLink={RouteNames.HowToSupport}
    />
  </div>
)

Impact.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  title: PropTypes.string.isRequired,
  stats1Title: PropTypes.string.isRequired,
  stats1: PropTypes.arrayOf(PropTypes.shape(Stat.propTypes)).isRequired,
  stats2Title: PropTypes.string.isRequired,
  stats2: PropTypes.arrayOf(PropTypes.shape(Stat.propTypes)).isRequired,
  portrait1: PropTypes.shape(portraitPropTypes).isRequired,
  portrait2: PropTypes.shape(portraitPropTypes).isRequired,
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
