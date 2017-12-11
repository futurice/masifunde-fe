import React from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LayoutWrapper from '../../components/LayoutWrapper'
import Banner from '../../components/Banner'
import Head from '../../components/Head'
import { RouteNames } from '../../routes'
import Markdown from '../../components/Markdown'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchBecomeASponsorPage } from '../../api/howToSupport'
import imagePropTypes from '../../propTypes/image'
import { subtitle } from '../../styling/typography'
import FundRaisingForm from '../../components/Fundraisingbox/FundRaisingForm'

const H2 = styled.h2`
  ${subtitle}
`

const BecomeSponsor = ({
  metaTitle,
  metaDescription,
  title,
  introSubtitle1,
  introMarkdown1,
  introSubtitle2,
  introMarkdown2,
  image,
  bannerTitle,
  bannerButtonText,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <Container>
      <div>
        <h1>{title}</h1>
        <div className="row">
          <div className="col-12 col-md-7">
            <H2>{introSubtitle1}</H2>
            <Markdown source={introMarkdown1} />
            <H2>{introSubtitle2}</H2>
            <Markdown source={introMarkdown2} />
          </div>
          <div className="img-fluid col-12 col-md-5">
            <img src={image.url} alt={image.title} />
          </div>
        </div>
      </div>

      <FundRaisingForm hiddenFields={{}} onSubmit={() => {}} />
    </Container>
    <Banner headline={bannerTitle} buttonText={bannerButtonText} buttonLink={RouteNames.Contact} />
  </div>
)

BecomeSponsor.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  title: PropTypes.string.isRequired,
  introSubtitle1: PropTypes.string.isRequired,
  introMarkdown1: PropTypes.string.isRequired,
  introSubtitle2: PropTypes.string.isRequired,
  introMarkdown2: PropTypes.string.isRequired,
  image: PropTypes.shape(imagePropTypes).isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
}

BecomeSponsor.defaultProps = {
  metaDescription: undefined,
}

BecomeSponsor.getInitialProps = async function getInitialProps({ query }) {
  return fetchBecomeASponsorPage(getLocaleFromQuery(query))
}

export default LayoutWrapper(BecomeSponsor)

