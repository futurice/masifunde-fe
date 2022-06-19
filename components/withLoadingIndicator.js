import React from 'react'
import NProgress from 'nprogress'
import { injectGlobal } from 'styled-components'

import theme from '../styling/theme'
import {
  onRouteChangeStart,
  onRouteChangeComplete,
  onRouteChangeError,
} from '../utils/routerEvents'

const PROGRESS_COLOR = theme.orangeRed

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: ${PROGRESS_COLOR};

    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;
    height: 2px;
  }

  /* Fancy blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px ${PROGRESS_COLOR}, 0 0 5px ${PROGRESS_COLOR};
    opacity: 1.0;

    -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
            transform: rotate(3deg) translate(0px, -4px);
  }

  /* Remove these to get rid of the spinner */
  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;

    border: solid 2px transparent;
    border-top-color: ${PROGRESS_COLOR};
    border-left-color: ${PROGRESS_COLOR};
    border-radius: 50%;

    -webkit-animation: nprogress-spinner 400ms linear infinite;
            animation: nprogress-spinner 400ms linear infinite;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }

  @-webkit-keyframes nprogress-spinner {
    0%   { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes nprogress-spinner {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
})

onRouteChangeStart(() => NProgress.start())
onRouteChangeComplete(() => NProgress.done())
onRouteChangeError(() => NProgress.done())

const withLoaderIndicator = (WrappedComponent) => {
  const LoadingIndicatorWrapper = (props) => <WrappedComponent {...props} />

  return LoadingIndicatorWrapper
}

export default withLoaderIndicator
