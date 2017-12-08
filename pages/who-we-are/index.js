/* eslint-disable jsx-a11y/anchor-is-valid, function-paren-newline, react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { fetchWhoWeArePage } from '../../api/whoWeAre'
import LayoutWrapper from '../../components/LayoutWrapper'
import Head from '../../components/Head'
import Button from '../../components/Button'
import { Link, RouteNames } from '../../routes'
import Hero from '../../components/Hero'
import Banner from '../../components/Banner'
import Markdown from '../../components/Markdown'
import PartnersList, { propTypes as partnersListPropTypes } from '../../components/PartnersList'

const Heading2 = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
`

const StyledMarkdown = styled(Markdown)`
  text-align: center;
  margin-bottom: 3rem;
`

const Image = styled.img`
  margin-bottom: 3rem;
`

const About = ({
  title,
  paragraphOneTitle,
  paragraphOneText,
  paragraphTwoTitle,
  paragraphTwoText,
  paragraphThreeTitle,
  paragraphThreeText,
  bannerHeadline,
  bannerText,
  metaDescription,
  metaTitle,
  partnersButtonText,
  teamSaButtonText,
  teamDeButtonText,
  partnersListOne,
  partnersListTwo,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <Hero headline={title} imageUrl="//via.placeholder.com/350x150/555" />
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 d-flex flex-column align-items-center">
          <Heading2>{paragraphOneTitle}</Heading2>
          <StyledMarkdown source={paragraphOneText} />
        </div>
      </div>
      <div className="row justify-content-md-center">
        <div className="col-lg-4 d-flex flex-column align-items-center justify-content-end">
          <Image className="img-fluid" src="../static/de-silhouette.svg" alt="" />
          <Link route={RouteNames.TeamDE} passHref>
            <Button>{teamDeButtonText}</Button>
          </Link>
        </div>
        <div className="col-lg-4 d-flex flex-column align-items-center justify-content-end">
          <Image className="img-fluid" src="../static/sa-silhouette.svg" alt="" />
          <Link route={RouteNames.TeamSA} passHref>
            <Button>{teamSaButtonText}</Button>
          </Link>
        </div>
      </div>
      <div className="row justify-content-md-center">
        <div className="col-lg-8">
          <Heading2>{paragraphTwoTitle}</Heading2>
          <StyledMarkdown source={paragraphTwoText} />
        </div>
      </div>

      <PartnersList partnersList={partnersListOne} />

      <div className="row">
        <div className="col d-flex flex-column align-items-center">
          <Link route={RouteNames.BecomePartner} passHref>
            <Button>{partnersButtonText}</Button>
          </Link>
        </div>
      </div>
      <div className="row justify-content-md-center">
        <div className="col-lg-8">
          <Heading2>{paragraphThreeTitle}</Heading2>
          <StyledMarkdown source={paragraphThreeText} />
        </div>
      </div>

      <PartnersList partnersList={partnersListTwo} />
    </div>

    <Banner
      headline={bannerHeadline}
      buttonText={bannerText}
      buttonLink={RouteNames.BecomeVolunteer}
    />
  </div>
)

About.propTypes = {
  title: PropTypes.string.isRequired,
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  paragraphOneTitle: PropTypes.string.isRequired,
  paragraphOneText: PropTypes.string.isRequired,
  paragraphTwoTitle: PropTypes.string.isRequired,
  paragraphTwoText: PropTypes.string.isRequired,
  paragraphThreeText: PropTypes.string.isRequired,
  paragraphThreeTitle: PropTypes.string.isRequired,
  partnersButtonText: PropTypes.string.isRequired,
  teamDeButtonText: PropTypes.string.isRequired,
  teamSaButtonText: PropTypes.string.isRequired,
  bannerHeadline: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-typos
  partnersListOne: partnersListPropTypes.partnersList,
  // eslint-disable-next-line react/no-typos
  partnersListTwo: partnersListPropTypes.partnersList,
  bannerText: PropTypes.string.isRequired,
}

About.defaultProps = {
  partnersListOne: [],
  partnersListTwo: [],
  metaDescription: undefined,
}

About.getInitialProps = async function initialProps() {
  return fetchWhoWeArePage()
}

export default LayoutWrapper(About)
