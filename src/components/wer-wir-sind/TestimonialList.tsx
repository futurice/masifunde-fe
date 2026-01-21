import T from 'i18n-react'
import { FC } from 'react'
import styled from 'styled-components'
import { Testimonial } from '../../content/wer-wir-sind-content'
import { smBreakpoint } from '../../styling/breakpoints'
import { extraSmallSpacing, mediumSpacing } from '../../styling/sizes'
import Markdown from '../shared/Markdown'
import TestimonialListItem from './TestimonialListItem'

export type Props = {
  testimonials: Testimonial[]
  className?: string
}

const List = styled.div`
  /* Counter bottom margin of TestimonialList in last line */
  margin-bottom: -${mediumSpacing};
`

const TestimonialContainer = styled.div`
  margin-bottom: ${mediumSpacing};
`

const StyledTestimonialListItem = styled(TestimonialListItem)`
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
    content: '${() => T.translate('quote.open') as string}';
  }

  p:last-child::after {
    display: inline;
    /* Use arrow function to ensure translation happens dynamically
     * (and not just once at component definition time) */
    content: '${() => T.translate('quote.close') as string}';
  }
`

const TestimonialList: FC<Props> = ({ testimonials, className }) => (
  <List className={`row ${className}`}>
    {testimonials.map(({ testimonialMarkdown, title, name, image }) => (
      <TestimonialContainer className="col-lg-6" key={name}>
        <div className="row">
          <StyledTestimonialListItem
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

const StyledTestimonialList = styled(TestimonialList)`
  // Center when there is only one element in the list
  & > div:only-child {
    margin-left: auto;
    margin-right: auto;
  }
`

export default StyledTestimonialList
