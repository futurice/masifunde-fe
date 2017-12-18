import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'
import styled from 'styled-components'

const imageSize = '6.25rem' // 100px
const ProjectImage = styled.img`
  max-width: 100%;
  height: ${imageSize};
  width: ${imageSize};
`

const H2 = styled.h2`
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1.1rem;
  margin-bottom: 1.3rem;
`

const Project = ({
  className, image, name, description,
}) => (
  <div className={className}>
    <ProjectImage className="mx-auto d-block" src={image.url} alt={image.tile} />
    <H2>{name}</H2>
    <Markdown source={description} />
  </div>)

Project.propTypes = {
  className: PropTypes.string.isRequired,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default Project
