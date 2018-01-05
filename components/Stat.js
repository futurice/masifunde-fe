import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { handwrittenText, rem } from '../styling/typography'
import Source from './Source'

const StatContainer = styled.div`
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

const Number = CenteredSpan.extend`
  ${handwrittenText};
  ${props =>
    props.highlight &&
    css`
      color: ${props.theme.blue};
      font-size: ${rem('45px')};
    `};
`

const Image = styled.img`
  margin-bottom: 0.6rem;
  height: 6.25rem; // 100px;
`

const Stat = ({
  textAbove,
  description,
  icon,
  number,
  className,
  sourceMarkdown,
  superscriptText,
  sourceId,
}) => {
  const hasImage = !!icon && !!icon.url
  return (
    <StatContainer className={`${className} d-flex flex-column align-items-center`}>
      {!!textAbove && (
        <FixedHeight className="d-flex align-items-center">
          <CenteredSpan>{textAbove}</CenteredSpan>
        </FixedHeight>
      )}
      {hasImage && <Image src={icon.url} alt={icon.title} />}
      <Number highlight={!hasImage}>{number}</Number>
      <CenteredSpan>
        {description}
        {sourceMarkdown && superscriptText && sourceId ? (
          <Source superscriptText={superscriptText} sourceMarkdown={sourceMarkdown} id={sourceId} />
        ) : null}
      </CenteredSpan>
    </StatContainer>
  )
}

Stat.propTypes = {
  className: PropTypes.string,
  textAbove: PropTypes.string,
  icon: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
  }),
  number: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  sourceMarkdown: PropTypes.string,
  superscriptText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  sourceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

Stat.defaultProps = {
  textAbove: undefined,
  className: '',
  icon: undefined,
  sourceMarkdown: undefined,
}

export default Stat
