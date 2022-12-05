import { FC } from 'react'
import styled from 'styled-components'
import { Project } from '../../content/was-wir-machen-content'
import { mdBreakpoint } from '../../styling/breakpoints'
import { mediumSpacing } from '../../styling/sizes'
import ProjectDetails from './ProjectDetails'

// Props
// =====

export type Props = {
  projects: Project[]
}

// Helpers
// =======

const ListContainer = styled.div`
  margin-top: ${mediumSpacing};
  margin-bottom: -${mediumSpacing};

  @media (min-width: ${mdBreakpoint}) {
    margin-left: 8%;
    margin-right: 8%;
  }
`

// Component
// =========

const ProjectList: FC<Props> = ({ projects }) => (
  <ListContainer className="row">
    {projects.map((project) => (
      <ProjectDetails
        key={`${project.name}${project.image}`}
        className={`col-12 ${projects.length === 3 ? 'col-md-4' : 'col-md-6'}`}
        name={project.name}
        description={project.description}
        imageUrl={project.image.file.url}
      />
    ))}
  </ListContainer>
)

export default ProjectList
