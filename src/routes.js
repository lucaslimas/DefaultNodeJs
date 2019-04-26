const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')
const validators = require('./app/validators')

const { TestController } = require(`./app/controllers`)

const routes = express.Router()

routes.get('/', (req, res) => res.send(`Hello World! NODE.JS`))

routes.post('/test', validate(validators.Number), handle(TestController.index))

module.exports = routes
