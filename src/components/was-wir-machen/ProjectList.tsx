import { FC } from 'react'
import styled from 'styled-components'
import { Asset } from '../../content/shared/assets'
import { smallSpacing } from '../../styling/sizes'
import { bodyTextLineHeight } from '../../styling/typography'
import IconImage from '../IconImage'

// Props
// =====

export type Props = {
  projects: ProjectItemProps[]
}

export type ProjectItemProps = {
  name: string
  image: Asset
}

// Helpers
// =======

const ProjectListContainer = styled.div`
  margin-top: ${smallSpacing};
  margin-bottom: 1.2rem;
  width: 100%;

  display: flex;
  justify-content: center;
`

const ProjectListItem = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProjectText = styled.p`
  text-align: center;

  /*
   * Let text wrap correctly in Internet Explorer:
   * https://stackoverflow.com/questions/35111090/text-in-a-flex-container-doesnt-wrap-in-ie11
   */
  width: 100%;

  /*
   * The South Africa and Germany projects are in two different containers,
   * so when they are shown next to each other (i.e., at medium viewport size
   * and up), they may not exactly line up vertically because the row heights
   * might vary with the number of lines needed for the project names.
   *
   * To mitigate this issue, we demand all ProjectText elements to be at least
   * two lines high, irrespective of content. This ensures that the alignment
   * problem only happens if project names grow beyond two lines, which is
   * hopefully unlikely -- though not impossible, of course...
   */
  min-height: calc(2em * ${bodyTextLineHeight});
`

// Component
// =========

const ProjectList: FC<Props> = ({ projects }) => (
  <ProjectListContainer className="row">
    {projects.map((project) => (
      <ProjectListItem
        className="col-sm-6"
        key={`${project.image.file.url} ${project.name}`}
      >
        <IconImage src={project.image.file.url} alt="" />
        <ProjectText>{project.name}</ProjectText>
      </ProjectListItem>
    ))}
  </ProjectListContainer>
)

export default ProjectList
