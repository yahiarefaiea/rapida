import jsf from 'json-schema-faker'
import schema from './dataSchema'
import fs from 'fs'
import chalk from 'chalk'
const json = JSON.stringify(jsf(schema))

/* eslint-disable no-console */
fs.writeFile('./data/db.json', json, function(err) {
  if(err) return console.log(chalk.red(err))
  else console.log(chalk.cyan(`Generated mock data`))
})
