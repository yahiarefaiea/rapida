import kebabCase from 'lodash/kebabCase'
import pkg from '../package.json'

export default Object.freeze({
  project: kebabCase(pkg.name),
  title: kebabCase(pkg.name),
  lang: 'en',
  dir: 'ltr',
  background: '#fff',
  themeColor: '#f35635',

  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8080,
  devMode: function() {
    if(this.env === 'development') return true
  },

  baseUrl: function() {
    const devUrl = `http://${this.host}:${this.port}`
    const prodUrl = `http://${kebabCase(pkg.name)}.surge.sh`

    const url = this.devMode() ? devUrl : prodUrl
    return url
  },

  apiUrl: function() {
    const devUrl = `http://${this.host}:${this.port + 1}`
    const prodUrl = 'http://localhost:3000'
    function isMock() {
      return location.search.includes('useMockApi')
    }

    const url = isMock() ? devUrl : prodUrl
    return url
  },

  meta: function() {
    return {
      viewport: 'width=device-width, initial-scale=1',
      description: pkg.description,
      author: pkg.author.name,
      url: this.baseUrl()
    }
  },

  sitemap: function() {
    return {
      base: this.baseUrl(),
      paths: ['foo', 'bar'],
      options: {
        fileName: 'sitemap.xml',
        lastMod: true
      }
    }
  },

  robotstxt: function() {
    return {
      policy: [
        {
          userAgent: '*',
          allow: '/'
        }
      ],
      sitemap: `${this.baseUrl()}/${this.sitemap().options.fileName}`
    }
  }
})
