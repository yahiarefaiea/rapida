import './styles/index.styl'
import lodash from 'lodash'
import api from './api'
import nuotron from './components/atoms/nuotron'
import text from './components/atoms/text'

/* eslint-disable no-console */
api.book.getAll()
  .then(data => console.log(data))
  .catch(error => console.log(error))

// enable hot module replacement plugin
if(module.hot) module.hot.accept()
