import PropTypes from 'prop-types'

import imageShape from './image'
import teamMemberShape from './teamMember'

const BlogPost = {
  title: PropTypes.string,
  slug: PropTypes.string,
  metaDescription: PropTypes.string,
  date: PropTypes.string.isRequired,
  heroImage: PropTypes.shape(imageShape),
  content: PropTypes.string,
  authorTeamMember: PropTypes.shape(teamMemberShape),
  authorExternal: PropTypes.string,
}

export default BlogPost
