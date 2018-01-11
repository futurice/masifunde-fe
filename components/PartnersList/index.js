import React from 'react'
import PropTypes from 'prop-types'

import Partner, { propTypes as partnerPropTypes } from './Partner'
import List from '../List'
import { mediumSpacing } from '../../styling/sizes'

const StyledList = List.extend`
  margin-top: ${mediumSpacing};
`

const PartnersList = ({ partnersList, className }) => (
  <StyledList entries={partnersList} className={`row ${className}`}>
    {partnersList.map(({ image, name, link }) => (
      <Partner
        link={link}
        image={image}
        name={name}
        key={`${image.url} ${name}`}
      />
    ))}
  </StyledList>
)

export const propTypes = {
  partnersList: PropTypes.arrayOf(PropTypes.shape(partnerPropTypes)).isRequired,
  className: PropTypes.string,
}

PartnersList.propTypes = propTypes

PartnersList.defaultProps = {
  className: '',
}

export default PartnersList
