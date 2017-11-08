import React from 'react'
import PropTypes from 'prop-types'

const ProfilePicture = ({
  imageUrl, title, name, email,
}) => (
  <div className="col-6 col-md-3 col-lg-2">
    <img className="img-fluid" src={imageUrl} alt={`${title} - ${name}`} />
    <div>{title}</div>
    <div>{name}</div>
    <div>{email}</div>
  </div>
)

ProfilePicture.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
}

export default ProfilePicture
