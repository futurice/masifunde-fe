export default function makeQueryString(params) {
  return Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')
}
