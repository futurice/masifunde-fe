import { FC } from 'react'
import { TeamMember } from '../../content/shared/team'
import List, { ListItem } from './List'
import PortraitPhoto from './PortraitPhoto'

export type Props<T extends TeamMember> = {
  members: T[]
  title: (member: T) => string
  subtitle?: (member: T) => string | undefined
  imageUrl: (member: T) => string
  email?: (member: T) => string | undefined
}

function TeamMemberList<T extends TeamMember>({
  members,
  title,
  subtitle,
  imageUrl,
  email,
}: Props<T>) {
  return (
    <List className="row" entries={members}>
      {members.map((member) => {
        const memberTitle = title(member)
        const memberSubtitle = subtitle?.(member)
        const memberImageUrl = imageUrl(member)
        const memberEmail = email?.(member)

        return (
          <ListItem key={`${memberTitle} ${memberSubtitle}`}>
            <PortraitPhoto
              title={memberTitle}
              subtitle={memberSubtitle}
              imageUrl={memberImageUrl}
              email={memberEmail}
            />
          </ListItem>
        )
      })}
    </List>
  )
}

export default TeamMemberList
