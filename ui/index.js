import './index.pug'
import './index.styl'
import lodash from 'lodash'

// eslint-disable-next-line no-console
console.log('Rapid UI')

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
