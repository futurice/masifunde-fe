import PropTypes from 'prop-types'

import imageShape from './image'

export default {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  responsibilityArea: PropTypes.string.isRequired,
  image: PropTypes.shape(imageShape).isRequired,
}
