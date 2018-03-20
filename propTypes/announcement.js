import PropTypes from 'prop-types'
import imagePropTypes from './image'

export default {
  subHeading: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.shape(imagePropTypes).isRequired,
  buttonLink: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
}
