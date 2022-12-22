import { FC } from 'react'
import styled from 'styled-components'
import { subsectionTitleText } from '../../styling/typography'
import Divider from './Divider'
import PageSection from './PageSection'

// Props
// =====

export type Props = {
  text: string
  hideTopRuler?: boolean
}

// Helpers
// =======

const taglineTextMargin = '2.3rem'

const TaglineText = styled.p<{ hideTopRuler?: boolean }>`
  ${subsectionTitleText};
  color: ${(props) => props.theme.orange};
  font-weight: bold;
  text-align: center;
  margin-bottom: ${taglineTextMargin};
  margin-top: ${({ hideTopRuler }) => (hideTopRuler ? '0' : taglineTextMargin)};
`

// Component
// =========

const Tagline: FC<Props> = ({ text, hideTopRuler }) =>
  text ? (
    <PageSection>
      {hideTopRuler ? null : <Divider color="orange" />}
      <TaglineText hideTopRuler={hideTopRuler}>{text}</TaglineText>
      <Divider color="orange" />
    </PageSection>
  ) : null

export default Tagline
