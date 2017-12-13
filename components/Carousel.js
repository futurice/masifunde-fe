import React, { Component } from 'react'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Markdown from './Markdown'
import portraitPropTypes from '../propTypes/portrait'

const mapPortraitToCarouselItems = (portrait) => {
  const item1 = {
    image: portrait.page1Image,
    heading: portrait.page1Heading,
    text: portrait.page1Text,
    key: 1,
  }
  const item2 = {
    image: portrait.page2Image,
    heading: portrait.page2Heading,
    text: portrait.page2Text,
    key: 2,
  }
  const item3 = {
    image: portrait.page3Image,
    heading: portrait.page3Heading,
    text: portrait.page3Text,
    key: 3,
  }
  return [item1, item2, item3]
}

const CarouselTextContainer = styled.div`
  background-color: ${props => props.theme.blue};
  color: white;
  padding: 3rem 6rem;
`

const H3 = styled.h3`
  font-weight: bold;
  color: white;
`

const Image = styled.div`
  background: url(${props => props.src});
  padding-right: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  height: 65vw;
  
  @media screen and (min-width: 768px) {
    background-size: cover;
    height: auto;
  }
`

const PaddedMarkdown = styled(Markdown)`
  padding-left: 0.8rem;
`

const carouselControlPadding = '1rem'

const StyledCarousel = styled(Carousel)`
  margin-bottom: 50px !important;
  
  &:hover {
    @media screen and (min-width: 768px) {
      .carousel-control-next, .carousel-control-prev {
        opacity: 1;
      }
    }
  }
  
  .carousel-control-next, .carousel-control-prev {
    cursor: pointer;
    display: flex;
    opacity: 0;
    transition: 200ms;
  }
  
  .carousel-control-next {
    justify-content: flex-end;
    padding-right: ${carouselControlPadding};
  }
  
  .carousel-control-prev {
    justify-content: flex-start;
    padding-left: ${carouselControlPadding};
  }
  
  .carousel-control-next-icon, .carousel-control-prev-icon {
    width: 80px;
    height: 80px;
    background-image: url(../static/carousel-arrow.svg);
  }
  
  .carousel-control-prev-icon {
    transform: rotateY(180deg);
  }
 
  .carousel-indicators {
    bottom: -50px !important;
    color: black;
    padding-top: 25px;
    
    > li {
      &.active {
        background-color: ${props => props.theme.pineCone};
      }
      
      cursor: pointer;
      border: 2px solid ${props => props.theme.pineCone};
      height: 18px;
      width: 18px;
      border-radius: 100%;
    }
  }
`

class MasifundeCarousel extends Component {
  constructor(props) {
    super(props)
    this.state = { activeIndex: 0, items: mapPortraitToCarouselItems(this.props.portrait) }
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.goToIndex = this.goToIndex.bind(this)
    this.onExiting = this.onExiting.bind(this)
    this.onExited = this.onExited.bind(this)
  }

  onExiting() {
    this.animating = true
  }

  onExited() {
    this.animating = false
  }

  next() {
    if (this.animating) return
    const nextIndex = this.state.activeIndex === this.state.items.length - 1
      ? 0
      : this.state.activeIndex + 1
    this.setState({ activeIndex: nextIndex })
  }

  previous() {
    if (this.animating) return
    const nextIndex = this.state.activeIndex === 0
      ? this.state.items.length - 1
      : this.state.activeIndex - 1
    this.setState({ activeIndex: nextIndex })
  }

  goToIndex(newIndex) {
    if (this.animating) return
    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex, items } = this.state
    const slides = items.map(item => (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={item.key}
        altText={item.altText}
      >
        <div className="row">
          <Image className="col-md-3" src={item.image.url} alt={item.image.title} />
          <CarouselTextContainer className="col-md-9">
            <H3 className="row">{item.heading}</H3>
            <PaddedMarkdown className="row" source={item.text} />
          </CarouselTextContainer>
        </div>
      </CarouselItem>
    ))

    return (
      <StyledCarousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        interval={false}
      >
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </StyledCarousel>
    )
  }
}

MasifundeCarousel.propTypes = {
  portrait: PropTypes.shape(portraitPropTypes).isRequired,
}

export default MasifundeCarousel
