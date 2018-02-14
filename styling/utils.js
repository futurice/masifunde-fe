import { css } from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const wordBreak = css`
  // Add line breaks 
  // Source: https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container/

  /* These are technically the same, but use both for broader browser support */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  hyphens: auto;
`
