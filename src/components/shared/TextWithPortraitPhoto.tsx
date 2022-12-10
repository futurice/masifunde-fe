import { FC } from 'react'
import Markdown from './Markdown'
import PortraitPhoto from './PortraitPhoto'

export type Props = {
  header: string
  text: string
  portraitPhotoTitle: string
  portraitPhotoSubtitle?: string
  portraitPhotoImageUrl: string
  portraitPhotoEmail?: string
}

const TextWithPortraitPhoto: FC<Props> = ({
  header,
  text,
  portraitPhotoTitle,
  portraitPhotoSubtitle,
  portraitPhotoImageUrl,
  portraitPhotoEmail,
}) => (
  <div className="row">
    <div className="col-lg-8 offset-lg-2">
      <div className="row">
        <div className="col-sm-8">
          {header && <h3>{header}</h3>}
          <Markdown source={text} />
        </div>
        <div className="col-sm-3">
          <PortraitPhoto
            imageUrl={portraitPhotoImageUrl}
            title={portraitPhotoTitle}
            subtitle={portraitPhotoSubtitle}
            email={portraitPhotoEmail}
          />
        </div>
        <div className="col-sm-1" />
      </div>
    </div>
  </div>
)

export default TextWithPortraitPhoto
