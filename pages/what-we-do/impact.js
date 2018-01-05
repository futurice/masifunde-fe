/* eslint-disable no-return-assign */
import React from 'react'
import PropTypes from 'prop-types'

import { getLocaleFromQuery } from '../../utils/locale'
import { fetchImpactPage } from '../../api/whatWeDo'
import LayoutWrapper from '../../components/LayoutWrapper'
import Head from '../../components/Head'
import Hero from '../../components/Hero'
import Banner from '../../components/Banner'
import Carousel from '../../components/Carousel'
import Stat from '../../components/Stat'
import { RouteNames } from '../../routes'
import portraitPropTypes from '../../propTypes/portrait'
import Source from '../../components/Source'
import Tagline from '../../components/Tagline'
import PageSection from '../../components/PageSection'
import StatList from '../../components/StatList'
import IntroText from '../../components/IntroText'

const Impact = ({
  metaTitle,
  metaDescription,
  title,
  titleSource,
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
}) => {
  let superscript = 0

  return (
    <div>
      <Head title={metaTitle} description={metaDescription} />

      <Hero
        imageUrl="/static/images/hero/hero-small-arts.jpg"
        heroSize="small"
        backgroundPositionX="35%"
      />

      <Tagline
        text={title}
        hideTopRuler
        source={
          <Source
            superscriptText={(superscript += 1)}
            sourceMarkdown={titleSource}
            id="impact-title-source"
          />
        }
      />

      <PageSection>
        <h2>{stats1Title}</h2>
        <StatList>
          {stats1.map(stat => (
            <Stat
              key={`${stat.number} ${stat.description}`}
              {...stat}
              superscriptText={stat.sourceMarkdown ? (superscript += 1) : null}
              sourceId={`impact-source-${superscript}`}
            />
          ))}
        </StatList>
      </PageSection>

      <PageSection>
        <h2>{stats2Title}</h2>
        <StatList>
          {stats2.map(stat => (
            <Stat
              key={`${stat.number} ${stat.description}`}
              {...stat}
              superscriptText={stat.sourceMarkdown ? (superscript += 1) : null}
              sourceId={`impact-source-${superscript}`}
            />
          ))}
        </StatList>
      </PageSection>

      <PageSection contained={false} >
        <Carousel portrait={portrait1} />
      </PageSection>

      <PageSection contained={false} >
        <Carousel portrait={portrait2} />
      </PageSection>

      <PageSection>
        <h2>{outroTitle}</h2>
        <IntroText source={outroMarkdown} />
      </PageSection>

      <Banner
        headline={bannerText}
        buttonText={bannerButtonText}
        buttonLink={RouteNames.HowToSupport}
      />
    </div>
  )
}


Impact.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  title: PropTypes.string.isRequired,
  titleSource: PropTypes.string.isRequired,
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
