/* eslint-disable function-paren-newline, react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'

import Partner, { propTypes as partnerPropTypes } from './Partner'

const PartnersList = ({ partnersList, className }) => (
  <div className={`row align-items-center ${className}`}>
    {partnersList.map(({ image, name, link }) => (
      <Partner
        link={link}
        image={image}
        name={name}
        key={`${image.url} ${name}`}
      />
    ))}
  </div>
)

export const propTypes = {
  partnersList: PropTypes.arrayOf(
    PropTypes.shape(partnerPropTypes),
  ).isRequired,
  className: PropTypes.string,
}

PartnersList.propTypes = propTypes

PartnersList.defaultProps = {
  className: '',
}

export default PartnersList
