import styled, { css } from 'styled-components'
import { smBreakpoint } from '../../styling/breakpoints'

export type Props = {
  color?: 'grey' | 'orange'
  size?: 'small' | 'large'
}

const Divider = styled.hr.attrs({ role: 'presentation' })<Props>`
  ${({ size }) =>
    (size ?? 'small') === 'small'
      ? css`
          margin: 0 12%;
          @media (min-width: ${smBreakpoint}) {
            margin: 0 22%;
          }
        `
      : css`
          margin: 0;
        `}

  ${({ color, theme }) =>
    (color ?? 'grey') === 'grey'
      ? css`
          border-color: ${theme.pineCone};
          border-width: 2px;
          opacity: 0.3;
        `
      : css`
          border-color: ${theme.orange};
        `}
`

export default Divider
