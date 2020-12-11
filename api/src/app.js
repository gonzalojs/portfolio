const express = require('express');
const app = express()
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./config/db')

require('dotenv').config()
connectDB()

app.use(express.static('src/public'))
app.use(morgan('dev'))
app.use(bodyParser.json({
  limit: '5mb'
}))
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '5mb',
  parameterLimit: 100000
}))
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))

//cors. Evitar CORS errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

// TODO aqui van los routes



//error handling, tiene que ir luego de los rew que funcionan
app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app