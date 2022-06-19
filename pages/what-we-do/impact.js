/* eslint-disable no-return-assign */
import React from 'react'
import PropTypes from 'prop-types'

import { getLocaleFromQuery } from '../../utils/locale'
import { fetchImpactPage } from '../../api/whatWeDo'
import withLayout from '../../components/withLayout'
import Head from '../../components/Head'
import Hero from '../../components/Hero'
import Banner from '../../components/Banner'
import Carousel from '../../components/Carousel'
import Stat from '../../components/Stat'
import portraitPropTypes from '../../propTypes/portrait'
import Tagline from '../../components/Tagline'
import PageSection from '../../components/PageSection'
import StatList from '../../components/StatList'
import Markdown from '../../components/Markdown'
import EmbeddedVideo from '../../components/EmbeddedVideo'

const Impact = ({
  metaTitle,
  metaDescription,
  title,
  videoUrl,
  stats1Title,
  stats1,
  stats2Title,
  stats2,
  portrait1,
  portrait2,
  outroTitle,
  outroMarkdown,
  outroTextColumn2,
  bannerText,
  bannerButtonText,
  bannerButtonUrl,
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

      <Tagline text={title} hideTopRuler />

      {videoUrl && (
        <PageSection>
          <EmbeddedVideo videoUrl={videoUrl} />
        </PageSection>
      )}

      <PageSection>
        <h2>{stats1Title}</h2>
        <StatList>
          {stats1.map((stat) => (
            <Stat
              key={`${stat.number} ${stat.description}`}
              {...stat}
              superscriptText={stat.sourceMarkdown ? (superscript += 1) : null}
              sourceId={`impact-source-${superscript}`}
            />
          ))}
        </StatList>
      </PageSection>

      {stats2 && stats2.length > 0 && (
        <PageSection>
          <h2>{stats2Title}</h2>
          <StatList>
            {stats2.map((stat) => (
              <Stat
                key={`${stat.number} ${stat.description}`}
                {...stat}
                superscriptText={
                  stat.sourceMarkdown ? (superscript += 1) : null
                }
                sourceId={`impact-source-${superscript}`}
              />
            ))}
          </StatList>
        </PageSection>
      )}

      <PageSection contained={false}>
        <Carousel portrait={portrait1} />
      </PageSection>

      <PageSection contained={false}>
        <Carousel portrait={portrait2} />
      </PageSection>

      <PageSection>
        <h2>{outroTitle}</h2>
        <div className="row">
          <Markdown className="col-md-6" source={outroMarkdown} />
          <Markdown className="col-md-6" source={outroTextColumn2} />
        </div>
      </PageSection>

      <Banner
        headline={bannerText}
        buttonText={bannerButtonText}
        buttonLink={bannerButtonUrl}
      />
    </div>
  )
}

Impact.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  title: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  stats1Title: PropTypes.string.isRequired,
  stats1: PropTypes.arrayOf(PropTypes.shape(Stat.propTypes)).isRequired,
  stats2Title: PropTypes.string.isRequired,
  stats2: PropTypes.arrayOf(PropTypes.shape(Stat.propTypes)).isRequired,
  portrait1: PropTypes.shape(portraitPropTypes).isRequired,
  portrait2: PropTypes.shape(portraitPropTypes).isRequired,
  outroTitle: PropTypes.string.isRequired,
  outroMarkdown: PropTypes.string.isRequired,
  outroTextColumn2: PropTypes.string.isRequired,
  bannerText: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  bannerButtonUrl: PropTypes.string.isRequired,
}

Impact.defaultProps = {
  metaDescription: undefined,
}

Impact.getInitialProps = async function initialProps({ query }) {
  return fetchImpactPage(getLocaleFromQuery(query))
}

export default withLayout(Impact)
