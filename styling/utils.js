import { css } from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const wordBreak = css`
  // Add line breaks 
  // Source: https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container/

  /* These are technically the same, but use both for broader browser support */
  overflow-wrap: break-word;
  word-wrap: break-word;
  
  word-break: break-all;
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  hyphens: auto;
`
