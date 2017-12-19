import React, { Component, Fragment } from 'react'
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
import Source from '../../components/Source'

const CenteredMarkdown = styled(Markdown)`
  text-align: center;
  font-size: 1.3rem;
`

const H1 = styled.h1`
  color: ${props => props.theme.orange};
`

let superscript = 0

const StatsSection = ({ title, stats }) => (
  <Fragment>
    <h2>{title}</h2>
    <div className="row justify-content-center">
      {stats.map(stat => (
        <Stat
          key={stat.description}
          {...stat}
          superscriptText={stat.sourceMarkdown ? superscript += 1 : null}
          sourceId={`impact-source-${superscript}`}
        />
      ))}
    </div>
  </Fragment>
)

StatsSection.propTypes = {
  title: PropTypes.string.isRequired,
  stats: PropTypes.arrayOf(PropTypes.shape(Stat.propTypes)).isRequired,
}

class Impact extends Component {
  componentWillUnmount() {
    superscript = 0
  }
  render() {
    const {
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
    } = this.props
    return (
      <div>
        <Head title={metaTitle} description={metaDescription} />
        <Hero
          imageUrl="/static/images/hero/hero-small-arts.jpg"
          heroSize="small"
          backgroundPositionX="35%"
        />
        <Container>
          <H1>
            {title}
            <Source superscriptText={superscript += 1} sourceMarkdown={titleSource} id="impact-title-source" />
          </H1>
          <HorizontalRuler />
          <StatsSection title={stats1Title} stats={stats1} />
          <StatsSection title={stats2Title} stats={stats2} />
          <Carousel portrait={portrait1} />
          <Carousel portrait={portrait2} />
        </Container>
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
  }
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
