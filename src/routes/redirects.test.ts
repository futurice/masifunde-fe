import { getRedirects } from './redirects'

let redirects: ReturnType<typeof getRedirects>

beforeAll(() => {
  redirects = getRedirects()
})

test('redirects from "/" to "/de"', () => {
  expect(redirects).toContainEqual({
    source: '/',
    destination: '/de',
    permanent: false,
  })
})

test.each([
  '/blog/:slug',
  '/blog/page/:page',
  '/datenschutz',
  '/dokumente',
  '/impressum',
  '/kontakt',
  '/podcasts/page/:page',
  '/presse',
  '/transparenz',
  '/was-wir-machen',
  '/was-wir-machen/ansatz-de',
  '/was-wir-machen/ansatz-sa',
  '/was-wir-machen/effekte',
  '/wer-wir-sind',
  '/wer-wir-sind/team-de',
  '/wer-wir-sind/team-sa',
  '/wie-sie-helfen',
  '/wie-sie-helfen/aktiv-werden',
  '/wie-sie-helfen/masifunde-gemeinschaft',
  '/wie-sie-helfen/partner-werden',
])('adds "/de" prefix to "%s"', (path) => {
  expect(redirects).toContainEqual({
    source: path,
    destination: `/de${path}`,
    permanent: false,
  })
})

test.each(['/404', '/500'])(
  'does NOT add locale prefix to error page "%s"',
  (path) => {
    for (const permanent of [true, false]) {
      expect(redirects).not.toContainEqual({
        source: path,
        destination: `/de${path}`,
        permanent,
      })
    }
  }
)

test.each(['/spendenaktion', '/wie-sie-helfen/spenden'])(
  'does NOT add locale prefix to "%s" (to not break Fundraisingbox iframe)',
  (path) => {
    for (const permanent of [true, false]) {
      expect(redirects).not.toContainEqual({
        source: path,
        destination: `/de${path}`,
        permanent,
      })
    }
  }
)
