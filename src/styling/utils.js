import { css } from 'styled-components'

export const wordBreak = css`
  // Add line breaks
  // Source: https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container/

  /* These are technically the same, but use both for broader browser support */
  overflow-wrap: break-word;
  word-wrap: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  hyphens: auto;
`
