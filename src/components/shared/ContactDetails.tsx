import { FC } from 'react'
import TeamMember from '../TeamMember'
import Markdown from './Markdown'

export type Props = {
  title?: string
  markdownText: string
  contactPersonImageUrl: string
  contactPersonTitle: string
  contactPersonSubtitle: string
  contactPersonEmail: string
}

const ContactDetails: FC<Props> = ({
  title,
  markdownText: descriptionMarkdown,
  contactPersonImageUrl,
  contactPersonTitle,
  contactPersonSubtitle,
  contactPersonEmail,
}) => (
  <div className="row">
    <div className="col-lg-8 offset-lg-2">
      <div className="row">
        <div className="col-sm-8">
          {title && <h3>{title}</h3>}
          <Markdown source={descriptionMarkdown} />
        </div>

        <div className="col-sm-3">
          <TeamMember
            imageUrl={contactPersonImageUrl}
            title={contactPersonTitle}
            subtitle={contactPersonSubtitle}
            email={contactPersonEmail}
          />
        </div>

        <div className="col-sm-1" />
      </div>
    </div>
  </div>
)

export default ContactDetails
