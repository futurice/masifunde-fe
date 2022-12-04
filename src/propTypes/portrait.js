import PropTypes from 'prop-types'
import imagePropTypes from './image'

const Portrait = {
  page1Image: PropTypes.shape(imagePropTypes).isRequired,
  page1Heading: PropTypes.string.isRequired,
  page1Text: PropTypes.string.isRequired,
  page2Image: PropTypes.shape(imagePropTypes).isRequired,
  page2Heading: PropTypes.string.isRequired,
  page2Text: PropTypes.string.isRequired,
  page3Image: PropTypes.shape(imagePropTypes).isRequired,
  page3Heading: PropTypes.string.isRequired,
  page3Text: PropTypes.string.isRequired,
}

export default Portrait
