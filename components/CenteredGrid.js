import React from 'react'
import PropTypes from 'prop-types'

const CenteredGrid = ({ children, className, withoutContainer }) => (
  <div className={`${className} ${withoutContainer ? '' : 'container'}`}>
    <div className="row">
      <div className="offset-lg-1 col-lg-10">{children}</div>
    </div>
  </div>
)

CenteredGrid.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  withoutContainer: PropTypes.bool,
}

CenteredGrid.defaultProps = {
  className: '',
  withoutContainer: false,
}

export default CenteredGrid
