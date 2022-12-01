/**
 * A mapping from each page file path to its corresponding German and
 * English URL path. (Localized URL paths can improve search engine ratings,
 * hence the separation.)
 *
 * Following the Next.js convention, a dynamic component in a URL path
 * (e.g., a blog post slug) is indicated using the `[name]` syntax.
 *
 * @typedef {Object} PathMapping
 * @property {string} page - The mapped page file path. See `routes/pages.js`.
 * @property {string} de - The German URL path to use.
 * @property {string} en - The English URL path to use.
 */

/**
 * @type {Array.<PathMapping>}
 */
module.exports = [
  {
    page: '/404',
    de: '/404',
    en: '/en/404',
  },
  {
    page: '/[locale]/home',
    de: '/',
    en: '/en',
  },
  {
    page: '/[locale]/what-we-do',
    de: '/was-wir-machen',
    en: '/en/what-we-do',
  },
  {
    page: '/[locale]/what-we-do/approach-de',
    de: '/was-wir-machen/ansatz-de',
    en: '/en/what-we-do/approach-de',
  },
  {
    page: '/[locale]/what-we-do/approach-sa',
    de: '/was-wir-machen/ansatz-sa',
    en: '/en/what-we-do/approach-sa',
  },
  {
    page: '/[locale]/what-we-do/impact',
    de: '/was-wir-machen/effekte',
    en: '/en/what-we-do/impact',
  },
  {
    page: '/[locale]/who-we-are',
    de: '/wer-wir-sind',
    en: '/en/who-we-are',
  },
  {
    page: '/[locale]/who-we-are/team-de',
    de: '/wer-wir-sind/team-de',
    en: '/en/who-we-are/team-de',
  },
  {
    page: '/[locale]/who-we-are/team-sa',
    de: '/wer-wir-sind/team-sa',
    en: '/en/who-we-are/team-sa',
  },
  {
    page: '/[locale]/how-to-support',
    de: '/wie-sie-helfen',
    en: '/en/how-to-support',
  },
  {
    page: '/[locale]/how-to-support/become-sponsor',
    de: '/wie-sie-helfen/masifunde-gemeinschaft',
    en: '/en/how-to-support/become-sponsor',
  },
  {
    page: '/[locale]/how-to-support/become-volunteer',
    de: '/wie-sie-helfen/aktiv-werden',
    en: '/en/how-to-support/become-volunteer',
  },
  {
    page: '/[locale]/how-to-support/become-partner',
    de: '/wie-sie-helfen/partner-werden',
    en: '/en/how-to-support/become-partner',
  },
  {
    page: '/[locale]/how-to-support/donate',
    de: '/wie-sie-helfen/spenden',
    en: '/en/how-to-support/donate',
  },
  {
    page: '/[locale]/contact',
    de: '/kontakt',
    en: '/en/contact',
  },
  {
    page: '/[locale]/impressum',
    de: '/impressum',
    en: '/en/impressum',
  },
  {
    page: '/[locale]/datenschutz',
    de: '/datenschutz',
    en: '/en/privacy',
  },
  {
    page: '/[locale]/blog/list/[page]',
    de: '/blog/page/[page]',
    en: '/en/blog/page/[page]',
  },
  {
    page: '/[locale]/blog/post/[slug]',
    de: '/blog/[slug]',
    en: '/en/blog/[slug]',
  },
  {
    page: '/[locale]/campaign',
    de: '/spendenaktion',
    en: '/en/campaign',
  },
  {
    page: '/[locale]/press',
    de: '/presse',
    en: '/en/press',
  },
  {
    page: '/[locale]/documents',
    de: '/dokumente',
    en: '/en/documents',
  },
  {
    page: '/[locale]/transparency',
    de: '/transparenz',
    en: '/en/transparency',
  },
  {
    page: '/[locale]/podcasts',
    de: '/podcasts/page/[page]',
    en: '/en/podcasts/page/[page]',
  },
]
