const express = require('express')
require('./db/mongoose')
const productsRouter = require('./routers/products')

const app = express()

app.use(express.json())
app.use(productsRouter)

module.exports = app
