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

  realApi: 'http://localhost:3000',
  mockApi: 'http://localhost:8081',
  isMock: function() {
    return location.search.includes('useMockApi')
  },
  baseUrl: function() {
    const url = this.isMock() ? this.mockApi : this.realApi
    return url
  },

  lang: 'en',
  dir: 'ltr',
  background: '#fff',
  themeColor: '#f35635',

  meta: {
    viewport: 'width=device-width, initial-scale=1',
    description: pkg.description,
    author: pkg.author,
    url: pkg.homepage
  },

  sitemap: {
    base: 'https://mysite.com',
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
    sitemap: 'http://example.com/sitemap.xml'
  }
})
