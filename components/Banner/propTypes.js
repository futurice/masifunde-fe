import PropTypes from 'prop-types'

export const propTypes = {
  description: PropTypes.string,
  headline: PropTypes.string.isRequired,
  image: PropTypes.string,
  subHeadline: PropTypes.string,
  buttonLink: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  showImageOnRight: PropTypes.bool,
}

export const defaultProps = {
  subHeadline: undefined,
  image: undefined,
  showImageOnRight: false,
  description: undefined,
}
