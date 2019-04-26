require('dotenv').config()

const express = require('express')
const routes = require('./routes')
const validate = require('express-validation')
const Youch = require('youch')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.database()
    this.middleares()
    this.routes()
    this.exception()
  }
  database () {}
  middleares () {
    this.express.use(express.json())
  }
  routes () {
    this.express.use(routes)
  }
  exception () {
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }
      if (this.isDev) {
        const youch = new Youch(err)
        return res.json(await youch.toJSON())
      }
      return res.status(err.status || 500).json({ error: 'Erro Interno' })
    })
  }
}

module.exports = new App().express
