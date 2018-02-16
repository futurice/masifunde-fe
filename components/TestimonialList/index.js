import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Supporter from './Supporter'
import { smBreakpoint } from '../../styling/breakpoints'
import { mediumSpacing, extraSmallSpacing } from '../../styling/sizes'
import Markdown from '../Markdown'

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

const TestimonialList = ({ testimonials, className }) => (
  <div className={`row ${className}`}>
    {testimonials.map(({
      testimonialMarkdown, title, name, image,
    }) => (
      <TestimonialContainer className="col-lg-6" key={name}>
        <div className="row">
          <StyledSupporter
            className="col-sm-4 col-md-3 col-lg-4"
            image={image}
            name={name}
            title={title}
          />
          <div className="col-sm-8 col-md-9 col-lg-8">
            <Markdown source={testimonialMarkdown} />
          </div>
        </div>
      </TestimonialContainer>
    ))}
  </div>
)

TestimonialList.propTypes = {
  className: PropTypes.string,
  testimonials: PropTypes.arrayOf(PropTypes.shape({
    ...Supporter.propTypes,
    testimonialMarkdown: PropTypes.string,
  })),
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
