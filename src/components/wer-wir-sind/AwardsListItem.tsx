import { FC } from 'react'
import styled from 'styled-components'
import { smBreakpoint } from '../../styling/breakpoints'
import { mediumSpacing, smallSpacing } from '../../styling/sizes'
import Markdown from '../shared/Markdown'

// Props
// =====

export type Props = {
  name: string
  logoUrl: string
  description: string
}

// Helpers
// =======

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
  margin-bottom: ${smallSpacing};
  margin-top: 2rem;

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
    margin-top: ${mediumSpacing};
  }
`

// Component
// =========

const AwardsListItem: FC<Props> = ({ name, logoUrl, description }) => (
  <AwardContainer className="row">
    <ImageContainer className="col-xs-12 col-sm-3">
      <Image alt={name} src={logoUrl} />
    </ImageContainer>
    <div className="col-sm-8">
      <Title>{name}</Title>
      <Markdown source={description} />
    </div>
  </AwardContainer>
)

export default AwardsListItem
