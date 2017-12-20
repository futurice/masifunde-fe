import React from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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

const CarouselContainer = styled.div`
  margin-top: 8rem;
  margin-bottom: 8rem;
`

const StatsContainer = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
`

const YouTubeVideoTitle = styled.h2`
  margin-top: 7rem;
`

const Home = ({
  metaTitle,
  metaDescription,
  heroTitle,
  stats,
  banner1Title,
  banner1ButtonText,
  banner2Title,
  banner2ButtonText,
  portrait,
  youTubeVideoTitle,
  youTubeVideoUrl,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <Hero headline={heroTitle} imageUrl="//via.placeholder.com/350x150/555" />
    <Container>
      <StatsContainer className="row">
        {
          stats.map(stat => (
            <Stat
              key={`${stat.icon.url} ${stat.number}`}
              className="col-md-4"
              {...stat}
            />
          ))
        }
      </StatsContainer>
    </Container>
    <Banner
      headline={banner1Title}
      buttonText={banner1ButtonText}
      buttonLink={RouteNames.WhatWeDo}
    />
    <Container>
      <YouTubeVideoTitle>{youTubeVideoTitle}</YouTubeVideoTitle>
      <YouTubeVideo youtubeVideo={youTubeVideoUrl} />
      <CarouselContainer>
        <Carousel portrait={portrait} />
      </CarouselContainer>
    </Container>
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
