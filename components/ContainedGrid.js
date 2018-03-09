import React from 'react'
import PropTypes from 'prop-types'

const ContainedGrid = ({ children }) => (
  <div className="container">
    <div className="row">
      <div className="offset-lg-1 col-lg-10">
        {children}
      </div>
    </div>
  </div>
)

ContainedGrid.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ContainedGrid
