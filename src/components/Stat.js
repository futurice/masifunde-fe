import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { smBreakpoint } from '../styling/breakpoints'
import { handwrittenText, rem } from '../styling/typography'
import IconImage from './IconImage'
import Source from './Source'

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

const Number = styled(CenteredSpan)`
  ${handwrittenText};
  ${(props) =>
    props.highlight &&
    css`
      color: ${props.theme.blue};
      font-size: ${rem('45px')};
    `};
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
    <StatContainer className={`${className}`}>
      {!!textAbove && (
        <FixedHeight className="d-flex align-items-center">
          <CenteredSpan>{textAbove}</CenteredSpan>
        </FixedHeight>
      )}
      {hasImage && <IconImage src={icon.url} alt="" />}
      <Number highlight={!hasImage}>{number}</Number>
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
  superscriptText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sourceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Stat.defaultProps = {
  textAbove: undefined,
  className: '',
  icon: undefined,
  sourceMarkdown: undefined,
  superscriptText: undefined,
  sourceId: undefined,
}

export default Stat
