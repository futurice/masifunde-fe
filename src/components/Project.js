import PropTypes from 'prop-types'
import styled from 'styled-components'

import imageShape from '../propTypes/image'
import { smallFontSize } from '../styling/typography'
import { mediumSpacing } from '../styling/sizes'
import Markdown from './Markdown'
import IconImage from './IconImage'

const H4 = styled.h4`
  margin-top: 1.1rem;
  margin-bottom: 1.1rem;
`

const ProjectContainer = styled.div`
  font-size: ${smallFontSize};
  margin-bottom: ${mediumSpacing};
`

const StyledIconImage = styled(IconImage)`
  margin: 0 auto;
`

const Project = ({ className, image, name, description }) => (
  <ProjectContainer className={className}>
    <StyledIconImage src={image.url} alt="" />
    <H4>{name}</H4>
    <Markdown source={description} />
  </ProjectContainer>
)

Project.propTypes = {
  className: PropTypes.string,
  image: PropTypes.shape(imageShape).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

Project.defaultProps = {
  className: undefined,
}

export default Project
