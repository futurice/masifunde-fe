/* eslint-disable no-param-reassign */
import PropTypes from 'prop-types'
import portraitPropTypes from '../propTypes/portrait'
import StoryCarousel from './shared/StoryCarousel'

/**
 * @deprecated - Use the `StoryCarousel` component instead.
 */
export default function Carousel({ portrait }) {
  return (
    <StoryCarousel
      slides={[
        {
          image: portrait.page1Image,
          heading: portrait.page1Heading,
          text: portrait.page1Text,
        },
        {
          image: portrait.page2Image,
          heading: portrait.page2Heading,
          text: portrait.page2Text,
        },
        {
          image: portrait.page3Image,
          heading: portrait.page3Heading,
          text: portrait.page3Text,
        },
      ]}
    />
  )
}

Carousel.propTypes = {
  portrait: PropTypes.shape(portraitPropTypes).isRequired,
}
