module.exports = {
  exportPathMap() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/waswirmachen': { page: '/waswirmachen' },
      '/en/waswirmachen': { page: '/waswirmachen', query: { locale: 'en' } },
    }
  },
}
