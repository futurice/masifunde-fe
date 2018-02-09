import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { lgBreakpoint, smBreakpoint } from '../styling/breakpoints'
import { largeSpacing, mediumSpacing, extraSmallSpacing } from '../styling/sizes'

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

const GroupName = Span.extend`
  font-weight: bold;
`

const Email = Span.withComponent('a').extend`
  display: block;
  word-break: break-all;
`

const Image = styled.img`
  height: 320px;
`

const RegionalGroups = ({ regionalGroups }) => (
  <GroupsContainer className="row">
    <Image className="col-md-5" src={regionalGroups.image.url} alt={regionalGroups.image.title} />
    <LocationsList className="list-unstyled col-xl-6">
      {regionalGroups.regions.map(place => (
        <LocationListItem key={place.name}>
          <GroupName>{place.name}</GroupName>
          <Span>{place.contactPerson}</Span>
          <Email href={`mailto:${place.email}`}>{place.email}</Email>
        </LocationListItem>
      ))}
    </LocationsList>
  </GroupsContainer>
)

RegionalGroups.propTypes = {
  regionalGroups: PropTypes.oneOfType([PropTypes.array, PropTypes.shape()]).isRequired,
}

export default RegionalGroups
