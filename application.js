import express from 'express'
import favicon from 'serve-favicon'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

// create an instance of express
const app = express()

// view engine setup
app.set('views', 'source')
app.set('view engine', 'pug')

// middlewares setup
app.use('/storage', express.static('storage')) // todo: use a subdomain instead
app.use(express.static('public'))
app.use(favicon('storage/favicon.png'))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


// our codes goes right here..
const router = express.Router()

/* GET home page */
router.get('/', function(req, res, next) {
  res.send('Index!!')
})

app.use('/router', router)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  // res.render('error') // todo: create an error page
  res.send('Something went wrong')
})

module.exports = app
