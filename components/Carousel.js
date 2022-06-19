/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import NukaCarousel from 'nuka-carousel'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import portraitPropTypes from '../propTypes/portrait'
import { bodyText, rem, subsectionTitleText } from '../styling/typography'
import { mdBreakpoint } from '../styling/breakpoints'
import { largeSpacing, extraSmallSpacing, smallSpacing } from '../styling/sizes'
import ConditionalContainer from './ConditionalContainer'
import Markdown from './Markdown'

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
  background: url(${(props) => props.src});
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

const StyledCarousel = styled(NukaCarousel)`
  background: ${(props) => props.theme.blue};
  width: 100% !important;

  &:hover {
    .slider-decorator-0,
    .slider-decorator-1 {
      button {
        opacity: 1;
      }
    }
  }

  .slider-decorator-2 {
    bottom: ${rem('-90px')} !important;
    z-index: 10;

    li button {
      color: ${(props) => props.theme.pineCone} !important;
      font-size: ${rem('48px')} !important;
    }
  }
`

const StyledArrowButton = styled.button`
  background-color: transparent;
  padding: ${extraSmallSpacing};
  border: none;
  cursor: pointer;
  opacity: ${(props) => (props.focused ? 1 : 0)};
  transition: opacity 300ms;

  img {
    width: ${sliderArrowSize};
    height: ${sliderArrowSize};
  }

  &:focus {
    outline: 0;
    filter: drop-shadow(0px 0px 3px white);
  }
`

const SlideRow = styled.div`
  margin-left: 0 !important;
  margin-right: 0 !important;
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

const ArrowButton = (props) => {
  const { direction, focused, previousSlide, nextSlide } = props
  return (
    <StyledArrowButton
      focused={focused}
      onClick={direction === 'left' ? previousSlide : nextSlide}
    >
      {direction === 'left' ? (
        <img src="/static/images/carousel-arrow-left.svg" alt="links" />
      ) : (
        <img src="/static/images/carousel-arrow-right.svg" alt="rechts" />
      )}
    </StyledArrowButton>
  )
}

ArrowButton.propTypes = {
  direction: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,

  // These two are passed through by nuka-carousel
  previousSlide: PropTypes.func.isRequired,
  nextSlide: PropTypes.func.isRequired,
}

export default function Carousel({ portrait }) {
  const items = mapPortraitToCarouselItems(portrait)
  const [focused, setFocused] = useState(false)

  const handleFocusIn = () => setFocused(true)
  const handleFocusOut = () => setFocused(false)

  return (
    <ConditionalContainer containAfter="md">
      <CarouselContainer
        onFocus={handleFocusIn}
        onMouseEnter={handleFocusIn}
        onBlur={handleFocusOut}
        onMouseLeave={handleFocusOut}
      >
        <StyledCarousel
          wrapAround
          renderCenterLeftControls={(props) => (
            <ArrowButton direction="left" focused={focused} {...props} />
          )}
          renderCenterRightControls={(props) => (
            <ArrowButton direction="right" focused={focused} {...props} />
          )}
        >
          {items.map((item) => (
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
    </ConditionalContainer>
  )
}

Carousel.propTypes = {
  portrait: PropTypes.shape(portraitPropTypes).isRequired,
}
