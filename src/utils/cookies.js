export function haveCookiesBeenAccepted() {
  return localStorage.getItem('cookiesAccepted') === 'true'
}

export function markCookiesAccepted() {
  localStorage.setItem('cookiesAccepted', 'true')
}
