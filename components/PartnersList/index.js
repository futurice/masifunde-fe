/* eslint-disable function-paren-newline, react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import _chunk from 'lodash/chunk'

import Partner from './Partner'

const PartnersList = ({ partnersList }) =>
  _chunk(partnersList, 5).map((partnersListChunk, idx) => (
    <div className="row justify-content-sm-center" key={idx}>
      {partnersListChunk.map(({ imageUrl, name, link }) => (
        <Partner
          link={link}
          imageUrl={imageUrl}
          name={name}
          key={`${imageUrl} ${name}`}
        />
      ))}
    </div>
  ))

PartnersList.propTypes = {
  partnersList: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default PartnersList
