import { FC } from 'react'
import styled, { css } from 'styled-components'
import { Asset } from '../../content/shared/assets'
import { mdBreakpoint } from '../../styling/breakpoints'
import { mediumSpacing } from '../../styling/sizes'
import Link from '../Link'
import Button from '../shared/Button'
import ProjectList from './ProjectList'

// Props
// =====

export type Props = {
  leftCountry: ProjectsGridCountryProps
  rightCountry: ProjectsGridCountryProps
}

export type ProjectsGridCountryProps = {
  title: string
  description: string
  button: string
  buttonLink: string
  projects: ProjectsGridProjectProps[]
}

export type ProjectsGridProjectProps = {
  name: string
  image: Asset
}

// Helpers
// =======

const projectsGridColumnGap = 2 // rem

const ProjectsGridContainer = styled.div`
  @media (min-width: ${mdBreakpoint}) {
    display: grid;
    display: -ms-grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
    -ms-grid-columns: 1fr 1fr;
    -ms-grid-rows: auto auto auto;
  }
`

type ProjectsGridColumnProps = {
  column: number
  country: ProjectsGridCountryProps
}

const ProjectsGridColumn: FC<ProjectsGridColumnProps> = ({
  column,
  country,
}) => (
  <>
    <ProjectsGridTitleCell column={column} row={1}>
      <CountryTitle>{country.title}</CountryTitle>
    </ProjectsGridTitleCell>
    <ProjectsGridCell column={column} row={2}>
      <CountryDescription>{country.description}</CountryDescription>
    </ProjectsGridCell>
    <ProjectsGridCell column={column} row={3}>
      <ProjectList projects={country.projects} />
    </ProjectsGridCell>
    <ProjectsGridCell column={column} row={4}>
      <Link href={country.buttonLink} passHref>
        <Button variant="secondary">{country.button}</Button>
      </Link>
    </ProjectsGridCell>
  </>
)

type ProjectsGridCellProps = {
  row: number
  column: number
}

const ProjectsGridCell = styled.div<ProjectsGridCellProps>`
  display: flex;
  justify-content: center;

  @media (min-width: ${mdBreakpoint}) {
    grid-row: ${(props) => props.row};
    grid-column: ${(props) => props.column};
    -ms-grid-row: ${(props) => props.row};
    -ms-grid-column: ${(props) => props.column};

    margin-right: ${projectsGridColumnGap / 2}rem;

    ${(props) =>
      props.column > 1 &&
      css`
        margin-left: ${projectsGridColumnGap / 2}rem;
      `}
  }
`

const ProjectsGridTitleCell = styled(ProjectsGridCell)`
  margin-top: ${mediumSpacing};

  &:first-of-type {
    margin-top: 0;
  }

  @media (min-width: ${mdBreakpoint}) {
    margin-top: 0;
  }
`

const CountryTitle = styled.h3`
  text-align: center;
`

const CountryDescription = styled.div`
  flex-grow: 1;
  width: 87.5%;

  @media (min-width: ${mdBreakpoint}) {
    justify-content: center;
  }
`

// Component
// =========

const ProjectsGrid: FC<Props> = ({ leftCountry, rightCountry }) => (
  <ProjectsGridContainer>
    <ProjectsGridColumn column={1} country={leftCountry} />
    <ProjectsGridColumn column={2} country={rightCountry} />
  </ProjectsGridContainer>
)

export default ProjectsGrid
