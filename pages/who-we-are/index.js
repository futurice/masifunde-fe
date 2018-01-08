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
import PartnersList, { propTypes as partnersListPropTypes } from '../../components/PartnersList'
import { imagePropTypes } from '../../propTypes/image'
import IntroText from '../../components/IntroText'
import PageSection from '../../components/PageSection'
import Award from '../../components/Award'

const Image = styled.img`
  width: 100%;
  height: 100%;
`

const CountryContainer = styled.div`
  margin-top: 1rem;
`

const ImageContainer = styled.div`
  flex-grow: 1;
  height: 270px;

  @media screen and (min-width: 992px) {
    height: 400px;
  }
`

const TeamButton = Button.extend`
  margin-top: 3rem;
`

const CountryMap = ({ buttonText, image, route }) => (
  <CountryContainer className="col-md-6 d-flex flex-column align-items-center">
    <ImageContainer className="d-flex justify-content-center w-100 align-items-center">
      <Image className="col-xs-8 col-sm-10 col-md-11 col-lg-10" src={image.url} alt={image.title} />
    </ImageContainer>
    <Link route={route} passHref>
      <TeamButton>{buttonText}</TeamButton>
    </Link>
  </CountryContainer>
)

CountryMap.propTypes = {
  buttonText: PropTypes.string.isRequired,
  image: PropTypes.shape(imagePropTypes).isRequired,
  route: PropTypes.string.isRequired,
}

const StyledPartnerList = styled(PartnersList)`
  margin-bottom: 2rem;
`

const AwardsContainer = styled.div`
  margin-top: 2rem;
`

const WhoWeAre = ({
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
  awards,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <Hero
      backgroundPositionX="70%"
      headline={title}
      imageUrl="/static/images/hero/hero-arts.jpg"
      headlinePlacement="bottom"
      headlineShadow
    />

    <PageSection>
      <h1>{paragraphOneTitle}</h1>
      <IntroText source={paragraphOneText} />
      <div className="row justify-content-md-center">
        <CountryMap route={RouteNames.TeamDE} buttonText={teamDeButtonText} image={teamDeImage} />
        <CountryMap route={RouteNames.TeamSA} buttonText={teamSaButtonText} image={teamSaImage} />
      </div>
    </PageSection>

    <PageSection>
      <h1>{paragraphTwoTitle}</h1>
      <IntroText source={paragraphTwoText} />
      <StyledPartnerList partnersList={partnersListOne} />
      <Link route={RouteNames.BecomePartner} passHref>
        <Button center>{partnersButtonText}</Button>
      </Link>
    </PageSection>

    <PageSection>
      <h1>{paragraphThreeTitle}</h1>
      <IntroText source={paragraphThreeText} />
      <AwardsContainer>
        {awards.map(award => (
          <Award key={award.name} {...award} />
        ))}
      </AwardsContainer>
    </PageSection>

    <Banner
      headline={bannerHeadline}
      buttonText={bannerText}
      buttonLink={RouteNames.BecomeVolunteer}
    />
  </div>
)

WhoWeAre.propTypes = {
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
  awards: PropTypes.arrayOf(PropTypes.shape(Award.propTypes)).isRequired,
  bannerText: PropTypes.string.isRequired,
}

WhoWeAre.defaultProps = {
  partnersListOne: [],
  partnersListTwo: [],
  metaDescription: undefined,
}

WhoWeAre.getInitialProps = async function initialProps() {
  return fetchWhoWeArePage()
}

export default LayoutWrapper(WhoWeAre)
