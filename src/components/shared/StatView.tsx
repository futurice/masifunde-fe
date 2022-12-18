import { FC } from 'react'
import styled, { css } from 'styled-components'
import { Asset } from '../../content/shared/assets'
import { smBreakpoint } from '../../styling/breakpoints'
import { handwrittenText, rem } from '../../styling/typography'
import Source from '../Source'
import IconImage from './IconImage'

// Props
// =====

export type Props = {
  description: string
  number: string
  textAbove: string
  sourceMarkdown: string
  icon?: Asset
  superscriptText?: string
  sourceId?: string
  className?: string
}

// Helpers
// =======

const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  flex: 1;
  flex-basis: auto;

  @media (min-width: ${smBreakpoint}) {
    flex-basis: 0;
  }

  font-size: ${rem('18px')};
  font-weight: bold;
`

const FixedHeight = styled.div`
  height: 65px;
`

const CenteredSpan = styled.span`
  text-align: center;
  max-width: 200px;
`

const Number = styled(CenteredSpan)<{ highlight: boolean }>`
  ${handwrittenText};
  ${(props) =>
    props.highlight &&
    css`
      color: ${props.theme.blue};
      font-size: ${rem('45px')};
    `};
`

const StatView: FC<Props> = ({
  textAbove,
  description,
  icon,
  number,
  sourceMarkdown,
  superscriptText,
  sourceId,
  className,
}) => {
  return (
    <StatContainer className={className}>
      {!!textAbove && (
        <FixedHeight className="d-flex align-items-center">
          <CenteredSpan>{textAbove}</CenteredSpan>
        </FixedHeight>
      )}
      {icon && <IconImage src={icon.file.url} alt="" />}
      <Number highlight={!icon}>{number}</Number>
      <CenteredSpan>
        {description}
        {sourceMarkdown && superscriptText && sourceId ? (
          <Source
            superscriptText={superscriptText}
            sourceMarkdown={sourceMarkdown}
            id={sourceId}
          />
        ) : null}
      </CenteredSpan>
    </StatContainer>
  )
}

export default StatView
