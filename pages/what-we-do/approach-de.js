import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LayoutWrapper from '../../components/LayoutWrapper'
import Head from '../../components/Head'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchApproachDePage } from '../../api/whatWeDo'
import Banner from '../../components/Banner'
import Hero from '../../components/Hero'
import PageSection from '../../components/PageSection'
import Tagline from '../../components/Tagline'
import ProjectList from '../../components/ProjectList'
import CenteredText from '../../components/CenteredText'
import imagePropTypes from '../../propTypes/image'
import RoundedImage from '../../components/RoundedImage'
import Markdown from '../../components/Markdown'

const ImageContainer = styled.div`
  margin: 0 auto;
  max-width: 900px;
`

const ApproachDe = ({
  metaTitle,
  metaDescription,
  title,
  introHeading,
  introText,
  projects,
  image1,
  outroTitle,
  outroText1,
  outroText2,
  bannerTitle,
  bannerButtonText,
  bannerButtonUrl,
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

    <PageSection>
      <ImageContainer>
        <RoundedImage
          className="img-fluid"
          src={image1.url}
          alt={image1.title}
        />
      </ImageContainer>
    </PageSection>

    <PageSection>
      <h2>{outroTitle}</h2>
      <div className="row">
        <Markdown className="col-md-6" source={outroText1} />
        <Markdown className="col-md-6" source={outroText2} />
      </div>
    </PageSection>

    <Banner
      buttonLink={bannerButtonUrl}
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
  // eslint-disable-next-line react/require-default-props
  projects: ProjectList.propTypes.projects,
  image1: PropTypes.shape(imagePropTypes).isRequired,
  outroTitle: PropTypes.string.isRequired,
  outroText1: PropTypes.string.isRequired,
  outroText2: PropTypes.string.isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  bannerButtonUrl: PropTypes.string.isRequired,
}

ApproachDe.defaultProps = {
  metaDescription: undefined,
}

ApproachDe.getInitialProps = async function initialProps({ query }) {
  return fetchApproachDePage(getLocaleFromQuery(query))
}

export default LayoutWrapper(ApproachDe)

