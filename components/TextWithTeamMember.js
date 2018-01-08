import React from 'react'
import PropTypes from 'prop-types'

import Markdown from './Markdown'
import TeamMember from './TeamMember'
import teamMemberShape from '../propTypes/teamMember'


const TextWithTeamMember = ({ text, teamMember }) => (
  <div className="row">
    <div className="col-md-9">
      <Markdown source={text} />
    </div>
    <TeamMember
      className="col-md-3"
      imageUrl={teamMember.image.url}
      title={teamMember.name}
      subtitle={teamMember.responsibilityArea}
      email={teamMember.email}
    />
  </div>
)

TextWithTeamMember.propTypes = {
  text: PropTypes.string.isRequired,
  teamMember: PropTypes.shape(teamMemberShape).isRequired,
}

export default TextWithTeamMember
