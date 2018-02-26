/* eslint-disable no-param-reassign */
import React, { Component } from 'react'
import Carousel from 'nuka-carousel'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _throttle from 'lodash/throttle'

import Markdown from './Markdown'
import portraitPropTypes from '../propTypes/portrait'
import { bodyText, rem, subsectionTitleText } from '../styling/typography'
import ConditionalContainer from './ConditionalContainer'
import { mdBreakpoint } from '../styling/breakpoints'
import { largeSpacing, extraSmallSpacing, smallSpacing } from '../styling/sizes'

const sliderArrowSize = '70px'

const CarouselTextContainer = styled.div`
  ${bodyText};
  padding: ${smallSpacing} ${extraSmallSpacing};
  color: white;

  p {
    color: white;
    margin: 0 0 ${smallSpacing} 0;
  }

  p:last-child {
    margin-bottom: 0;
  }

  @media (min-width: ${mdBreakpoint}) {
    // Don't let the text run into the next-slide button
    padding: 3.5rem ${largeSpacing};
    padding-right: calc(${sliderArrowSize} + ${extraSmallSpacing});
  }
`

const CarouselTextTitle = styled.p`
  ${subsectionTitleText};
  color: white;
  font-weight: bold;
`

const Image = styled.div`
  background: url(${props => props.src});
  padding-right: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  display: none;
  @media (min-width: ${mdBreakpoint}) {
    display: block;
  }
`

const CarouselContainer = styled.div`
  padding-bottom: 3.5rem;
`

const MobileImage = styled.img`
  height: 100%;
  width: 100%;
  padding: 0;

  display: block;
  @media (min-width: ${mdBreakpoint}) {
    display: none;
  }
`

const StyledCarousel = styled(Carousel)`
  background: ${props => props.theme.blue};
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
    background-image: url(/static/images/carousel-arrow.svg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: ${sliderArrowSize};
    height: ${sliderArrowSize};

    @media (min-width: ${mdBreakpoint}) {
      top: 50% !important;
    }

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
    window.addEventListener('resize', this.resizeCarousel, true)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.resizeCarousel, true)
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

  repositionArrowsInMobileCarousel = () => {
    requestAnimationFrame(() => {
      const leftArrow = this.carouselComponent.querySelector('.slider-decorator-0')
      const rightArrow = this.carouselComponent.querySelector('.slider-decorator-1')

      // This assumes all slide images have the same height, which is currently the case.
      const firstSlideImage = this.carouselComponent.querySelector('li.slider-slide img')
      leftArrow.style.top = `calc(${firstSlideImage.offsetHeight}px / 2)`
      rightArrow.style.top = `calc(${firstSlideImage.offsetHeight}px / 2)`
    })
  }

  resizeCarousel = _throttle(() => {
    /*
    The nuka-carousel component doesn't properly size items.
    It tries to calculate the height too early.
    Hence we need to go programatically adjust the height.
    The timeouts make sure the render has indeed happened before calculating the height.
    */
    this.setSlideContainerHeight()
    this.adjustSlideHeightsToDisplayImage()
    this.repositionArrowsInMobileCarousel()
  }, 300)

  render() {
    const { portrait } = this.props
    const settings = {
      wrapAround: true,
    }
    const items = mapPortraitToCarouselItems(portrait)
    return (
      <CarouselContainer innerRef={(carousel) => { this.carouselComponent = carousel }}>
        <StyledCarousel {...settings}>
          {items.map(item => (
            <SlideRow className="row" key={`${item.heading} ${item.image.url}`}>
              <Image className="col-md-4" src={item.image.url} alt="" />
              <MobileImage src={item.image.url} alt="" />
              <CarouselTextContainer className="col-md-8">
                <CarouselTextTitle>{item.heading}</CarouselTextTitle>
                <Markdown source={item.text} />
              </CarouselTextContainer>
            </SlideRow>
          ))}
        </StyledCarousel>
      </CarouselContainer>
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
