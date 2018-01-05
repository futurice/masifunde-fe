/* eslint-disable function-paren-newline */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
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
import { mdBreakpoint } from '../../styling/breakpoints'
import IntroText from '../../components/IntroText'
import PageSection from '../../components/PageSection'
import Tagline from '../../components/Tagline'
import StatList from '../../components/StatList'

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

const CountryDescription = styled.div`
  flex-grow: 1;
  width: 100%;

  @media (min-width: ${mdBreakpoint}) {
    justify-content: center;
  }
`

const CountryTitle = styled.h3`
  text-align: center;
  margin-bottom: 1.5rem;
`

const CountryContainer = styled.div`
  margin-bottom: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProjectList = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.2rem;
  width: 100%;

  display: flex;
  justify-content: center;
`

const Project = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const ImpactButton = styled(Button)`
  margin-top: 1rem;
`

const CountryProjects = ({ country }) => (
  <CountryContainer className="col-md" key={country.title}>
    <CountryTitle>{country.title}</CountryTitle>
    <CountryDescription className="row">
      <div className="col-lg-10">
        <p>{country.description}</p>
      </div>
    </CountryDescription>
    <ProjectList className="row">
      {country.projects.map(project => (
        <Project
          className="col-sm-6"
          key={`${project.image.url} ${project.name}`}
        >
          <ProjectImage src={project.image.url} alt={project.image.title} />
          <ProjectText>{project.name}</ProjectText>
        </Project>
        ))}
    </ProjectList>
    <Link route={country.buttonLink} passHref>
      <Button type="secondary">{country.button}</Button>
    </Link>
  </CountryContainer>
)

const countryShape = {
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
}

CountryProjects.propTypes = {
  country: PropTypes.shape(countryShape).isRequired,
}

const WhatWeDo = ({
  centerHeading,
  introHeading,
  metaDescription,
  metaTitle,
  outroHeading,
  outroText,
  countries,
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

    <PageSection contained={false}>
      <YouTubeVideo youtubeVideo={youtubeVideo} />
    </PageSection>

    <PageSection>
      <h1>{introHeading}</h1>
      <div className="row">
        {countries.map(country => (
          <CountryProjects key={country.title} country={country} />
        ))}
      </div>
    </PageSection>

    <Tagline text={centerHeading} />

    <PageSection>
      <h1>{statsHeading}</h1>
      <StatList>
        {stats.map((stat, index) => (
          <Stat
            key={`${stat.number} ${stat.description}`}
            {...stat}
            superscriptText={index + 1}
            sourceId={`stat-${index}`}
          />
          ))}
      </StatList>
      <Link route={RouteNames.Impact} passHref>
        <ImpactButton center type="secondary">{statsButton}</ImpactButton>
      </Link>
    </PageSection>

    <PageSection>
      <h1>{outroHeading}</h1>
      <IntroText source={outroText} />
    </PageSection>

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
  countries: PropTypes.arrayOf(PropTypes.shape(countryShape)).isRequired,
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
