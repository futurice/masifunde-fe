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
import { imagePropTypes } from '../../propTypes/image'

const Heading2 = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
`

const StyledMarkdown = styled(Markdown)`
  text-align: center;
`

const StyledMarkdownNoMarginBottom = StyledMarkdown.extend`
  p {
    margin-bottom: 0;
  }
`

const Image = styled.img`
  margin-bottom: 2rem;
  width: 100%;
  height: 100%;
`

const CountryContainer = styled.div`
  margin-top: 2rem;
`

const ImageContainer = styled.div`
  flex-grow: 1;
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
  teamSaImage,
  teamSaButtonText,
  teamDeImage,
  teamDeButtonText,
  partnersListOne,
  partnersListTwo,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <Hero backgroundPositionX="70%" headline={title} imageUrl="/static/images/hero/hero-arts.jpg" />
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 d-flex flex-column align-items-center">
          <Heading2>{paragraphOneTitle}</Heading2>
          <StyledMarkdownNoMarginBottom className="w-100" source={paragraphOneText} />
        </div>
      </div>
      <div className="row justify-content-md-center">
        <CountryContainer className="col-md-6 d-flex flex-column align-items-center">
          <ImageContainer className="d-flex justify-content-center w-100 align-items-center">
            <Image className="col-xs-8 col-sm-10 col-md-11 col-lg-10" src={teamDeImage.url} alt={teamDeImage.title} />
          </ImageContainer>
          <Link route={RouteNames.TeamDE} passHref>
            <Button>{teamDeButtonText}</Button>
          </Link>
        </CountryContainer>
        <CountryContainer className="col-md-6 d-flex flex-column align-items-center">
          <ImageContainer className="d-flex justify-content-center w-100 align-items-center">
            <Image className="col-xs-8 col-sm-10 col-md-11 col-lg-10" src={teamSaImage.url} alt={teamSaImage.title} />
          </ImageContainer>
          <Link route={RouteNames.TeamSA} passHref>
            <Button>{teamSaButtonText}</Button>
          </Link>
        </CountryContainer>
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
  teamDeImage: PropTypes.shape(imagePropTypes).isRequired,
  teamDeButtonText: PropTypes.string.isRequired,
  teamSaImage: PropTypes.shape(imagePropTypes).isRequired,
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
