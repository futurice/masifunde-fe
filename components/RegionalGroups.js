import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const LocationsList = styled.ul`
  column-count: 2;
  list-style-type: none;  
  margin-bottom: 0;
`

const LocationListItem = styled.li`
  padding: 0.6rem 1rem;
  padding-left: 0;  
`

const ImageContainer = styled.div`
  margin: 3rem 0 4.5rem 0;
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
  <ImageContainer className="d-flex justify-content-center justify-content-lg-start flex-wrap flex-lg-nowrap align-items-center">
    <Image className="col-md-9 offset-lg-1 col-lg-5" src={regionalGroups.image.url} alt={regionalGroups.image.title} />
    <LocationsList className="list-unstyled col-lg-4">
      {regionalGroups.regions.map(place => (
        <LocationListItem key={place.name}>
          <GroupName>{place.name}</GroupName>
          <Span>{place.contactPerson}</Span>
          <Email href={`mailto:${place.email}`}>{place.email}</Email>
        </LocationListItem>
      ))}
    </LocationsList>
  </ImageContainer>
)

RegionalGroups.propTypes = {
  regionalGroups: PropTypes.oneOfType([PropTypes.array, PropTypes.shape()]).isRequired,
}

export default RegionalGroups
