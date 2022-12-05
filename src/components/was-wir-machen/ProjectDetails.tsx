import { FC } from 'react'
import styled from 'styled-components'
import { smallFontSize } from '../../styling/typography'
import { mediumSpacing } from '../../styling/sizes'
import Markdown from '../shared/Markdown'
import IconImage from '../IconImage'

// Props
// =====

export type Props = {
  name: string
  description: string
  imageUrl: string
  className?: string
}

// Helpers
// =======

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

// Component
// =========

const Project: FC<Props> = ({ name, description, imageUrl, className }) => (
  <ProjectContainer className={className}>
    <StyledIconImage src={imageUrl} alt="" />
    <H4>{name}</H4>
    <Markdown source={description} />
  </ProjectContainer>
)

export default Project
