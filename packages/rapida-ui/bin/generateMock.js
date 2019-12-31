import jsf from 'json-schema-faker'
import fse from 'fs-extra'
import chalk from 'chalk'
import model from '../ui/mockModel'
const json = JSON.stringify(jsf.generate(model))

/* eslint-disable no-console */
fse.outputFile('./data/db.json', json, function(err) {
  if(err) return console.log(chalk.red(err))
  else console.log(chalk.cyan('Generated mock data'))
})
