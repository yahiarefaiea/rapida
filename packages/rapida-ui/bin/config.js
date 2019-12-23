import kebabCase from 'lodash/kebabCase'
import pkg from '../package.json'

export default Object.freeze({
  project: kebabCase(pkg.name),
  title: kebabCase(pkg.name),
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8080,
  devMode: function() {
    if(this.env === 'development') return true
  },

  apiUrl: function() {
    const devApi = `http://${this.host}:${this.port + 1}`
    const prodApi = 'http://localhost:3000'
    function isMock() {
      return location.search.includes('useMockApi')
    }

    const url = isMock() ? devApi : prodApi
    return url
  },

  lang: 'en',
  dir: 'ltr',
  background: '#fff',
  themeColor: '#f35635',

  meta: {
    viewport: 'width=device-width, initial-scale=1',
    description: pkg.description,
    author: pkg.author.name,
    url: pkg.homepage
  },

  sitemap: {
    base: pkg.homepage,
    paths: ['foo', 'bar'],
    options: {
      lastMod: true
    }
  },

  robotstxt: {
    policy: [
      {
        userAgent: '*',
        allow: '/'
      }
    ],
    sitemap: `${pkg.homepage}/sitemap.xml`
  }
})
