import PropTypes from 'prop-types'

import TeamMember from './TeamMember'
import List from './List'

const TeamMemberList = ({ members, title, subtitle, imageUrl, email }) => (
  <List className="row" entries={members}>
    {members.map((member) => {
      const memberTitle = title(member)
      const memberSubtitle = subtitle(member)
      const memberImageUrl = imageUrl(member)
      const memberEmail = email && email(member)

      return (
        <List.Item key={`${memberTitle} ${memberSubtitle}`}>
          <TeamMember
            title={memberTitle}
            subtitle={memberSubtitle}
            imageUrl={memberImageUrl}
            email={memberEmail}
          />
        </List.Item>
      )
    })}
  </List>
)

TeamMemberList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.func.isRequired,
  subtitle: PropTypes.func.isRequired,
  imageUrl: PropTypes.func.isRequired,
  email: PropTypes.func,
}

TeamMemberList.defaultProps = {
  email: undefined,
}

export default TeamMemberList
