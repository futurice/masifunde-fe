import React from 'react'
import PropTypes from 'prop-types'

import { fetchApproachSaPage } from '../../api/whatWeDo'
import { getLocaleFromQuery } from '../../utils/locale'
import LayoutWrapper from '../../components/LayoutWrapper'
import Hero from '../../components/Hero'
import Head from '../../components/Head'
import Banner from '../../components/Banner'
import YouTubeVideo from '../../components/YouTubeVideo'
import PageSection from '../../components/PageSection'
import IntroText from '../../components/IntroText'
import Tagline from '../../components/Tagline'
import { RouteNames } from '../../routes'
import ProjectList from '../../components/ProjectList'

const ApproachSa = ({
  metaTitle,
  metaDescription,
  title,
  introTitle,
  introMarkdown,
  projects,
  youTubeVideo,
  bannerTitle,
  bannerButtonText,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <Hero
      imageUrl="/static/images/hero/hero-small-classroom.jpg"
      heroSize="small"
      backgroundPositionX="80%"
    />

    <Tagline text={title} hideTopRuler />

    <PageSection>
      <h1>{introTitle}</h1>
      <IntroText source={introMarkdown} />
      <ProjectList projects={projects} />
    </PageSection>

    <PageSection contained={false}>
      <YouTubeVideo youtubeVideo={youTubeVideo} />
    </PageSection>

    <Banner
      headline={bannerTitle}
      buttonText={bannerButtonText}
      buttonLink={RouteNames.HowToSupport}
    />
  </div>
)

ApproachSa.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  title: PropTypes.string.isRequired,
  introTitle: PropTypes.string.isRequired,
  introMarkdown: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  youTubeVideo: PropTypes.string.isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
}

ApproachSa.defaultProps = {
  metaDescription: undefined,
}

ApproachSa.getInitialProps = async function initialProps({ query }) {
  return fetchApproachSaPage(getLocaleFromQuery(query))
}

export default LayoutWrapper(ApproachSa)

