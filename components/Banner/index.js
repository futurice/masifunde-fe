import React from 'react'

import { propTypes, defaultProps } from './propTypes'
import BannerWithImage from './BannerWithImage'
import BannerWithoutImage from './BannerWithoutImage'

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
