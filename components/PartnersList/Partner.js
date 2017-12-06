import React from 'react'
import PropTypes from 'prop-types'

const Partner = ({
  image, name, link, className,
}) => (
  <div className={`col-sm-4 col-md-2 d-flex flex-column align-items-center ${className}`}>
    <a href={link}>
      <img className="img-fluid" src={image.url} alt={image.title} />
      <div>{name}</div>
    </a>
  </div>
)

export const propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Partner.propTypes = propTypes

Partner.defaultProps = {
  className: '',
}

export default Partner
