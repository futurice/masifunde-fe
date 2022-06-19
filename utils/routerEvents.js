import Router from 'next/router'

// Next.js allows only a single listener for every router event:
// https://github.com/zeit/next.js/issues/2033
//
// To overcome this limitation, this module binds all router events to
// simple listeners which simply multiplex these to as many sub-listeners
// as needed.

const listeners = {
  routeChangeStart: [],
  routeChangeComplete: [],
  routeChangeError: [],
  appUpdated: [],
}

export function onRouteChangeStart(listener) {
  listeners.routeChangeStart.push(listener)
}

export function onRouteChangeComplete(listener) {
  listeners.routeChangeComplete.push(listener)
}

export function onRouteChangeError(listener) {
  listeners.routeChangeError.push(listener)
}

const makeMultiListener =
  (subListeners) =>
  (...args) => {
    subListeners.forEach((listener) => {
      try {
        listener(...args)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    })
  }

Router.onRouteChangeStart = makeMultiListener(listeners.routeChangeStart)
Router.onRouteChangeComplete = makeMultiListener(listeners.routeChangeComplete)
Router.onRouteChangeError = makeMultiListener(listeners.routeChangeError)
