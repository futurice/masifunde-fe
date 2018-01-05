import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'
import styled from 'styled-components'
import imageShape from '../propTypes/image'

const ProjectImage = styled.img`
  max-width: 100%;
  height: 6.25rem;
`

const H3 = styled.h3`
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1.1rem;
  margin-bottom: 1.1rem;
`

const ProjectContainer = styled.div`
  font-size: 16px;
  margin-bottom: 2rem;
`

const Project = ({
  className, image, name, description,
}) => (
  <ProjectContainer className={className}>
    <ProjectImage className="mx-auto d-block" src={image.url} alt={image.tile} />
    <H3>{name}</H3>
    <Markdown source={description} />
  </ProjectContainer>)

Project.propTypes = {
  className: PropTypes.string.isRequired,
  image: PropTypes.shape(imageShape).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default Project
