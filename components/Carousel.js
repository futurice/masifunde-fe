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

const CarouselTextContainer = styled.div`
  background-color: ${props => props.theme.blue};
  color: white;
  padding: 3rem 6rem;
`

const H3 = styled.h3`
  font-weight: bold;
`

const Image = styled.img`
  padding-right: 0;
`

const PaddedMarkdown = styled(Markdown)`
  padding-left: 0.8rem;
`

const StyledCarousel = styled(Carousel)`
  margin-bottom: 50px !important;
  
  .carousel-control-next, .carousel-control-prev {
    opacity: 1;
    cursor: pointer;
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
    this.state = { activeIndex: 0 }
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
    const nextIndex = this.state.activeIndex === this.props.items.length - 1
      ? 0
      : this.state.activeIndex + 1
    this.setState({ activeIndex: nextIndex })
  }

  previous() {
    if (this.animating) return
    const nextIndex = this.state.activeIndex === 0
      ? this.props.items.length - 1
      : this.state.activeIndex - 1
    this.setState({ activeIndex: nextIndex })
  }

  goToIndex(newIndex) {
    if (this.animating) return
    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    const slides = this.props.items.map(item => (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={item.heading}
        altText={item.altText}
      >
        <div className="row">
          <Image className="col-md-3 img-fluid h-100" src={item.image.url} alt={item.image.title} />
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
          items={this.props.items}
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
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

export default MasifundeCarousel
