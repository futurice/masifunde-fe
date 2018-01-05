import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Markdown from './Markdown'
import imageShape from '../propTypes/image'
import { smBreakpoint } from '../styling/breakpoints'

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  
  @media (min-width: ${smBreakpoint}) {
    justify-content: flex-end;
  }
`

const Image = styled.img`
  height: auto;
  width: 100%;
  max-width: 160px;
  margin-bottom: 1rem;
  
  @media (min-width: ${smBreakpoint}) {
    margin-bottom: 0;
  }
`

const Title = styled.h3`
  text-align: center;
  
  @media (min-width: ${smBreakpoint}) {
    text-align: left;
  }
`

const AwardContainer = styled.div`
  &:not(:first-of-type) {
    margin-top: 2rem;
  }
`

const Award = ({ description, image, name }) => (
  <AwardContainer className="row">
    <ImageContainer className="col-xs-12 col-sm-3">
      <Image
        alt={name}
        src={image.url}
      />
    </ImageContainer>
    <div className="col-sm-8">
      <Title>{name}</Title>
      <Markdown source={description} />
    </div>
  </AwardContainer>
)

Award.propTypes = {
  description: PropTypes.string.isRequired,
  image: PropTypes.shape(imageShape).isRequired,
  name: PropTypes.string.isRequired,
}

export default Award
