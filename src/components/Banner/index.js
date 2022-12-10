import BannerWithImage from './BannerWithImage'
import BannerWithoutImage from './BannerWithoutImage'
import { defaultProps, propTypes } from './propTypes'

const Banner = (props) => {
  const { image } = props

  return image ? (
    <BannerWithImage {...props} />
  ) : (
    <BannerWithoutImage {...props} />
  )
}

Banner.propTypes = propTypes
Banner.defaultProps = defaultProps

export default Banner
