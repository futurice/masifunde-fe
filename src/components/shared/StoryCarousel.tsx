import NukaCarousel from 'nuka-carousel'
import { FC, useCallback, useState } from 'react'
import styled from 'styled-components'
import { bodyText, rem, subsectionTitleText } from '../../styling/typography'
import { mdBreakpoint } from '../../styling/breakpoints'
import {
  largeSpacing,
  extraSmallSpacing,
  smallSpacing,
} from '../../styling/sizes'
import ConditionalContainer from '../ConditionalContainer'
import Markdown from './Markdown'

// Props
// =====

export type Props = {
  slides: StoryCarouselSlide[]
}

export type StoryCarouselSlide = {
  imageUrl: string
  heading: string
  text: string
}

// Constants
// =========

const sliderArrowSize = '70px'

// Helpers
// =======

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

const Image = styled.div<{ src: string }>`
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

const SlideRow = styled.div`
  margin-left: 0 !important;
  margin-right: 0 !important;
  height: 100%;
`

type ArrowButtonProps = {
  focused: boolean
  direction: 'left' | 'right'
  // These two are passed through by nuka-carousel
  previousSlide: () => void
  nextSlide: () => void
}

const StyledArrowButton = styled.button<{ focused: boolean }>`
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

const ArrowButton: FC<ArrowButtonProps> = ({
  focused,
  direction,
  previousSlide,
  nextSlide,
}) => (
  <StyledArrowButton
    focused={focused}
    onClick={direction === 'left' ? previousSlide : nextSlide}
  >
    <img
      src={`/static/images/carousel-arrow-${direction}.svg`}
      alt={direction === 'left' ? 'Links' : 'Rechts'}
    />
  </StyledArrowButton>
)

const StoryCarousel: FC<Props> = ({ slides }) => {
  const [focused, setFocused] = useState(false)

  const handleFocusIn = useCallback(() => setFocused(true), [])
  const handleFocusOut = useCallback(() => setFocused(false), [])

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
          {slides.map((slide) => (
            <SlideRow
              className="row"
              key={`${slide.heading} ${slide.imageUrl}`}
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image className="col-md-4" src={slide.imageUrl} />
              <MobileImage src={slide.imageUrl} alt="" />
              <CarouselTextContainer className="col-md-8">
                <CarouselTextTitle>{slide.heading}</CarouselTextTitle>
                <Markdown source={slide.text} />
              </CarouselTextContainer>
            </SlideRow>
          ))}
        </StyledCarousel>
      </CarouselContainer>
    </ConditionalContainer>
  )
}

export default StoryCarousel
