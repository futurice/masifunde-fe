import { FC } from 'react'
import styled from 'styled-components'
import { volunteerOpening } from '../../content/wie-sie-helfen-content'
import { smallFontSize } from '../../styling/typography'
import Markdown from '../shared/Markdown'

// Props
// =====

export type Props = {
  volunteerOpenings: volunteerOpening[]
}

// Helpers
// =======

const VolunteerOpeningsContainer = styled.div`
  font-size: ${smallFontSize};
`

// Component
// =========

const VolunteerOpeningsList: FC<Props> = ({ volunteerOpenings }) => (
  <VolunteerOpeningsContainer className="row">
    {volunteerOpenings.map((opening) => (
      <div className="col-md-4" key={opening.description}>
        <h3>{opening.title}</h3>
        <Markdown source={opening.description} />
      </div>
    ))}
  </VolunteerOpeningsContainer>
)

export default VolunteerOpeningsList
