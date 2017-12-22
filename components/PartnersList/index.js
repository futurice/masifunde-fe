/* eslint-disable function-paren-newline, react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import _chunk from 'lodash/chunk'

import Partner, { propTypes as partnerPropTypes } from './Partner'

const PartnersList = ({ partnersList, className }) =>
  _chunk(partnersList, 5).map((partnersListChunk, idx) => (
    <div className={`row justify-content-sm-center align-items-center ${className}`} key={idx}>
      {partnersListChunk.map(({ image, name, link }) => (
        <Partner
          link={link}
          image={image}
          name={name}
          key={`${image.url} ${name}`}
        />
      ))}
    </div>
  ))

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
