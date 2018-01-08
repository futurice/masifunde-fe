import React from 'react'
import PropTypes from 'prop-types'

import LayoutWrapper from '../../components/LayoutWrapper'
import Head from '../../components/Head'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchApproachDePage } from '../../api/whatWeDo'
import Banner from '../../components/Banner'
import Hero from '../../components/Hero'
import { RouteNames } from '../../routes'
import PageSection from '../../components/PageSection'
import Tagline from '../../components/Tagline'
import ProjectList from '../../components/ProjectList'
import CenteredText from '../../components/CenteredText'

const ApproachDe = ({
  metaTitle,
  metaDescription,
  title,
  introHeading,
  introText,
  projects,
  bannerTitle,
  bannerButtonText,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <Hero
      imageUrl="/static/images/hero/hero-small-library.jpg"
      heroSize="small"
    />

    <Tagline text={title} hideTopRuler />

    <PageSection>
      <h1>{introHeading}</h1>
      <CenteredText source={introText} />
      <ProjectList projects={projects} />
    </PageSection>

    <Banner
      buttonLink={RouteNames.Contact}
      buttonText={bannerButtonText}
      headline={bannerTitle}
    />
  </div>
)

ApproachDe.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  title: PropTypes.string.isRequired,
  introHeading: PropTypes.string.isRequired,
  introText: PropTypes.string.isRequired,
  projects: ProjectList.propTypes.projects.isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
}

ApproachDe.defaultProps = {
  metaDescription: undefined,
}

ApproachDe.getInitialProps = async function initialProps({ query }) {
  return fetchApproachDePage(getLocaleFromQuery(query))
}

export default LayoutWrapper(ApproachDe)

