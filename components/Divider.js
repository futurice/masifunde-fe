import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { smBreakpoint } from '../styling/breakpoints'

const Divider = styled.hr.attrs({ role: 'presentation' })`
  margin: 0 12%;

  @media (min-width: ${smBreakpoint}) {
    margin: 0 22%;
  }

  ${({ color, theme }) => ((color === 'grey' || color === 'gray')
    ? css`
        border-color: #bbb;
        border-width: 2px;
        opacity: 0.3;
      `
    : css`
        border-color: ${theme.orange};
      `
  )}
`

Divider.propTypes = {
  color: PropTypes.oneOf(['grey', 'gray', 'orange']),
}

Divider.defaultProps = {
  color: 'grey',
}

export default Divider
