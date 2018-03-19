import PropTypes from 'prop-types'
import imagePropTypes from './image'

export default {
  introHeading: PropTypes.string.isRequired,
  introMarkdown: PropTypes.string.isRequired,
  bannerSmallTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  imageList: PropTypes.arrayOf(PropTypes.shape(imagePropTypes)).isRequired,
}
