import BannerWithImage from './BannerWithImage'
import BannerWithoutImage from './BannerWithoutImage'
import { propTypes } from './propTypes'

const Banner = (props) => {
  const { image } = props

  return image ? (
    <BannerWithImage {...props} />
  ) : (
    <BannerWithoutImage {...props} />
  )
}

Banner.propTypes = propTypes

export default Banner
