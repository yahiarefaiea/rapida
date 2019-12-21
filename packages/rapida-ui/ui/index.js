import './styles/index.styl'
import lodash from 'lodash'
import api from './api'

/* eslint-disable no-console */
console.log('Rapida UI')

api.book.getAll()
  .then(data => console.log(data))
  .catch(error => console.log(error))

// enable hot module replacement plugin
if(module.hot) module.hot.accept()
