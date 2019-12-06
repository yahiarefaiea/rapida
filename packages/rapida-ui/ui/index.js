import './index.styl'
import lodash from 'lodash'
import api from './api'

api.book.getAll()
  // eslint-disable-next-line no-console
  .then(data => console.log(data))
  // eslint-disable-next-line no-console
  .catch(error => console.log(error))

// eslint-disable-next-line no-console
console.log('Rapida UI')

// enable hot module replacement plugin
if(module.hot) {
  module.hot.accept()
  const hotEmitter = require('webpack/hot/emitter')
  const DEAD_CSS_TIMEOUT = 2000

  hotEmitter.on('webpackHotUpdate', function(currentHash) {
    document.querySelectorAll('link[href][rel=stylesheet]').forEach(function(link) {
      const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`)
      const newLink = link.cloneNode()
      newLink.href = nextStyleHref

      link.parentNode.appendChild(newLink)
      setTimeout(function() {
        link.parentNode.removeChild(link)
      }, DEAD_CSS_TIMEOUT)
    })
  })
}
