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

  devUrl: `http://${this.host}:${this.port}`,
  prodUrl: `${kebabCase(pkg.name)}.surge.sh`,
  baseUrl: function() {
    const url = this.devMode() ? this.devUrl : this.prodUrl
    return url
  },

  mockApi: `http://${this.host}:${this.port + 1}`,
  realApi: 'http://localhost:3000',
  isMock: function() {
    return location.search.includes('useMockApi')
  },
  apiUrl: function() {
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
    author: pkg.author.name,
    url: this.baseUrl()
  },

  sitemap: {
    base: this.baseUrl(),
    paths: ['foo', 'bar'],
    options: {
      fileName: 'sitemap.xml',
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
    sitemap: `${this.baseUrl()}/${this.sitemap.options.fileName}`
  }
})
