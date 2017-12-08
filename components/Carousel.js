import React from 'react'
import Carousel from 'nuka-carousel'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Markdown from './Markdown'
import portraitPropTypes from '../propTypes/portrait'

const H3 = styled.h3`
  font-weight: bold;
`

const CarouselTextContainer = styled.div`
  padding: 1.5rem 3rem;
  color: white;
`

const PaddedMarkdown = styled(Markdown)`
  padding: 0 1rem;
`

const StyledSlider = styled(Carousel)`
  background: ${props => props.theme.blue};
  margin-bottom: 90px;
  
  .slider-decorator-2 {
    bottom: -90px !important;
    z-index: 10;
    
    li button {
      color: ${props => props.theme.pineCone} !important;
      font-size: 2.4rem !important;
    }
  }
  
  .slider-decorator-0, .slider-decorator-1 {
    background-image: url(/static/carousel-arrow.svg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 70px;
    height: 70px;
    
    button {
      opacity: 0 !important;
    }
  }
  
  .slider-decorator-0 {
    transform: rotateY(180deg) translateY(-50%) !important;
  }
`

const mapPortraitToCarouselItems = (portrait) => {
  const item1 = {
    image: portrait.page1Image,
    heading: portrait.page1Heading,
    text: portrait.page1Text,
  }
  const item2 = {
    image: portrait.page2Image,
    heading: portrait.page2Heading,
    text: portrait.page2Text,
  }
  const item3 = {
    image: portrait.page3Image,
    heading: portrait.page3Heading,
    text: portrait.page3Text,
  }
  return [item1, item2, item3]
}

const MasifundeCarousel = ({ portrait }) => {
  const settings = {
    wrapAround: true,
  }
  const items = mapPortraitToCarouselItems(portrait)
  return (
    <StyledSlider {...settings}>
      {items.map(item => (
        <div key={`${item.heading} ${item.image.url}`} className="row">
          <img className="col-md-3 img-fluid h-100" src={item.image.url} alt={item.image.title} />
          <CarouselTextContainer className="col-md-9">
            <H3 className="row">{item.heading}</H3>
            <PaddedMarkdown className="row" source={item.text} />
          </CarouselTextContainer>
        </div>
      ))}
    </StyledSlider>
  )
}

MasifundeCarousel.propTypes = {
  portrait: PropTypes.shape(portraitPropTypes).isRequired,
}

export default MasifundeCarousel
