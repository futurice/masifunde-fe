import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { handwritten } from '../styling/typography'
import Source from './Source'

const CenteredSpan = styled.span`
  text-align: center;
  max-width: 200px;
`

const FixedHeight = styled.div`
  height: 65px;
`

const StatContainer = styled.div`
  margin-bottom: 30px;
`

const Number = CenteredSpan.extend`
  ${handwritten}
`

const Image = styled.img`
  margin-bottom: 0.6rem;
  height: 6.25rem; // 100px;
`

const Stat = ({
  textAbove, description, icon, number, className, sourceMarkdown, superscriptText, sourceId,
}) => (
  <StatContainer className={`${className} d-flex flex-column align-items-center`}>
    {!!textAbove && (
      <FixedHeight className="d-flex align-items-center">
        <CenteredSpan>{textAbove}</CenteredSpan>
      </FixedHeight>
    )}
    {!!icon && !!icon.url && (<Image src={icon.url} alt={icon.title} />)}
    <Number>{number}</Number>
    <CenteredSpan>
      {description}{sourceMarkdown && superscriptText && sourceId
      ? <Source superscriptText={superscriptText} sourceMarkdown={sourceMarkdown} id={sourceId} />
      : null}
    </CenteredSpan>
  </StatContainer>
)

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
  superscriptText: PropTypes.string.isRequired,
  sourceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

Stat.defaultProps = {
  textAbove: undefined,
  className: '',
  icon: undefined,
  sourceMarkdown: undefined,
}

export default Stat
