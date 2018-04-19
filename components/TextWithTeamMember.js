import React from 'react'
import PropTypes from 'prop-types'

import Markdown from './Markdown'
import TeamMember from './TeamMember'
import teamMemberShape from '../propTypes/teamMember'

const TextWithTeamMember = ({
  header,
  text,
  teamMember,
  teamMemberTitle,
  teamMemberSubtitle,
}) => (
  <div className="row">
    <div className="col-lg-8 offset-lg-2">
      <div className="row">
        <div className="col-sm-8">
          { header && <h3>{header}</h3> }
          <Markdown source={text} />
        </div>
        <div className="col-sm-3">
          <TeamMember
            imageUrl={teamMember.image.url}
            title={teamMemberTitle}
            subtitle={teamMemberSubtitle}
            email={teamMember.email}
          />
        </div>
        <div className="col-sm-1" />
      </div>
    </div>
  </div>
)

TextWithTeamMember.propTypes = {
  header: PropTypes.string,
  text: PropTypes.string.isRequired,
  teamMemberTitle: PropTypes.string.isRequired,
  teamMemberSubtitle: PropTypes.string.isRequired,
  teamMember: PropTypes.shape(teamMemberShape).isRequired,
}

TextWithTeamMember.defaultProps = {
  header: undefined,
}

export default TextWithTeamMember
