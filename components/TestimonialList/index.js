import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Patron from './Patron'
import { smBreakpoint } from '../../styling/breakpoints'
import { mediumSpacing, extraSmallSpacing } from '../../styling/sizes'
import Markdown from '../Markdown'

const PatronContainer = styled.div`
  margin-bottom: ${mediumSpacing};
`

const StyledPatron = Patron.extend`
  @media (max-width: ${smBreakpoint}) {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-bottom: ${extraSmallSpacing};
    text-align: center;
  }
`

const PatronList = ({ data: patrons, className }) => (
  <div className={`row ${className}`}>
    {patrons.map(({
      testimonialMarkdown, title, name, image,
    }) => (
      <PatronContainer className="col-lg-6" key={name}>
        <div className="row">
          <StyledPatron
            className="col-sm-4 col-md-3 col-lg-4"
            image={image}
            name={name}
            title={title}
          />
          <div className="col-sm-8 col-md-9 col-lg-8">
            <Markdown source={testimonialMarkdown} />
          </div>
        </div>
      </PatronContainer>
    ))}
  </div>
)

PatronList.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    ...Patron.propTypes,
    testimonialMarkdown: PropTypes.string,
  })),
}

PatronList.defaultProps = {
  data: [],
  className: '',
}

export default PatronList
