import kebabCase from 'lodash/kebabCase'
import pkg from '../package.json'

export default Object.freeze({
  project: kebabCase(pkg.name),
  title: pkg.name,
  lang: 'en',
  dir: 'ltr',
  background: '#fff',
  themeColor: '#f35635',

  env: process.env.NODE_ENV || 'development',
  host: 'localhost',
  port: 8080,
  devMode: function() {
    if(this.env === 'development') return true
  },

  // configure the base url
  baseUrl: function() {
    const devUrl = `http://${this.host}:${this.port}`
    const prodUrl = `http://${this.project}.surge.sh`

    const url = this.devMode() ? devUrl : prodUrl
    return url
  },

  // configure the api url
  apiUrl: function() {
    const devUrl = `http://${this.host}:${this.port + 1}`
    const prodUrl = 'http://localhost:3000'
    function isMock() {
      return location.search.includes('useMockApi')
    }

    const url = isMock() ? devUrl : prodUrl
    return url
  },

  // configure the meta option in the HtmlWebpackPlugin()
  meta: function() {
    return {
      viewport: 'width=device-width, initial-scale=1',
      description: pkg.description,
      author: pkg.author.name,
      url: this.baseUrl()
    }
  },

  // configure the SitemapPlugin()
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

  // configure the RobotstxtPlugin()
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
