import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { jpgCompression } from '../../utils/constants'

const Link = styled.a`
  height: 100%;
`

const Partner = ({
  image, name, link, className,
}) => (
  <div className={`col-sm-4 col-md-2 d-flex flex-column ${className}`}>
    <Link href={link}>
      <img className="img-fluid" src={`${image.url}?q=${jpgCompression}`} alt={image.title} />
      <div>{name}</div>
    </Link>
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
