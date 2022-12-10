import PropTypes from 'prop-types'
import imageShape from './image'

const TeamMember = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  responsibilityArea: PropTypes.string.isRequired,
  image: PropTypes.shape(imageShape).isRequired,
}

export default TeamMember
