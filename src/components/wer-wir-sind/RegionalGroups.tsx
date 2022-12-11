import { FC } from 'react'
import styled from 'styled-components'
import { RegionalGroupCountry } from '../../content/wer-wir-sind-content'
import { lgBreakpoint, smBreakpoint } from '../../styling/breakpoints'
import {
  extraSmallSpacing,
  largeSpacing,
  mediumSpacing,
} from '../../styling/sizes'

// Props
// =====

export type Props = {
  regionalGroups: RegionalGroupCountry
}

// Helpers
// =======

const LocationsList = styled.ul`
  @media (min-width: ${smBreakpoint}) {
    column-count: 2;
  }

  @media (min-width: ${lgBreakpoint}) {
    margin-top: 0;
  }
  margin-top: ${mediumSpacing};
  list-style-type: none;
  margin-bottom: 0;
`

const LocationListItem = styled.li`
  display: inline-block;
  padding: 0.6rem ${extraSmallSpacing};
  padding-left: 0;
`

const GroupsContainer = styled.div`
  margin-top: ${largeSpacing};
  margin-bottom: 4.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media (min-width: ${lgBreakpoint}) {
    justify-content: flex-start;
    flex-wrap: nowrap;
  }
`

const Span = styled.span`
  display: block;
`

const GroupName = styled(Span)`
  font-weight: bold;
`

const Email = styled(Span.withComponent('a'))`
  display: block;
  word-break: break-all;
`

const Image = styled.img`
  height: 320px;
`

// Component
// =========

const RegionalGroups: FC<Props> = ({ regionalGroups }) => (
  <GroupsContainer className="row">
    <Image
      className="col-md-5"
      src={regionalGroups.image.file.url}
      alt={regionalGroups.image.title}
    />
    <LocationsList className="list-unstyled col-xl-6">
      {regionalGroups.regions.map((group) => (
        <LocationListItem key={group.name}>
          <GroupName>{group.name}</GroupName>
          <Span>{group.contactPerson}</Span>
          <Email href={`mailto:${group.email}`}>{group.email}</Email>
        </LocationListItem>
      ))}
    </LocationsList>
  </GroupsContainer>
)

export default RegionalGroups
