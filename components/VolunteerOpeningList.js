import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Markdown from './Markdown'
import { smallFontSize } from '../styling/typography'

const VolunteerOpeningsContainer = styled.div`
  font-size: ${smallFontSize};
`

const VolunteerOpeningsList = ({ volunteerOpenings }) => (
  <VolunteerOpeningsContainer className="row">
    {volunteerOpenings.map(opening => (
      <div className="col-md-4" key={opening.description}>
        <h3>{opening.title}</h3>
        <Markdown source={opening.description} />
      </div>
    ))}
  </VolunteerOpeningsContainer>
)

VolunteerOpeningsList.propTypes = {
  volunteerOpenings: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })),
}

VolunteerOpeningsList.defaultProps = {
  volunteerOpenings: [],
}

export default VolunteerOpeningsList
