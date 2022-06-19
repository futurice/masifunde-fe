import T from 'i18n-react'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { smBreakpoint } from '../../styling/breakpoints'
import { mediumSpacing, extraSmallSpacing } from '../../styling/sizes'
import Markdown from '../Markdown'
import Supporter from './Supporter'

const List = styled.div`
  /* Counter bottom margin of TestimonialList in last line */
  margin-bottom: -${mediumSpacing};
`

const TestimonialContainer = styled.div`
  margin-bottom: ${mediumSpacing};
`

const StyledSupporter = Supporter.extend`
  @media (max-width: ${smBreakpoint}) {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-bottom: ${extraSmallSpacing};
    text-align: center;
  }
`

const TestimonialText = styled(Markdown)`
  p:first-child::before {
    display: inline;
    /* Use arrow function to ensure translation happens dynamically
     * (and not just once at component definition time) */
    content: '${() => T.translate('quote.open')}';
  }

  p:last-child::after {
    display: inline;
    /* Use arrow function to ensure translation happens dynamically
     * (and not just once at component definition time) */
    content: '${() => T.translate('quote.close')}';
  }
`

const TestimonialList = ({ testimonials, className }) => (
  <List className={`row ${className}`}>
    {testimonials.map(({ testimonialMarkdown, title, name, image }) => (
      <TestimonialContainer className="col-lg-6" key={name}>
        <div className="row">
          <StyledSupporter
            className="col-sm-4 col-md-3 col-lg-4"
            image={image}
            name={name}
            title={title}
          />
          <div className="col-sm-8 col-md-9 col-lg-8">
            <TestimonialText source={testimonialMarkdown} />
          </div>
        </div>
      </TestimonialContainer>
    ))}
  </List>
)

TestimonialList.propTypes = {
  className: PropTypes.string,
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      ...Supporter.propTypes,
      testimonialMarkdown: PropTypes.string,
    })
  ),
}

TestimonialList.defaultProps = {
  testimonials: [],
  className: '',
}

const StyledTestimonialList = styled(TestimonialList)`
  // Center when there is only one element in the list
  & > div:only-child {
    margin-left: auto;
    margin-right: auto;
  }
`

StyledTestimonialList.propTypes = TestimonialList.propTypes
StyledTestimonialList.defaultProps = TestimonialList.defaultProps

export default StyledTestimonialList
