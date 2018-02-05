import React from 'react'
import PropTypes from 'prop-types'

import { fetchApproachSaPage } from '../../api/whatWeDo'
import { getLocaleFromQuery } from '../../utils/locale'
import withLayout from '../../components/withLayout'
import Hero from '../../components/Hero'
import Head from '../../components/Head'
import Banner from '../../components/Banner'
import EmbeddedVideo from '../../components/EmbeddedVideo'
import PageSection from '../../components/PageSection'
import CenteredText from '../../components/CenteredText'
import Tagline from '../../components/Tagline'
import ProjectList from '../../components/ProjectList'

const ApproachSa = ({
  metaTitle,
  metaDescription,
  title,
  introTitle,
  introMarkdown,
  projects,
  videoUrl,
  bannerTitle,
  bannerButtonText,
  bannerButtonUrl,
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
      <CenteredText source={introMarkdown} />
      <ProjectList projects={projects} />
    </PageSection>

    <PageSection contained={false}>
      <EmbeddedVideo videoUrl={videoUrl} />
    </PageSection>

    <Banner
      headline={bannerTitle}
      buttonText={bannerButtonText}
      buttonLink={bannerButtonUrl}
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
  videoUrl: PropTypes.string.isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  bannerButtonUrl: PropTypes.string.isRequired,
}

ApproachSa.defaultProps = {
  metaDescription: undefined,
}

ApproachSa.getInitialProps = async function initialProps({ query }) {
  return fetchApproachSaPage(getLocaleFromQuery(query))
}

export default withLayout(ApproachSa)

