import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { mdBreakpoint } from '../styling/breakpoints'
import { mediumSpacing } from '../styling/sizes'
import Project from './Project'

const ListContainer = styled.div`
  margin-top: ${mediumSpacing};
  margin-bottom: -${mediumSpacing};

  @media (min-width: ${mdBreakpoint}) {
    margin-left: 8%;
    margin-right: 8%;
  }
`

const ProjectList = ({ projects }) => (
  <ListContainer className="row">
    {projects.map(project => (
      <Project
        key={`${project.name}${project.image}`}
        className={`col-12 ${projects.length === 3 ? 'col-md-4' : 'col-md-6'}`}
        image={project.image}
        name={project.name}
        description={project.description}
      />
    ))}
  </ListContainer>
)

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape(Project.propTypes)).isRequired,
}

export default ProjectList
