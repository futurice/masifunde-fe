import React from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'

import LayoutWrapper from '../components/LayoutWrapper'
import Head from '../components/Head'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import Carousel from '../components/Carousel'
import portraitPropTypes from '../propTypes/portrait'
import Stat from '../components/Stat'
import { getLocaleFromQuery } from '../utils/locale'
import { fetchHomePage } from '../api/home'
import { RouteNames } from '../routes'
import YouTubeVideo from '../components/YouTubeVideo'
import PageSection from '../components/PageSection'
import StatList from '../components/StatList'

const Home = ({
  metaTitle,
  metaDescription,
  heroTitle,
  stats,
  banner1Title,
  banner1ButtonText,
  banner2Title,
  banner2ButtonText,
  section1Title,
  portrait,
  youTubeVideoTitle,
  youTubeVideoUrl,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <Hero headline={heroTitle} imageUrl="/static/images/hero/hero-talk.jpg" headlineMaxWidth="450px" />

    <PageSection>
      <StatList className="row">
        {
          stats.map((stat, index) => (
            <Stat
              key={`${stat.icon.url} ${stat.number}`}
              {...stat}
              superscriptText={index + 1}
              sourceId={`home-stat-${index}`}
            />
          ))
        }
      </StatList>
    </PageSection>

    <Banner
      headline={banner1Title}
      buttonText={banner1ButtonText}
      buttonLink={RouteNames.WhatWeDo}
    />

    <PageSection contained={false}>
      <Container>
        <h2>{youTubeVideoTitle}</h2>
      </Container>

      <YouTubeVideo youtubeVideo={youTubeVideoUrl} />
    </PageSection>

    <PageSection contained={false}>
      <Container>
        <h2>{section1Title}</h2>
      </Container>

      <Carousel portrait={portrait} />
    </PageSection>

    <Banner
      headline={banner2Title}
      buttonText={banner2ButtonText}
      buttonLink={RouteNames.Impact}
    />
  </div>
)

Home.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  heroTitle: PropTypes.string.isRequired,
  stats: PropTypes.arrayOf(PropTypes.shape(Stat.propTypes)).isRequired,
  banner1Title: PropTypes.string.isRequired,
  banner1ButtonText: PropTypes.string.isRequired,
  banner2Title: PropTypes.string.isRequired,
  banner2ButtonText: PropTypes.string.isRequired,
  section1Title: PropTypes.string.isRequired,
  portrait: PropTypes.shape(portraitPropTypes).isRequired,
  youTubeVideoTitle: PropTypes.string.isRequired,
  youTubeVideoUrl: PropTypes.string.isRequired,
}

Home.defaultProps = {
  metaDescription: undefined,
}

Home.getInitialProps = async function initialProps({ query }) {
  return fetchHomePage(getLocaleFromQuery(query))
}

export default LayoutWrapper(Home)
