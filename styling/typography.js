/* eslint-disable import/prefer-default-export */
import { css } from 'styled-components'

export const handwritten = css`
    font: normal 44px banaueregular;
`

export const pageTitle = css`
    overflow-wrap: break-word;
    line-height: 1.2;
    margin: 4rem 0;
    color: #FF621D;
    letter-spacing: 0.5px;
    font-size: 2.5rem;

    @media (min-width: 768px) {
      font-size: 3rem;
    }
`

export const sectionTitle = css`
    overflow-wrap: break-word;
    line-height: 1.4;
    margin: 3rem 0;
    color: #FF621D;
    font-size: 2rem;
    letter-spacing: -0.5px;

    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
`

export const subtitle = css`
    overflow-wrap: break-word;
    line-height: 1.4;
    color: #77695C;
    font-weight: normal;
    font-size: 1.5rem;
    margin: 0 0 8px;
    text-align: left;

    @media screen and (min-width: 768px) {
      font-size: 2rem;
    }
`

