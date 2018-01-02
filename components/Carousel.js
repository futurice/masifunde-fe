/* eslint-disable no-param-reassign */
import React, { Component } from 'react'
import Carousel from 'nuka-carousel'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _throttle from 'lodash/throttle'

import Markdown from './Markdown'
import portraitPropTypes from '../propTypes/portrait'
import { rem } from '../styling/typography'
import { jpgCompression } from '../utils/constants'
import ConditionalContainer from './ConditionalContainer'

const H3 = styled.h3`
  font-weight: bold;
  color: white;
`

const CarouselTextContainer = styled.div`
  padding: 1.5rem 6rem 1.5rem 4rem;
  color: white;
`

const Image = styled.div`
  background: url(${props => props.src});
  padding-right: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const MobileImage = styled.img``

const StyledCarousel = styled(Carousel)`
  background: ${props => props.theme.blue};
  margin-bottom: 8rem;
  width: 100% !important;

  &:hover {
    .slider-decorator-0, .slider-decorator-1 {
      opacity: 1;
    }
  }

  .slider-decorator-2 {
    bottom: ${rem('-90px')} !important;
    z-index: 10;

    li button {
      color: ${props => props.theme.pineCone} !important;
      font-size: ${rem('48px')} !important;
    }
  }

  .slider-decorator-0, .slider-decorator-1 {
    opacity: 0;
    transition: 300ms;
    background-image: url(../static/images/carousel-arrow.svg);
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

const SlideRow = styled.div`
  margin-left: 0;
  margin-right: 0;
  height: 100%;
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

const mobileImageHidden = mobileImage => mobileImage.offsetHeight === 0

class MasifundeCarousel extends Component {
  componentDidMount = () => {
    window.requestAnimationFrame(() => this.resizeCarousel())
    window.addEventListener('resize', this.throttleResizeCarousel, true)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.throttleResizeCarousel, true)
  }

  setSlideContainerHeight = () => {
    const sliderList = this.carouselComponent.querySelector('ul.slider-list')
    const firstSlide = sliderList.firstChild
    requestAnimationFrame(() => {
      sliderList.style.height = `${firstSlide.offsetHeight}px`
    })
  }

  adjustSlideHeightsToDisplayImage = () => {
    const slides = Array.from(this.carouselComponent.querySelectorAll('li.slider-slide'))
    requestAnimationFrame(() => {
      slides.forEach((slide) => {
        const mobileImage = slide.querySelector('img')
        if (mobileImageHidden(mobileImage)) {
          slide.style.height = '100%'
        } else {
          slide.style.height = 'auto'
        }
      })
    })
  }

  resizeCarousel = () => {
    /*
    The nuka-carousel component doesn't properly size items.
    It tries to calculate the height too early.
    Hence we need to go programatically adjust the height.
    The timeouts make sure the render has indeed happened before calculating the height.
    */
    this.setSlideContainerHeight()
    this.adjustSlideHeightsToDisplayImage()
  }

  throttleResizeCarousel = _throttle(this.resizeCarousel, 1000)
  render() {
    const { portrait } = this.props
    const settings = {
      wrapAround: true,
    }
    const items = mapPortraitToCarouselItems(portrait)
    return (
      <div ref={(carousel) => { this.carouselComponent = carousel }}>
        <StyledCarousel {...settings}>
          {items.map(item => (
            <SlideRow key={`${item.heading} ${item.image.url}`} className="row">
              <Image className="d-none d-md-block col-md-4 col-lg-3" src={`${item.image.url}?q=${jpgCompression}`} alt={item.image.title} />
              <MobileImage className="d-md-none p-0 w-100 h-100" src={`${item.image.url}?q=${jpgCompression}`} alt={item.image.title} />
              <CarouselTextContainer className="col-md-8 col-lg-9">
                <H3 className="row">{item.heading}</H3>
                <Markdown className="row" source={item.text} />
              </CarouselTextContainer>
            </SlideRow>
          ))}
        </StyledCarousel>
      </div>
    )
  }
}

MasifundeCarousel.propTypes = {
  portrait: PropTypes.shape(portraitPropTypes).isRequired,
}

const ContainedCarousel = props => (
  <ConditionalContainer containAfter="md" >
    <MasifundeCarousel {...props} />
  </ConditionalContainer>
)

export default ContainedCarousel
