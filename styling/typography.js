/* eslint-disable import/prefer-default-export */
import { css } from 'styled-components'

export const handwritten = css`
    font: normal 44px banaueregular;
`

export const pageTitle = css`
    line-height: 1.2;
    margin: 4rem 0;
    color: ${props => props.theme.orangeRed};
`

export const sectionTitle = css`
    line-height: 1.4;
    margin: 3rem 0;
    color: ${props => props.theme.orangeRed};
    font-size: 2.5rem;
`

export const subtitle = css`
    line-height: 1.4;
    color: ${props => props.theme.pineCone};
    font-weight: normal;
    font-size: 2rem;
    margin: 0 0 8px;
    text-align: left;
`

