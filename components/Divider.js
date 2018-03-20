import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { smBreakpoint } from '../styling/breakpoints'

const Divider = styled.hr.attrs({ role: 'presentation' })`
  ${({ size }) => ((size === 'small')
    ? css`
        margin: 0 12%;
        @media (min-width: ${smBreakpoint}) {
          margin: 0 22%;
        }
      `
    : css`
        margin: 0;
      `
  )}

  ${({ color, theme }) => ((color === 'grey' || color === 'gray')
    ? css`
        border-color: ${theme.pineCone};
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
  size: PropTypes.oneOf(['small', 'large']),
}

Divider.defaultProps = {
  color: 'grey',
  size: 'small',
}

export default Divider
