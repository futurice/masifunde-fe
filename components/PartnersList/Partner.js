import React from 'react'
import PropTypes from 'prop-types'

const Partner = ({ imageUrl, name, link }) => (
  <div className="col-sm-2 d-flex flex-column align-items-center" key={`${imageUrl} ${name}`}>
    <a href={link}>
      <img className="img-fluid" src={imageUrl} alt={name} />
      <div>{name}</div>
    </a>
  </div>
)

Partner.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default Partner
