import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import TeamMember from './TeamMember'
import { smBreakpoint, mdBreakpoint, lgBreakpoint } from '../styling/breakpoints'

const centerIfSingleLine = (breakpoint, maxMembersPerLine, numberOfMembers) => {
  if (numberOfMembers < maxMembersPerLine) {
    return css`
      @media (min-width: ${breakpoint}) {
        justify-content: center;
      }
    `
  }
  return ''
}

const List = styled.div`
  flex-grow: 0;

  display: flex;
  flex-wrap: wrap;
  
  ${({ members }) => centerIfSingleLine(smBreakpoint, 2, members.length)}
  ${({ members }) => centerIfSingleLine(mdBreakpoint, 3, members.length)}
  ${({ members }) => centerIfSingleLine(lgBreakpoint, 6, members.length)}

  > * {
    min-width: 150px;
    width: 100%;
    padding: 0 0.5rem;

    @media (min-width: ${smBreakpoint}) {
      width: 50%;
    }

    @media (min-width: ${mdBreakpoint}) {
      width: 33%;
    }

    @media (min-width: ${lgBreakpoint}) {
      width: 16%;
    }
  }
`

const TeamMemberList = ({
  members,
  title,
  subtitle,
  imageUrl,
  email,
}) => (
  <List members={members}>
    {members.map((member) => {
      const memberTitle = title(member)
      const memberSubtitle = subtitle(member)
      const memberImageUrl = imageUrl(member)
      const memberEmail = email && email(member)

      return (
        <TeamMember
          key={`${memberTitle} ${memberSubtitle}`}
          title={memberTitle}
          subtitle={memberSubtitle}
          imageUrl={memberImageUrl}
          email={memberEmail}
        />
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
