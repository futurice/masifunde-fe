import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const LocationsList = styled.ul`
  column-count: 2;
  list-style-type: none;  
  margin-bottom: 0;
`

const LocationListItem = styled.li`
  padding: 0.6rem 2rem;
  padding-left: 0;  
`

const ImageContainer = styled.div`
  margin: 3rem 0 4.5rem 0;
`

const RegionalGroups = ({ regionalGroups }) => (
  <ImageContainer className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center">
    <img className="col-sm-12 col-md-4" src={regionalGroups.image.url} alt={regionalGroups.image.title} />
    <LocationsList className="list-unstyled offset-md-1 col-md-3">
      {regionalGroups.regions.map(place => (
        <LocationListItem key={place}>{place}</LocationListItem>
      ))}
    </LocationsList>
  </ImageContainer>
)

RegionalGroups.propTypes = {
  regionalGroups: PropTypes.oneOfType([PropTypes.array, PropTypes.shape()]).isRequired,
}

export default RegionalGroups
